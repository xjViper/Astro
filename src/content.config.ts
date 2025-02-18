import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Pages collection schema
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// about collection schema
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

// Homepage collection schema
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/-*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({
    banner: z.object({
      title: z.string(),
      content: z.string(),
      image: z.string(),
      button: z.object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      }),
    }),
    features: z.array(
      z.object({
        title: z.string(),
        image: z.string(),
        content: z.string(),
        bulletpoints: z.array(z.string()),
        button: z.object({
          enable: z.boolean(),
          label: z.string(),
          link: z.string(),
        }),
      }),
    ),
  }),
});

// Call to Action collection schema
const ctaSectionCollection = defineCollection({
  loader: glob({
    pattern: "call-to-action.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    button: z.object({
      enable: z.boolean(),
      label: z.string(),
      link: z.string(),
    }),
  }),
});

// Testimonials Section collection schema
const testimonialSectionCollection = defineCollection({
  loader: glob({
    pattern: "testimonial.{md,mdx}",
    base: "src/content/sections",
  }),
  schema: z.object({
    enable: z.boolean(),
    title: z.string(),
    description: z.string(),
    testimonials: z.array(
      z.object({
        name: z.string(),
        avatar: z.string(),
        designation: z.string(),
        content: z.string(),
      }),
    ),
  }),
});

// Recipes collection schema
const professorCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/professor" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    rank: z.string().optional(),
    type: z.string().default("professor"),
    name: z.string().optional(),
    recipe_img: z.string().optional(),
    level: z.number().default(1),
    craft_time: z.number().default(1),
    value_npc: z.number().default(1),
    result: z.number().default(1),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().default(1),
          item_img: z.string().optional(),
          value_npc: z.number().default(1),
        }),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const stylistCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/stylist" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    rank: z.string().optional(),
    type: z.string().default("estilista"),
    name: z.string().optional(),
    recipe_img: z.string().optional(),
    level: z.number().default(1),
    craft_time: z.number().default(1),
    value_npc: z.number().default(1),
    result: z.number().default(1),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().default(1),
          item_img: z.string().optional(),
          value_npc: z.number().default(1),
        }),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const adventurerCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/adventurer" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    rank: z.string().optional(),
    type: z.string().default("aventureiro"),
    name: z.string().optional(),
    recipe_img: z.string().optional(),
    level: z.number().default(1),
    craft_time: z.number().default(1),
    value_npc: z.number().default(1),
    result: z.number().default(1),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().default(1),
          item_img: z.string().optional(),
          value_npc: z.number().default(1),
        }),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

const engineerCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/engineer" }),
  schema: z.object({
    title: z.string().optional(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    rank: z.string().optional(),
    type: z.string().default("engenheiro"),
    name: z.string().optional(),
    recipe_img: z.string().optional(),
    level: z.number().default(1),
    craft_time: z.number().default(1),
    value_npc: z.number().default(1),
    result: z.number().default(1),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          quantity: z.number().default(1),
          item_img: z.string().optional(),
          value_npc: z.number().default(1),
        }),
      )
      .optional(),
    draft: z.boolean().optional(),
  }),
});

// Export collections
export const collections = {
  // Pages
  homepage: homepageCollection,
  pages: pagesCollection,
  about: aboutCollection,

  // Profisions
  professor: professorCollection,
  stylist: stylistCollection,
  adventurer: adventurerCollection,
  engineer: engineerCollection,

  // sections
  ctaSection: ctaSectionCollection,
  testimonialSection: testimonialSectionCollection,
};
