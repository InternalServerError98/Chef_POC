import { cookies} from "next/headers";
import { createServerClient} from "@supabase/ssr";

function getDBConfig(){
    
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("Missing Supabase environment variables");
    }
    
    return { SUPABASE_URL, SUPABASE_ANON_KEY };

}

export async function createSupabaseClient() {
   
    const { SUPABASE_URL, SUPABASE_ANON_KEY } = getDBConfig();
    const cookie = await cookies();

    return createServerClient(
        SUPABASE_URL, 
        SUPABASE_ANON_KEY, 
        {
            cookies: 
            {
                getAll(){return cookie.getAll();},
                setAll(cookiesToSet) {
                    try{
                        cookiesToSet.forEach(({name, value, options}) => {
                            cookie.set(name, value, options);
                        });
                    }
                    catch(err){
                        console.error("Error setting cookies:", err);       
                    }
                }
            }
        }
    );

}