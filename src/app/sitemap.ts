import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000'
  return [
    {
      url         : baseUrl,
      lastModified: new Date(),
    },
    {
      url         : baseUrl + '/login',
      lastModified: new Date(),
    }
  ]
}