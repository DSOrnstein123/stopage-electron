import { z } from "zod"

export const GoNullStringSchema = z.object({
  String: z.string(),
  Valid: z.boolean(),
})