import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Reel } from "@/models/Reel";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const reels = await Reel.find({}).sort({ id: 1 });
    return NextResponse.json(reels);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
