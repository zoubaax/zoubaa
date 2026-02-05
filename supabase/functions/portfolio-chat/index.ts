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

        const personality = `You are the official AI Portfolio Assistant for Mohammed Zoubaa. 
        Mohammed is a Full-Stack Developer and Computer Engineering student specializing in React, Node.js, and DevOps.
        He is based in Fez, Morocco. 
        Answer professionally and concisely in English or French.`

        // Build the contents by placing personality at the start of the first user message
        const safeHistory = Array.isArray(history) ? history : []
        const contents = []

        // Start with the personality context
        contents.push({
            role: 'user',
            parts: [{ text: `CONTEXT: ${personality}\n\nUSER QUESTION: ${message}` }]
        })

        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: contents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 500
                }
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

        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error("No response from AI service")
        }

        const reply = data.candidates[0].content.parts[0].text

        return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
    }
})