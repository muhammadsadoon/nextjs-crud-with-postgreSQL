import { NextResponse } from "next/server";
import { query } from "../../service/pool";

export async function GET(){
    try {
        const data = await query('SELECT * FROM public."Users"')
        return NextResponse.json({
            message: "Data fetch successfully",
            data: data.rows
        },{
            status: 200
        })
        
    } catch (err) {
        if(err instanceof Error) {
            return NextResponse.json({
                message : "Error from server: " + err.message
            },{
                status: 200
            })
        }
    }
}