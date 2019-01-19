import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

export const pageQuery = graphql`
  query IndexQuery {
    prismicHomepage {
      data {
        title {
          text
        }
        description {
          html
        }
      }
    }
  }
`;

const IndexPage = ({ data: { prismicHomepage } }) => {  // Immediate destructuring of data { prismicHomePage
  const page = prismicHomepage.data;

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>{page.title.text}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: page.description.html }}  
      />
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <Link to="/prismic/">Go to Prismic</Link>
    </Layout>
  );
};

export default IndexPage;
