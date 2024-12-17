import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function deleteUser(id: string) {
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    if (error) {
        console.error("Error deleting user:", error);
    } else {
        console.log("User deleted successfully:", data);
    }
    return data;
}
