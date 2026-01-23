import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { ENV } from "@/lib/env";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Verificar secret token
  if (!ENV.DRAFT_MODE_SECRET || secret !== ENV.DRAFT_MODE_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Habilitar Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirecionar para a página solicitada ou para a listagem
  if (slug) {
    redirect(`/strategy/briefings/${slug}`);
  }
  redirect("/strategy/briefings");
}
