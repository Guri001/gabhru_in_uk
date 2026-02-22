import { groq } from "next-sanity";

// Query for the list of articles
export const ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "categoryTitles": categories[]->title,
    excerpt,
    publishedAt,
    "coverImage": coverImage.asset->url
  }
`;

// Query for a single article by slug
export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    "authorName": author->name,
    "authorImage": author->image.asset->url,
    "authorBio": author->bio,
    "categoryTitles": categories[]->title,
    content,
    "pdfUrl": pdf.asset->url,
    publishedAt,
    "coverImage": coverImage.asset->url,
    "relatedArticles": *[_type == "article" && _id != ^._id && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
      _id,
      title,
      "slug": slug.current,
      "categoryTitles": categories[]->title,
      "coverImage": coverImage.asset->url,
      publishedAt
    }
  }
`;
