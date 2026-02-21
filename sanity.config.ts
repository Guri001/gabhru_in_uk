import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import article from './sanity/schemas/article'
import author from './sanity/schemas/author'
import category from './sanity/schemas/category'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  title: 'Gabhru in UK Content Studio',
  schema: {
    types: [article, author, category],
  },
  plugins: [structureTool()],
})
