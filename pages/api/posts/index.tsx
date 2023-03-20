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
    const filtered: Post[] = posts.filter( ( post: Post, idx: number) => {
        if ( !req.query.tag && !req.query.category) {
            return true
        }
        let tagTester: boolean = true
        let catTester: boolean = true
        if ( req.query.tag ) {
            tagTester = post.tag.map( ( tg: string ) => slug(tg) ).includes(req.query.tag as string) 
        }
        if ( req.query.category ) {
            catTester = post.category.map( ( cat: string ) => slug(cat) ).includes(req.query.category as string) 
        }

        return ( catTester && tagTester )

    } )
    const totalPosts: number = filtered.length
    const offset: number = req.query.offset ? Number(req.query.offset) : 0
    const limit: number = req.query.limit ? Number(req.query.limit) : 0
    let paginated: Post[] = []
    if ( limit === 0 ) {
        paginated = filtered.slice(offset)
    } else {
        paginated = filtered.slice(offset, offset + limit )
    }
    const proccesTime: number = Date.now() - start
    console.log(`Build time: ${proccesTime/1000}s`)

    res.status(200).json( { totalPost: totalPosts, posts: paginated } )
    
}