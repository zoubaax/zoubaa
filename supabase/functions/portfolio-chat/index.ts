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
        const { message } = await req.json()
        const apiKey = Deno.env.get('GOOGLE_API_KEY')

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key missing in Supabase secrets." }), { status: 500, headers: corsHeaders })
        }

        // Use v1beta for better compatibility with current Gemini models
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are Mohammed Zoubaa's Portfolio Assistant. Answer this: ${message}` }]
                }]
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