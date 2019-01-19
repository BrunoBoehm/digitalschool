import React from "react";
import { graphql } from "gatsby";

import Layout from '../components/layout';

// query will return { data : { prismicBlogPost: { ... } } }
export const pageQuery = graphql`
    query PostBySlug($uid: String!) {
        prismicBlogPost(uid: { eq: $uid }) {
            uid
            data {
                title {
                    text
                }
                intro {
                    text
                }
            }
        }
    }
`;

const Post = ({ data: { prismicBlogPost } }) => {
    const { data } = prismicBlogPost;

    return (
        <Layout>
            <h1>{data.title.text}</h1>
            <p className="introduction">{data.intro.text}</p>
        </Layout>
    )
}

export default Post;