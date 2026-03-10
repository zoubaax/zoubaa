-- ============================================
-- PHASE 1: RAG INFRASTRUCTURE SETUP
-- ============================================
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1. Enable the pgvector extension to work with embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create a table to store your portfolio embeddings
-- Note: Google's text-embedding-004 uses 768 dimensions
CREATE TABLE IF NOT EXISTS portfolio_embeddings (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,         -- The actual text content
  metadata JSONB,              -- Source info (project_id, category, etc.)
  embedding VECTOR(768),       -- The mathematical vector
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create an index for faster similarity search
-- ivfflat is great for small to medium datasets
CREATE INDEX IF NOT EXISTS portfolio_embeddings_embedding_idx 
ON portfolio_embeddings 
USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- 4. Create the search function (RPC)
-- This is what the Edge Function will call to find answers
CREATE OR REPLACE FUNCTION match_portfolio_embeddings (
  query_embedding VECTOR(768),
  match_threshold FLOAT,
  match_count INT
)
RETURNS TABLE (
  id BIGINT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    portfolio_embeddings.id,
    portfolio_embeddings.content,
    portfolio_embeddings.metadata,
    1 - (portfolio_embeddings.embedding <=> query_embedding) AS similarity
  FROM portfolio_embeddings
  WHERE 1 - (portfolio_embeddings.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- 5. Enable RLS for security
ALTER TABLE portfolio_embeddings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (for the chatbot)
CREATE POLICY "Anyone can view embeddings"
  ON portfolio_embeddings
  FOR SELECT
  USING (true);

-- Only authenticated admins can insert/update (for the indexing script)
CREATE POLICY "Only authenticated users can manage embeddings"
  ON portfolio_embeddings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
