import React, {useState ,useEffect} from "react";
import { client } from "../Client/Client";
import BlockContent from '@sanity/block-content-to-react';
import imageUrlBuilder from '@sanity/image-url'
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Food = () => {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setIsLoading(true);
        const data = await client.fetch(`
          *[_type == "food"] {
            title,
            slug,
            image {
              asset->{ url },
              alt
            },
            about,
            ingredients,  // Fixed typo here (was 'ingredeints')
            benefits,
            body
          } | order(_createdAt desc)
        `);
        setFoods(data);
      } catch (err) {
        console.error("Failed to fetch foods:", err);
        setError(err.message || "Error loading foods");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[...Array(3)].map((_, index) => (
            <div className="shadow-lg rounded-md p-4 w-full" key={`loading-${index}`}>
              <div className="w-full h-[200px] bg-gray-200 animate-pulse rounded-t-md" />
              <div className="h-4 bg-gray-200 animate-pulse mt-2 w-3/4" />
              <div className="h-3 bg-gray-200 animate-pulse mt-2 w-full" />
              <div className="h-3 bg-gray-200 animate-pulse mt-1 w-5/6" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">Error loading foods: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {foods.map((food, index) => (
          <div className="shadow-lg rounded-md p-4 w-full" key={`${food.slug?.current}-${index}`}>
            {food.image?.asset && (
              <img
                src={urlFor(food.image).width(400).url()}
                alt={food.image?.alt || food.title || 'Food image'}
                className="w-full h-[200px] object-cover rounded-t-md"
                loading="lazy"
              />
            )}
            <h3 className="text-colorPrimary font-merriweather-sans text-lg font-bold mt-2">
              {food.title}
            </h3>
            {food.about && (
              <div className="font-merriweather-sans text-sm mt-2">
                <BlockContent 
                  blocks={food.about}
                  projectId="6qtjsivo"
                  dataset="production"
                  className="font-merriweather-sans text-sm"
                  serializers={{
                    types: {
                      block: (props) => <p className="mb-4">{props.children}</p>,
                    },
                  }}
                />
              </div>
            )}
            <button 
              type="button" 
              className="flex items-center" 
              onClick={() => food.slug?.current && navigate(`/food/${food.slug.current}`)}
            >
              read more <FaArrowRight className="ml-2 mt-[4px] hover:to-blue-700 transition-all"/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;