require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Digital School`,
    description: `Nous vous apportons les connaisances digitales nécessaires à votre succès sur le web.`,
    author: `@lyketil`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-prismic',
      options: {
        repositoryName: 'digitalschool', // (required)
        accessToken: `${process.env.PRISMIC_ACCESS_TOKEN}`, // (optional)
        linkResolver: ({ node, key, value }) => post => {
          `/${post.uid}`
        },
      }
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
