import { z } from "zod";
import { GoNullStringSchema } from "@/schemas/goNullStringSchema";

const RawDeckSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1, "Name cannot be empty"),
  parentId: GoNullStringSchema,
});

type RawDeck = z.infer<typeof RawDeckSchema>;

const ProcessedDeckSchema = RawDeckSchema.transform((rawDeck) => ({
  id: rawDeck.id,
  name: rawDeck.name,
  parentId: rawDeck.parentId.Valid ? rawDeck.parentId.String : "",
}));

type ProcessedDeck = z.infer<typeof ProcessedDeckSchema>;

const RawPaginatedResponseSchema = z.object({
  data: z.array(RawDeckSchema),
  totalCount: z.number().int().nonnegative(),
  totalPages: z.number().int().positive(),
  currentPage: z.number().int().positive(),
  limit: z.number().int().positive(),
});

type RawPaginatedResponse = z.infer<typeof RawPaginatedResponseSchema>;

const ProcessedPaginatedResponseSchema = z.object({
  data: z.array(ProcessedDeckSchema),
  totalCount: z.number(),
  totalPages: z.number(),
  currentPage: z.number(),
  limit: z.number(),
});

type ProcessedPaginatedResponse = z.infer<
  typeof ProcessedPaginatedResponseSchema
>;

const ApiErrorSchema = z.object({
  error: z.string(),
});

export {
  RawDeckSchema,
  type RawDeck,
  RawPaginatedResponseSchema,
  type RawPaginatedResponse,
  ProcessedDeckSchema,
  type ProcessedDeck,
  ProcessedPaginatedResponseSchema,
  type ProcessedPaginatedResponse,
  ApiErrorSchema,
};
