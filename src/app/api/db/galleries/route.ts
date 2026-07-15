import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Gallery } from "@/models/Gallery";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const query = categoryId ? { categoryId } : {};
    const galleries = await Gallery.find(query);
    return NextResponse.json(galleries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const gallery = await Gallery.create(body);
    return NextResponse.json(gallery, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
