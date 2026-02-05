import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message, history } = await req.json()

        // Using AIML API - OpenAI Compatible
        // Get your key at: https://aimlapi.com/
        const apiKey = Deno.env.get('AIML_API_KEY')

        if (!apiKey) {
            return new Response(
                JSON.stringify({ error: 'Missing AIML_API_KEY. Set it in Supabase Secrets.' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        const systemPrompt = `
      You are the official AI Portfolio Assistant for Mohammed Zoubaa.
      
      MOHAMMED'S PROFILE:
      - Role: Full-Stack Developer & Computer Engineering student.
      - Location: Fez, Morocco.
      - Core Stack: React, Node.js, Supabase, PostgreSQL, Tailwind CSS, Python.
      - Major Projects: Medical Management Systems, Interactive E-learning Platforms.
      - Education: Software Engineering (UPF), Specialized Technician in Digital Development (OFPPT).
      
      INSTRUCTIONS:
      - Be professional, helpful, and concise.
      - Answer questions accurately based on Mohammed's profile.
      - Support both English and French.
      - If you don't know a detail, suggest the user reaches out via the contact form.
    `

        const response = await fetch('https://api.aimlapi.com/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini', // Or any other beast model available on AIML API
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...history.slice(-5),
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 500,
            }),
        })

        const data = await response.json()

        if (data.error) {
            throw new Error(data.error.message || 'AIML API Error')
        }

        const reply = data.choices[0].message.content

        return new Response(
            JSON.stringify({ reply }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
