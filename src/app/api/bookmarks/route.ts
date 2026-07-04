import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export async function GET() {
  try {
    const bookmarks = await prisma.bookmark.findMany({
      orderBy: { createdAt: "desc" },
    });
    const res: ApiResponse<typeof bookmarks> = { success: true, data: bookmarks };
    return NextResponse.json(res);
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "获取书签失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, url, description, tags } = body;

    if (!title || !url) {
      const res: ApiResponse = { success: false, error: "title 和 url 为必填字段" };
      return NextResponse.json(res, { status: 400 });
    }

    const bookmark = await prisma.bookmark.create({
      data: { title, url, description, tags },
    });
    const res: ApiResponse<typeof bookmark> = { success: true, data: bookmark };
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "创建书签失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}
