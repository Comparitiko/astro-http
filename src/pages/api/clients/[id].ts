import type { APIRoute } from "astro";
import { Clients, db, eq } from "astro:db";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id parameter" }), {
      status: 400,
    });
  }

  const numberId = parseInt(id);

  if (isNaN(numberId)) {
    return new Response(JSON.stringify({ message: "Invalid id parameter" }), {
      status: 400,
    });
  }

  const client = await db
    .select()
    .from(Clients)
    .where(eq(Clients.id, numberId));

  return new Response(JSON.stringify(client));
};

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id parameter" }), {
      status: 400,
    });
  }

  const numberId = parseInt(id);

  if (isNaN(numberId)) {
    return new Response(JSON.stringify({ message: "Invalid id parameter" }), {
      status: 400,
    });
  }

  await db.delete(Clients).where(eq(Clients.id, numberId));

  return new Response(JSON.stringify({ message: "Client deleted" }));
};

export const PUT: APIRoute = async ({ params, request }) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Missing id parameter" }), {
      status: 400,
    });
  }

  const numberId = parseInt(id);

  if (isNaN(numberId)) {
    return new Response(JSON.stringify({ message: "Invalid id parameter" }), {
      status: 400,
    });
  }

  const { name, age, isActive } = await request.json();

  const client = await db
    .update(Clients)
    .set({ name, age, isActive })
    .where(eq(Clients.id, numberId));

  return new Response(JSON.stringify({ message: "Client updated", client }), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
