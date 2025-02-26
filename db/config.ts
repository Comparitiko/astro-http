import { column, defineDb, defineTable } from "astro:db";

const Clients = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    age: column.number(),
    isActive: column.boolean(),
  },
});

const Posts = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    title: column.text(),
    content: column.text(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: { Clients },
});
