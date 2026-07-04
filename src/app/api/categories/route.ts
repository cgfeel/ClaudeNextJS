import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") || "20", 10)));
    const search = searchParams.get("search") || "";

    const where = search
      ? {
          OR: [
            { name: { contains: search } },
            { description: { contains: search } },
          ],
        }
      : {};

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.category.count({ where }),
    ]);

    const res: ApiResponse<typeof categories> = {
      success: true,
      data: categories,
    };
    return NextResponse.json({
      ...res,
      pagination: { page, pageSize, total },
    });
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "获取分类列表失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      const res: ApiResponse = { success: false, error: "name 为必填字段" };
      return NextResponse.json(res, { status: 400 });
    }

    const category = await prisma.category.create({
      data: { name: name.trim(), description: description?.trim() || null },
    });
    const res: ApiResponse<typeof category> = { success: true, data: category };
    return NextResponse.json(res, { status: 201 });
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "创建分类失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}
