import { Note } from "@prisma/client";

export type CreateNote = Omit<Note, "id" | "cretedAt" | "updataAt">;
