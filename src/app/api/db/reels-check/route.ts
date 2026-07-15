import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const reelsCount = 7;
    const existsArray = [];
    
    for (let i = 1; i <= reelsCount; i++) {
      const filePath = path.join(process.cwd(), "public", "reels", `reel-${i}.mp4`);
      existsArray.push(fs.existsSync(filePath));
    }
    
    return NextResponse.json({ exists: existsArray });
  } catch (error) {
    return NextResponse.json({ exists: Array(7).fill(false) });
  }
}
