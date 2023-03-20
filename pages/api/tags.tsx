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
    const tagList: string[] = posts.map( (post) => post.tag ).flat(1)
    const tagListUnique: any = [...new Set(tagList)].map( (tag) => ({slug: slug(tag), name: tag}))
    const tagListUniqueCounted = tagListUnique.map( (tag) => {
        return {
            slug: tag.slug,
            name: tag.name,
            count: tagList.filter( (tg) => tag.name === tg ).length
        }
    })

    const proccesTime: number = Date.now() - start
    console.log(`Build time: ${proccesTime/1000}s`)
    res.status(200).json({totalTags: tagListUnique.length, tags:tagListUniqueCounted})
}