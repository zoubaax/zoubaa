import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message } = await req.json()
        const apiKey = Deno.env.get('GOOGLE_API_KEY')

        if (!apiKey) {
            return new Response(JSON.stringify({ error: "API Key missing in Supabase" }), { status: 500, headers: corsHeaders })
        }

        // Simplified Request to Gemini (No history for debugging)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `You are Mohammed Zoubaa's Portfolio Assistant. Answer this: ${message}` }]
                }]
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            // This will send the ACTUAL Google error to your browser console
            return new Response(JSON.stringify({ 
                error: "Google API Error", 
                details: data.error?.message || "Unknown error" 
            }), { status: 500, headers: corsHeaders })
        }

        const reply = data.candidates[0].content.parts[0].text

        return new Response(JSON.stringify({ reply }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders })
    }
})