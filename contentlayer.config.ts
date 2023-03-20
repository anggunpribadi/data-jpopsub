import { defineNestedType, defineDocumentType, makeSource } from 'contentlayer/source-files'
import slug from 'slug'

const Term = defineNestedType(() => ({
  name: 'Term',
  fields: {
    name: { type: 'string', required: true },
    slug: { type: 'string', required: true},
  },
}))

const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*/index.md`,
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    tag: {
      type: 'list',
      of: {type: 'string'},
      required: false,
    },
    category: {
      type: 'list',
      of: {type: 'string'},
      required: false,
    },
    videoID: {
      type: 'string',
      required: false
    },
    subTitle: {
      type: 'string',
      required: false
    }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
    },
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    tags: {
      type: 'list',
      of: Term,
      resolve: (doc) => doc.tag['_array'].map( (t: string) => ({
        name: t,
        slug: slug(t)
      }) ),
    },
    categories: {
      type: 'list',
      of: Term,
      resolve: (doc) => doc.category['_array'].map( (cat: string) => ({
        name: cat,
        slug: slug(cat)
      }) ),
    },
  },
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
})
