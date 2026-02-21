import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  // Prevent unauthorized access 
  if (secret !== process.env.SANITY_READ_TOKEN) {
    return new Response('Invalid token', { status: 401 })
  }

  if (!slug) {
    return new Response('Missing slug parameters', { status: 400 })
  }

  // Next.js 14 and below `draftMode().enable()` is synchronous.
  draftMode().enable()

  // Redirect to the article. The user will be carrying Draft Mode cookies.
  redirect(`/articles/${slug}`)
}
