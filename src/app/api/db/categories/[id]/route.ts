import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { Category } from "@/models/Category";
import { Gallery } from "@/models/Gallery";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const category = await Category.findOneAndUpdate({ id }, body, { new: true });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const category = await Category.findOneAndDelete({ id });
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }
    // Clean up galleries inside this category
    await Gallery.deleteMany({ categoryId: id });
    return NextResponse.json({ message: "Category and associated galleries deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
