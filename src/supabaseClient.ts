import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://qnplpbvvpbfgfcbchjmd.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFucGxwYnZ2cGJmZ2ZjYmNoam1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjcxODksImV4cCI6MjA1Mzg0MzE4OX0.ygZate-knXeAZ4P8_DTzTbdic85zuGjvKDjEncnsB1k"

console.log('Supabase URL:', SUPABASE_URL);
console.log('Supabase Anon Key:', SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
