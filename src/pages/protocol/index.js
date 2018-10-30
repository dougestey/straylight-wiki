import React from 'react'
import Link, { navigateTo } from 'gatsby-link'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import Helmet from 'react-helmet'
import LazyLoad from 'react-lazyload'

import ProtocolCard from '../../components/ProtocolCard'
import ProtocolMenu from '../../components/ProtocolMenu'
import Session from '../../services/session'

class ProtocolEntry extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      $('.card.card-protocol').each((index, element) => {
        let delay = index * 75

        setTimeout(() => $(element).css({ opacity: 1 }), 0 + delay)
      })
    }, 500)
  }

  getAuthor(id, authors) {
    let author = authors.find(({ author }) => author.ghostId === id)

    if (author) return author.author
  }

  render() {
    // if (!Session.state || !Session.state.isInitialized) {
    //   navigateTo('/')
    //   return null
    // }

    const site = get(this, 'props.data.site.siteMetadata')
    const posts = get(this, 'props.data.postResource.posts')
    const featuredPosts = get(this, 'props.data.featuredPostResource.posts')
    const tags = get(this, 'props.data.tagResource.tags')
    const authors = get(this, 'props.data.authorResource.authors')

    const pageLinks = []

    if (featuredPosts) {
      featuredPosts.map((data, i) => {
        pageLinks.push(
          <LazyLoad height={500} offset={500} once={true} key={i}>
            <ProtocolCard
              data={data.post}
              site={site}
              author={this.getAuthor(data.post.author, authors)}
              isIndex={true}
              key={i}
            />
          </LazyLoad>
        )
      })
    }

    if (posts) {
      posts.map((data, i) => {
        pageLinks.push(
          <LazyLoad height={500} offset={500} once={true} key={i + 1}>
            <ProtocolCard
              data={data.post}
              site={site}
              author={this.getAuthor(data.post.author, authors)}
              isIndex={true}
              key={i + 1}
            />
          </LazyLoad>
        )
      })
    }

    return (
      <div>
        <Helmet
          title={get(site, 'title')}
          meta={[
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: `@${get(site, 'twitter')}` },
            { property: 'og:title', content: get(site, 'title') },
            { property: 'og:type', content: 'website' },
            { property: 'og:description', content: get(site, 'description') },
            { property: 'og:url', content: get(site, 'url') },
            {
              property: 'og:image',
              content: `${get(site, 'url')}/img/profile.jpg`,
            },
          ]}
        />
        <section className="pt-4">
          <ProtocolMenu tags={tags} {...this.props} />

          <div className="container p-0">
            <div className="card-columns">{pageLinks}</div>
          </div>
        </section>
      </div>
    )
  }
}

export default ProtocolEntry

export const pageQuery = graphql`
  query ProtocolQuery {
    site {
      siteMetadata {
        title
        description
        url: siteUrl
        author
        twitter
        adsense
      }
    }
    tagResource: allGhostTag {
      tags: edges {
        tag: node {
          ghostId
          slug
          name
        }
      }
    }
    postResource: allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { featured: { eq: false } }
    ) {
      posts: edges {
        post: node {
          id
          slug
          title
          html
          published_at(formatString: "YYYY/MM/DD")
          author
          tags {
            id
            name
            slug
          }
        }
      }
    }
    featuredPostResource: allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { featured: { eq: true } }
    ) {
      posts: edges {
        post: node {
          id
          slug
          title
          html
          published_at(formatString: "YYYY/MM/DD")
          author
          featured
          tags {
            id
            name
            slug
          }
        }
      }
    }
    authorResource: allGhostAuthor {
      authors: edges {
        author: node {
          ghostId
          name
          profile_image
        }
      }
    }
  }
`
