import {Link} from '@shopify/hydrogen/client';

export default function Navigation({collections}) {
  console.log('hdrcategory',collections)
  return (
    <nav className="hidden lg:block text-center">
      <ul className="md:flex items-center justify-center">
        {collections.map((collection) => 
        console.log('headercollection',collection)(
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
