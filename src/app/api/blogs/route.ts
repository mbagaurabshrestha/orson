import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import Blog from "@/models/blogModel";

// GET all blogs
export async function GET() {
  await connect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  return NextResponse.json({ blogs });
}

// POST create blog
export async function POST(req: NextRequest) {
  await connect();
  const body = await req.json();
  // auto-generate slug from title
  const slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const blog = await Blog.create({ ...body, slug });
  return NextResponse.json({ blog });
}

// PUT update blog
export async function PUT(req: NextRequest) {
  await connect();
  const body = await req.json();
  const { _id, ...update } = body;
  const blog = await Blog.findByIdAndUpdate(_id, update, { new: true });
  return NextResponse.json({ blog });
}

// DELETE blog
export async function DELETE(req: NextRequest) {
  await connect();
  const { _id } = await req.json();
  await Blog.findByIdAndDelete(_id);
  return NextResponse.json({ success: true });
}