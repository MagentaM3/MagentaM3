import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  url: text("link"),
  height: integer("height"),
  width: integer("width"),
});

// export const imageRelations = (({ many }) => ({

// }));