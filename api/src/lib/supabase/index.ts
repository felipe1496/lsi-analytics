import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://yrnooukxbqtxqpfnjtuj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlybm9vdWt4YnF0eHFwZm5qdHVqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2NzA1MzEsImV4cCI6MjAxODI0NjUzMX0.4JF2Tj-5zwkjKI2un65ZmPm7poQipgYdgxZoyM_nO9s',
);
