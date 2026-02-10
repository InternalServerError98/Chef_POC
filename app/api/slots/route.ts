import { NextRequest, NextResponse } from "next/server";
import { createSupabaseClient } from "@/app/lib/supabase/server-client";
import { Neucha } from "next/font/google";


export async function GET(request : Request) {

    const supabase = await createSupabaseClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id"); 

    const { data, error } = await supabase
    .from("tblEvents")
    .select(`
        max_capacity, 
        rsvp_current
        )
    `)
    .eq("id", id)
    return NextResponse.json(data);

}

export async function POST(request : NextRequest) {

    try{

        const supabase = await createSupabaseClient();
        const body = await request.json();
        const { eventId, slots } = body;
        let { data, error } = await supabase
        .rpc('UpdateSlots', {
            event_id: eventId, 
            slots
        })
        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        else 
            return NextResponse.json({ message: "Slots updated successfully." }, { status: 200 });

    }
    catch(error){
        return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 });
    }




}