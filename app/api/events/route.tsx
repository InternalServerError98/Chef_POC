import { NextResponse } from "next/server";
import { createSupabaseClient } from "@/app/lib/supabase/server-client";



export type TableEvents = {
    event_time_desc: string;
    chef_name: string;
    chef_id: number;
    event_id: number; 
    event_name: string;
    event_desc: string;
}

export async function GET(request : Request) {

    const supabase = await createSupabaseClient();
    const { searchParams } = new URL(request.url);

    const eventType = searchParams.get("eventType"); 
    const date = searchParams.get("date");

    const { data, error } = await supabase
    .from("tblEvents")
    .select(`
        id,
        event_time,
        event_date,
        event_name,
        event_chef,
        event_desc,
        tblChefs(
            display_name),
        tblEventTimes!inner(
            display_desc,
            display_name
        )
    `)
    .eq("event_date", date)
    .ilike("tblEventTimes.display_name", `%${eventType}%`);
    return NextResponse.json(data);

}       