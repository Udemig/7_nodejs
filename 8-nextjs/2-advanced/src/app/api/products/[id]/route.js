import { cookies, headers } from "next/headers";
import { NextResponse as Res } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;

  return Res.json({
    message: `${id} id'li Ürün Geldi`,
  });
};

export const PUT = async (req) => {
  // çerezlere erişme - v1
  const langCookie = req.cookies.get("lang");

  // headerlara erişme - v1
  const authHeader = req.headers.get("authorization");

  // query params erişme - v1
  const categoryParam = req.nextUrl.searchParams.get("category");

  return Res.json({
    langCookie,
    authHeader,
    categoryParam,
  });
};

export const PATCH = async (req) => {
  // çerezlere erişme - v2
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang");

  // headerlara erişme - v2
  const headerStore = await headers();
  const authHeader = headerStore.get("Authorization");

  // query params erişme - v2
  const { searchParams } = new URL(req.url);
  const categoryParam = searchParams.get("category");

  return Res.json({
    langCookie,
    authHeader,
    categoryParam,
  });
};

export const DELETE = async (req) => {
  return Res.json({});
};
