import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        mesagge: "Getting Notes",
    })
}
export function POST() {
    return NextResponse.json({
        mesagge: "creating Note ...",
    })
}