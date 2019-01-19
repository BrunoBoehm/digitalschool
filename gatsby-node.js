/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

/**
 * 
 * called only after the initial sourcing and transformation of nodes 
 * plus creation of the GraphQL schema are complete 
 * so you can query your data in order to create pages
 * 
 * @link https://www.gatsbyjs.org/docs/node-apis/#createPages
 */

exports.createPages = async ({ graphql, actions }) => {
    // Gatsby action for creating a page
    // https://www.gatsbyjs.org/docs/actions/#createPage
    const { createPage } = actions;

    // graphql function returns a promise so we can use this little promise helper to have a nice result/error state
    const wrapper = promise => promise.then(result => ({ result, error: null })).catch(error => ({ error, result: null }));  

    // query for nodes to use for creating pages as promise
    // promise will return asynchronously as { data { ... } } 
    const { result, error } = await wrapper(
        graphql(`
            {
                allPrismicBlogPost{
                edges {
                    node {
                    uid
                    tags
                    data {
                        title {
                        text
                        }
                        intro {
                        text
                        }
                        cover {
                        alt
                        url
                        }
                        link {
                        url
                        }
                        video {
                        embed_url
                        }
                    }
                    }
                }
                }
            }
        `)
    );
    
    if(!error) {
        const postsList = result.data.allPrismicBlogPost.edges;

        postsList.forEach( edge => {
            createPage({
                path: `/${edge.node.uid}`,
                component: path.resolve( 'src/templates/blog-post.js' ),
                context: {  // passed as props to component and component's GraphQL query
                    // path (from above) is always available
                    uid: edge.node.uid,
                },
            })
        });

        return // Out: will not attain the error log below
    }

    console.log(error);
}
