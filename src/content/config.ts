import { defineCollection, z } from 'astro:content';

const groups = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    icon: z.string().optional(),
    items: z.array(z.object({
      name: z.string(),
      url: z.string().url(),
      desc: z.string().optional(),
      icon: z.string().optional()
    }))
  })
});

export const collections = {
  groups,
};
