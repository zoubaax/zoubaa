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
        const body = await req.json()
        const { message, history } = body

        // Using Google Gemini API (AI Studio)
        const apiKey = Deno.env.get('GOOGLE_API_KEY')

        if (!apiKey) {
            console.error('Missing GOOGLE_API_KEY secret')
            return new Response(
                JSON.stringify({ error: 'Missing GOOGLE_API_KEY. Please set it in Supabase Secrets.' }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Validate history
        const safeHistory = Array.isArray(history) ? history : []

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
      - If you don't know a detail, suggest the user reaches out via the contact form at the bottom of the page.
    `

        // Format history for Gemini API
        // Gemini expects alternating roles starting with 'user'
        // We filter out any consecutive identical roles and ensure it starts with 'user'
        const preparedContents = []

        // Add history
        safeHistory.forEach(m => {
            const role = m.role === 'assistant' ? 'model' : 'user'
            // Avoid consecutive identical roles
            if (preparedContents.length === 0 || preparedContents[preparedContents.length - 1].role !== role) {
                preparedContents.push({
                    role: role,
                    parts: [{ text: m.content }]
                })
            }
        })

        // Ensure the last message is NOT 'user' if we're about to add a 'user' message
        if (preparedContents.length > 0 && preparedContents[preparedContents.length - 1].role === 'user') {
            // This shouldn't happen usually in a well-formed chat, but let's be safe
            // Maybe add a placeholder model response or just skip history
        }

        // Final message from user
        const finalContents = preparedContents.length === 0 || preparedContents[preparedContents.length - 1].role !== 'user'
            ? [...preparedContents, { role: 'user', parts: [{ text: message }] }]
            : preparedContents

        // If even after filtering it doesn't start with 'user', Gemini might complain
        if (finalContents.length > 0 && finalContents[0].role !== 'user') {
            finalContents.shift() // Remove the first 'model' message
        }

        // If it's empty now, at least add current message
        if (finalContents.length === 0) {
            finalContents.push({ role: 'user', parts: [{ text: message }] })
        }

        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                system_instruction: {
                    parts: [{ text: systemPrompt }]
                },
                contents: finalContents,
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 800,
                }
            }),
        })

        const responseData = await response.json()

        if (!response.ok) {
            console.error('Gemini API Error details:', JSON.stringify(responseData))
            return new Response(
                JSON.stringify({
                    error: `Gemini API returned ${response.status}`,
                    details: responseData.error?.message || 'Unknown error'
                }),
                { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        if (!responseData.candidates || !responseData.candidates[0] || !responseData.candidates[0].content) {
            console.error('Empty Gemini response:', JSON.stringify(responseData))
            throw new Error('No content returned from Gemini')
        }

        const reply = responseData.candidates[0].content.parts[0].text

        return new Response(
            JSON.stringify({ reply }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    } catch (error: any) {
        console.error('Edge Function Error:', error.message)
        return new Response(
            JSON.stringify({ error: error.message || 'Internal Server Error' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
