var books = [{ title: "吾輩は猫である", author: "夏目漱石" }];
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ books: books }, { status: 200 });
}

export const POST = async (req: NextRequest) => {
  return new NextResponse("hello, world", {
    headers: { "Content-Type": "text/plain" },
  });
};
