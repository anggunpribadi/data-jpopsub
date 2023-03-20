import { compareDesc, format, parseISO } from 'date-fns'
import { allPosts, Post } from 'contentlayer/generated'
import slug from 'slug'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const start: number = Date.now()
    const posts: Post[] = allPosts.sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
    })
    console.log(posts.length)
    const catList: string[] = posts.map( (post) => post.category ).flat(1)
    const catListUnique: any = [...new Set(catList)].map( (cat) => ({slug: slug(cat), name: cat}))
    const catListUniqueCounted = catListUnique.map( (cat) => {
        return {
            slug: cat.slug,
            name: cat.name,
            count: catList.filter( (ct) => cat.name === ct ).length
        }
    })

    const proccesTime: number = Date.now() - start
    console.log(`Build time: ${proccesTime/1000}s`)
    res.status(200).json({totalCategories: catListUnique.length, categories: catListUniqueCounted})
}