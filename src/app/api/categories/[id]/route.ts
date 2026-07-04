import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiResponse } from "@/types";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      const res: ApiResponse = { success: false, error: "无效的 ID" };
      return NextResponse.json(res, { status: 400 });
    }

    const category = await prisma.category.findUnique({ where: { id: idNum } });
    if (!category) {
      const res: ApiResponse = { success: false, error: "分类不存在" };
      return NextResponse.json(res, { status: 404 });
    }

    const res: ApiResponse<typeof category> = { success: true, data: category };
    return NextResponse.json(res);
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "获取分类失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      const res: ApiResponse = { success: false, error: "无效的 ID" };
      return NextResponse.json(res, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { id: idNum } });
    if (!existing) {
      const res: ApiResponse = { success: false, error: "分类不存在" };
      return NextResponse.json(res, { status: 404 });
    }

    const body = await request.json();
    const { name, description } = body;

    const data: Record<string, string | null> = {};
    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        const res: ApiResponse = { success: false, error: "name 不能为空" };
        return NextResponse.json(res, { status: 400 });
      }
      data.name = name.trim();
    }
    if (description !== undefined) {
      data.description = description?.trim() || null;
    }

    const category = await prisma.category.update({
      where: { id: idNum },
      data,
    });
    const res: ApiResponse<typeof category> = { success: true, data: category };
    return NextResponse.json(res);
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "更新分类失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) {
      const res: ApiResponse = { success: false, error: "无效的 ID" };
      return NextResponse.json(res, { status: 400 });
    }

    const existing = await prisma.category.findUnique({ where: { id: idNum } });
    if (!existing) {
      const res: ApiResponse = { success: false, error: "分类不存在" };
      return NextResponse.json(res, { status: 404 });
    }

    await prisma.category.delete({ where: { id: idNum } });
    const res: ApiResponse = { success: true, data: null };
    return NextResponse.json(res);
  } catch (error) {
    const res: ApiResponse = {
      success: false,
      error: error instanceof Error ? error.message : "删除分类失败",
    };
    return NextResponse.json(res, { status: 500 });
  }
}
