import Head from 'next/head'
import Link from 'next/link'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'

const Blog = ({ posts }) => {
  const url = "https://jkgan.com/blog"
  const title = "Blog - Gan Jun Kai"
  const description = "Jun Kai writes about software engineering and programming"

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const fadeInEaseInOut = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      }
    },
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <title>Articles - Gan Jun Kai</title>

        <meta property="og:url" content={url} />
        <meta property="og:image" content="https://jkgan.com/bg.jpeg" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className="flex container mx-auto mt-16 w-11/12 2xl:w-6/12 xl:w-7/12 lg:w-8/12 md:w-10/12">
          <div className="divide-y-2 w-full">
              <div>
                <motion.h1 
                  className="text-left font-bold text-4xl mb-3"
                  variants={fadeInEaseInOut}
                  initial="hidden"
                  animate="visible"
                >
                  Articles
                </motion.h1>
              </div>
              <div>
                <motion.ul className="mt-8" variants={fadeIn} initial="hidden" animate="visible" transition={{ delayChildren: 0.15, staggerChildren: 0.15 }}>
                    {posts.map((post, _index) => {
                        return (
                            <motion.li className="mb-10" key={post.id} variants={fadeInEaseInOut}>
                                <Link href={`/blog/${post.slug}`}>
                                    <a className="text-2xl mb-2 font-semibold hover:text-cyan-400">{post.title}</a>
                                </Link>
                                <p className="text-base text-blueGray-500 mb-2">{post.subtitle || '...'}</p>
                                <ul className="flex flex-wrap">
                                  {post.tags.map((tag) => {
                                    return (
                                      <li key={tag} className="mb-2">
                                        <Link href={`/tags/${tag}`}>
                                          <a className="text-sm mr-2 py-1 px-2 rounded-xl bg-blueGray-100 hover:bg-blueGray-200">#{tag}</a>
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                                <p className="text-sm text-blueGray-400">{dayjs(post.date).format('MMMM D, YYYY')}</p>
                            </motion.li>
                        )
                    })}
                </motion.ul>
              </div>
          </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
    const fs = require('fs')
    const matter = require('gray-matter')
    const uniqid = require('uniqid')

    const files = fs.readdirSync(`${process.cwd()}/posts`, 'utf-8')

    const posts = files
        .filter((fn) => fn.endsWith('.md'))
        .map((fn) => {
            const path = `${process.cwd()}/posts/${fn}`
            const rawContent = fs.readFileSync(path, {
                encoding: 'utf-8',
            })
            const { data } = matter(rawContent)

            return { ...data, id: uniqid() }
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date))

    return {
        props: { posts },
    }
}

export default Blog