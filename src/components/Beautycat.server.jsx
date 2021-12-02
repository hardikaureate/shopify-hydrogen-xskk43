import {
  useShopQuery,
  flattenConnection,
  ProductProviderFragment,
  Image,
  Link,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';


import ProductCard from './ProductCard.server';


export default function Beautycat({country = {isoCode: 'US'}}) {
  const {data} = useShopQuery({
    query: QUERY
    
  });

  const collections = data ? flattenConnection(data.collections) : [];
  const featuredProductsCollection = collections[2];
  const featuredProducts = featuredProductsCollection
    ? flattenConnection(featuredProductsCollection.products)
    : null;
  const featuredCollection =
    collections && collections.length > 1 ? collections[1] : collections[0];
  console.log('beautyProduct', collections )

  return (
   
      <div className="relative mb-12">
        
        <div className="bg-white p-12 shadow-xl rounded-xl mb-10">
          {featuredProductsCollection ? (
            <>
              <div className="flex justify-between items-center mb-8 text-md font-medium">
                <span className="text-black uppercase">
                  {featuredProductsCollection.title}
                </span>
                <span className="hidden md:inline-flex">
                  <Link
                    to={`/collections/${featuredProductsCollection.handle}`}
                    className="text-blue-600 hover:underline"
                  >
                    Shop all
                  </Link>
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                {featuredProducts.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className="md:hidden text-center">
                <Link
                  to={`/collections/${featuredCollection.handle}`}
                  className="text-blue-600"
                >
                  Shop all
                </Link>
              </div>
            </>
          ) : null}
        </div>
        
      </div>
    
  );
}

const QUERY = gql`
query indexContent(
  $country: CountryCode
  # $numCollections: Int = 2
  # $numProducts: Int = 3
  $numProductMetafields: Int = 0
  $numProductVariants: Int = 20
  $numProductMedia: Int = 1
  $numProductVariantMetafields: Int = 10
  $numProductVariantSellingPlanAllocations: Int = 0
  $numProductSellingPlanGroups: Int = 0
  $numProductSellingPlans: Int = 0
) @inContext(country: $country) {
  collections(first: 3) {
    edges {
      node {
        descriptionHtml
        description
        handle
        id
        title
        image {
          ...ImageFragment
        }
        products(first: 7) {
          edges {
            node {
              ...ProductProviderFragment
            }
          }
        }
      }
    }
  }
}

${ProductProviderFragment}
${Image.Fragment}
`;




