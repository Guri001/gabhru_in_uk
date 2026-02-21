import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag, revalidatePath } from 'next/cache'

// This endpoint should only be called through POST from a Sanity webhook.
export async function POST(req: NextRequest) {
  try {
    const { secret, slug } = await req.json()

    // 1. Secure Validation
    // Validate the incoming request came from Sanity by checking for our shared secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid revalidation secret' }, { status: 401 })
    }

    // 2. Next.js Revalidation (App Router approach)
    // Pages router used `res.revalidate('/path')`. App router uses tags/paths.
    if (slug) {
      // Revalidate specifically tagged queries
      revalidateTag(`article-${slug}`)
      
      // We can also revalidate the exact path
      revalidatePath(`/articles/${slug}`)
    } else {
      // Broad fallback: Revalidate all article pages if no specific slug is provided
      revalidatePath('/articles/[slug]', 'page')
    }

    // 3. Fallback: Site-wide Vercel Deploy Hook
    // If you need global changes triggered by a publish event (e.g. Navigation structure changed).
    // if (process.env.VERCEL_DEPLOY_HOOK_URL) {
    //   await fetch(process.env.VERCEL_DEPLOY_HOOK_URL, { method: 'POST' })
    // }

    return NextResponse.json({ 
      revalidated: true, 
      time: Date.now(), 
      slug: slug || 'all' 
    })
  } catch (err: any) {
    console.error('Webhook error:', err)
    return NextResponse.json({ message: 'Internal Server Error', error: err.message }, { status: 500 })
  }
}
