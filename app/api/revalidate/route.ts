import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // console.log(" body:", JSON.stringify(body, null, 2));
    
    const model = body.model || body.uid?.split('.').pop();
    const entry = body.entry;

    const authHeader = request.headers.get('authorization');
    
    // console.log("eeceived auth header:", authHeader);

    if (authHeader !== `Bearer ${process.env.REVALIDATE_TOKEN}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    console.log("Revalidating:", model);

    if (model === "project") {
      revalidateTag("projects", "page");
      if (entry?.slug) {
        revalidateTag(`project-${entry.slug}`, "page");
      }
    } else if (model === "article") {
      revalidateTag("articles", "page");
      if (entry?.slug) {
        revalidateTag(`article-${entry.slug}`, "page");
      }
    } else if (model === "service") {
      revalidateTag("services", "page");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      model,
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
