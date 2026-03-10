import { supabase } from '../lib/supabase'

/**
 * Trigger the RAG indexing process for the entire portfolio
 * @returns {Promise<{data: any, error: any}>}
 */
export async function syncAiKnowledge() {
    try {
        // We use supabase.functions.invoke to call our newly created 'index-portfolio' function
        // Note: The function itself handles the service role operations internally
        const { data, error } = await supabase.functions.invoke('index-portfolio');

        if (error) {
            console.error('Error syncing AI knowledge:', error);
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Unexpected error during AI sync:', error);
        return { data: null, error };
    }
}
