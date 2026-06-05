import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    series: z.string().optional(),
    order: z.number().optional(),
    target: z.string().optional(),
    description: z.string().optional(),
  }),
});

const properties = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/properties" }),
  schema: z.object({
    // サムネイル（トップページカード）
    title: z.string(),
    type: z.string(),
    price: z.string(),
    appeal: z.string().optional(),
    image: z.string(),
    status: z.enum(["販売中", "商談中", "成約済"]),
    order: z.number().default(0),
    // 詳細（物件概要テーブル）
    address: z.string().optional(),
    access: z.string().optional(),
    layout: z.string().optional(),
    landArea: z.string().optional(),
    buildingArea: z.string().optional(),
    elementarySchool: z.string().optional(),
    juniorHighSchool: z.string().optional(),
    floors: z.string().optional(),
    landRight: z.string().optional(),
    buildYear: z.string().optional(),
    structure: z.string().optional(),
    parking: z.string().optional(),
    cityPlanning: z.string().optional(),
    zoning: z.string().optional(),
    landCategory: z.string().optional(),
    buildingCoverageRatio: z.string().optional(),
    terrain: z.string().optional(),
    roadAccess: z.string().optional(),
    currentState: z.string().optional(),
    delivery: z.string().optional(),
    transactionType: z.string().optional(),
  }),
});

export const collections = { blog, properties };
