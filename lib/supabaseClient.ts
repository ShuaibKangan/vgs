import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// the process reads the credentials from the .env.local file and creates a supabase 
// client that can be used to interact with the database. The supabase client is 
// then exported for use in other parts of the application.

//the exclamation mark after the environment variable names is a TypeScript 
// non-null assertion operator. It tells TypeScript that we are sure that these 
// environment variables will always be defined and not null or undefined. 
// This is important because if these variables were undefined, it would cause 
// runtime errors when trying to create the Supabase client.

//"export const supabase =" creates a named export for the Supabase client instance, 
// allowing it to be imported and used in other parts of the application.