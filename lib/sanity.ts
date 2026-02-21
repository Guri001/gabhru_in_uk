import { createClient, type QueryParams } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-02-21'

/**
 * Returns a typed Sanity client.
 * - useCdn: true (default) for fast edge caching during production.
 * - useCdn: false for previews/drafts, bypassing the cache.
 */
export function getClient(preview?: { token?: string }) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: preview ? false : true,
    perspective: preview ? 'previewDrafts' : 'published',
  })

  // If a read token is provided for draft mode, use it to fetch unpublished content
  if (preview?.token) {
    return client.withConfig({
      token: preview.token,
      useCdn: false, // Must be false for draft fetching
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }

  return client
}

/**
 * Reusable helper to execute GROQ queries.
 * Tags can be provided to support targeted Next.js ISR revalidation via webhooks.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  preview = false,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  preview?: boolean
}): Promise<QueryResponse> {
  const client = getClient(
    preview ? { token: process.env.SANITY_READ_TOKEN } : undefined
  )

  return client.fetch<QueryResponse>(query, params, {
    next: {
      tags, // Used by caching: revalidateTag(`article-${slug}`)
    },
  })
}
