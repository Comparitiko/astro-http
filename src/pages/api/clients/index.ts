import type { APIRoute } from "astro";
import { Clients, db } from "astro:db";

export const GET: APIRoute = async () => {
  const clients = await db.select().from(Clients);
  return new Response(JSON.stringify(clients), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const { name, age, isActive } = await request.json();
  await db.insert(Clients).values({ name, age, isActive });
  return new Response(
    JSON.stringify({ message: "Client created successfuly" }),
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
