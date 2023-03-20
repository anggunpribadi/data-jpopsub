import { allPosts, Post } from 'contentlayer/generated'
import slug from 'slug'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const start: number = Date.now()
    const post: Post = allPosts.find(
        (post) => post._raw.flattenedPath === req.query.slug
    );
    const proccesTime: number = Date.now() - start
    console.log(`Build time: ${proccesTime/1000}s`)      
    
    res.status(200).json( post )
}