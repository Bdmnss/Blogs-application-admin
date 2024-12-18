import { supabase } from "..";

export const login = ({email, password} : {email: string, password: string}) => {
    return supabase.auth.signInWithPassword({email, password});
}