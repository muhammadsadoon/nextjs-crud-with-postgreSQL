import { NextResponse, NextRequest } from "next/server";
import { query } from "../../service/pool";

export async function POST(req: NextRequest) {

    try {

        if (!req.body) {
            return NextResponse.json({ message: "No data provided" }, { status: 400 });
        }

        if (req.method == "POST") {
            const body = await req.json();
            const { name, email, password } = body;

            if (!name || !email || !password) {
                return NextResponse.json({ message: "Username and password are required" }, { status: 400 });
            }

            const result = await query(
                'INSERT INTO public."Users" (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
            if (result.rowCount === 0) {
                throw new Error("Failed to create user");
            }
            if (result.rowCount) {
                if (result.rowCount > 0) {
                    console.log("User created successfully");
                    return NextResponse.json({ message: "User created successfully" });
                }
            }
        }

    } catch (err) {
        if (err instanceof Error) {
            return NextResponse.json({ message: "Error from server:" + err.message }, { status: 500 });
        }

    }
}

export function logout(req: NextRequest, res: NextResponse) {
    // Here you would typically clear the user's session or authentication token
    return NextResponse.json({ message: "Logout successful" });
}
