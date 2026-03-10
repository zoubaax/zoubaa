import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
        const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
        const apiKey = Deno.env.get('GOOGLE_API_KEY')!;

        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

        // 1. Clear Old Embeddings (to ensure a fresh sync and no duplicates)
        await supabase.from('portfolio_embeddings').delete().neq('id', '00000000-0000-0000-0000-000000000000');

        // 2. Fetch Projects with linked Technologies
        const { data: projects, error: projectsError } = await supabase
            .from('projects')
            .select('*, projects_technologies(technology:technologies(name))');

        if (projectsError) throw projectsError;

        // 3. Fetch Certificates
        const { data: certificates, error: certsError } = await supabase
            .from('certificates')
            .select('*');

        if (certsError) throw certsError;

        // 4. Prepare chunks
        const chunks: any[] = [];

        // Chunking Projects
        projects.forEach(p => {
            // Flatten technologies from nested structure
            const technologies = p.projects_technologies?.map((pt: any) => pt.technology.name).join(', ') || '';

            const content = `Project: ${p.title}
Tagline: ${p.tagline || ''}
Description: ${p.description}
Category: ${p.category}
Key Features: ${Array.isArray(p.features) ? p.features.join(', ') : ''}
Tech Stack: ${technologies}
Challenges: ${p.challenges || ''}
Solutions: ${p.solutions || ''}`;

            chunks.push({
                content,
                metadata: { source: 'projects', id: p.id, title: p.title }
            });
        });

        // Chunking Certificates
        certificates.forEach(c => {
            const content = `Certificate: ${c.title}
Verification URL: ${c.show_url || ''}`;

            chunks.push({
                content,
                metadata: { source: 'certificates', id: c.id, title: c.title }
            });
        });

        // 4. Generate Embeddings and Save
        console.log(`Processing ${chunks.length} chunks...`);

        for (const chunk of chunks) {
            // Get embedding from Gemini
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: "models/gemini-embedding-001",
                    content: {
                        parts: [{ text: chunk.content }]
                    },
                    outputDimensionality: 768
                })
            });

            if (!response.ok) {
                const error = await response.text();
                console.error(`Error generating embedding for ${chunk.metadata.title}:`, error);
                continue;
            }

            const data = await response.json();
            const embedding = data.embedding.values;

            // Upsert into portfolio_embeddings
            // We use content/metadata as a "pseudo-unique" check or just insert fresh
            const { error: insertError } = await supabase
                .from('portfolio_embeddings')
                .insert({
                    content: chunk.content,
                    metadata: chunk.metadata,
                    embedding: embedding
                });

            if (insertError) {
                console.error(`Error inserting embedding for ${chunk.metadata.title}:`, insertError);
            }
        }

        return new Response(JSON.stringify({
            message: `Successfully indexed ${chunks.length} items.`,
            count: chunks.length
        }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
        });
    }
})
