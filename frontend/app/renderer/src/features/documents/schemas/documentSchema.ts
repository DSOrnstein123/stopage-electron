import { GoNullStringSchema } from "@/schemas/goNullStringSchema";
import z from "zod";

const note = z.object({
  id: z.uuid(),
  title: GoNullStringSchema,
});
