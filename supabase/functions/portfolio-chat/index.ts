import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message, history } = await req.json()
        const apiKey = Deno.env.get('GOOGLE_API_KEY')

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "GOOGLE_API_KEY missing in Supabase." }), { status: 500, headers: corsHeaders })
        }

        const systemPrompt = `
      You are the official AI Portfolio Assistant for Mohammed Zoubaa.
      MOHAMMED'S PROFILE:
      - Role: Full-Stack Developer & Computer Engineering student.
      - Core Stack: React, Node.js, Supabase, PostgreSQL, Tailwind CSS, Python.
      - Education: Software Engineering (UPF), Specialized Technician in Digital Development (OFPPT).
      INSTRUCTIONS: Be professional, helpful, and concise. Support English and French.
    `;

        const safeHistory = Array.isArray(history) ? history : []
        const contents = []

        // Gemini expects alternating User/Model roles
        safeHistory.forEach(m => {
            const role = m.role === 'assistant' ? 'model' : 'user'
            if (contents.length === 0 || contents[contents.length - 1].role !== role) {
                contents.push({ role, parts: [{ text: m.content }] })
            }
        })

        if (contents.length > 0 && contents[0].role !== 'user') contents.shift();

        contents.push({ role: 'user', parts: [{ text: message }] })

        // Switched to v1 (Stable) instead of v1beta
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: systemPrompt }] },
                contents: contents,
                generationConfig: { temperature: 0.7, maxOutputTokens: 500 }
            }),
        })

        const responseText = await response.text()

        if (!response.ok) {
            return new Response(JSON.stringify({
                error: "Google API Error",
                status: response.status,
                details: responseText
            }), { status: 500, headers: corsHeaders })
        }

        const data = JSON.parse(responseText)
        const reply = data.candidates[0].content.parts[0].text

        return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
    }
})