import {Link} from '@shopify/hydrogen/client';
import {
  useShopQuery,
  flattenConnection,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

export default function Navigation({collections}) {
  //console.log('hdrcategory',collections)
  const { data } = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 5,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });

  const allcollections = data ? flattenConnection(data.collections) : null;
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center">
        {/* {console.log('allcollections',allcollections)} */}
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link
              to={`/collections/${collection.handle}`}
              className="block p-4 hover:opacity-80"
            >
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}


const QUERY = gql`
  query indexContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
`;