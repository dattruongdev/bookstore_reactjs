import { z, ZodType } from "zod";

const bookScema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  authors: (
    z.object({
      id: z.string(),
      fullName: z.string(),
    }) satisfies ZodType<Author>
  ).array(),
  cost: z.object({
    amount: z.number(),
    currencyCode: z.string(),
    beginDate: z.string(),
    endDate: z.string(),
  }),
  categories: z
    .object({
      id: z.string(),
      name: z.string(),
    })
    .array(),
  rating: z.number(),
  publisher: z.string(),
  publishedDate: z.string(),
  description: z.string(),
});
