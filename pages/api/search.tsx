import { allPosts, Post } from 'contentlayer/generated'
import type { NextApiRequest, NextApiResponse } from 'next'
import MiniSearch from 'minisearch'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    type SearchIndex = {
        id: string;
        title: string;
        slug: string;
        tags: string;
        categories: string;
        type: string;
        description: string;
    }

    const query: string | string[] = req.query.q.toString()

    const postIndexes: SearchIndex[] = allPosts.map( (post, idx) => ({
        id: post.videoID + '__' + idx,
        title: post.title,
        slug: post.slug,
        tags: post.tag.join(', '),
        categories: post.category.join(', '),
        type: 'post',
        description: post.body.raw
    }) )

    let miniSearch = new MiniSearch({
        fields: ['title', 'tags', 'categories', 'description'], // fields to index for full-text search
        storeFields: ['title', 'slug', ] // fields to return with search results
    })
      
    // Index all documents
    miniSearch.addAll(postIndexes)
      
    // Search with default options
    let results: any = miniSearch.search( query, {} )

    res.status(200).json( results )
}