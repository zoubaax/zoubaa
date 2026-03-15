-- Add test_accounts column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS test_accounts JSONB DEFAULT '[]'::jsonb;

-- Update existing projects with an empty array if needed
UPDATE projects SET test_accounts = '[]'::jsonb WHERE test_accounts IS NULL;
