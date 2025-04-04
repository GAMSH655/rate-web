import React, { useState, useEffect } from "react";
import { client } from "../Client/Client";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

const Car = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await client.fetch(`
          *[_type == "car"] {
            title,
            slug,
            image {
              asset->{ url },
              alt
            },
            about,
            information,
            performance,
            features,
            levels,
            prices
          }
        `);

        if (!data || data.length === 0) {
          setError(new Error("No cars found"));
        } else {
          setCars(data);
          setFilteredCars(data); // Initialize filtered list
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter cars based on search query
  useEffect(() => {
    const filteredResults = cars.filter((car) =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCars(filteredResults);
  }, [searchQuery, cars]);

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
    return <div className="text-red-500 p-4">Error loading cars: {error.message}</div>;
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className=" m-4 md:m-8 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a car..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Car List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCars.length > 0 ? (
          filteredCars.map((car, index) => (
            <div className="shadow-lg rounded-md p-4 w-full" key={car?.slug?.current || `car-${index}`}>
              {car.image?.asset && (
                <img
                  src={urlFor(car.image).width(400).url()}
                  alt={car.image?.alt || car.title || "Car image"}
                  className="w-full h-[200px] object-cover rounded-t-md"
                  loading="lazy"
                />
              )}

              <h3 className="text-colorPrimary font-merriweather-sans text-lg font-bold mt-2">
                {car.title}
              </h3>

              {car.about && (
                <div className="font-merriweather-sans text-sm mt-2">
                  <BlockContent
                    blocks={car.about}
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
                aria-label={`Read more about ${car.title}`}
                type="button"
                className="flex items-center mt-2 text-blue-600 hover:text-blue-800 transition-all"
                onClick={() => navigate(`/carDetails/${car?.slug?.current}`)}
              >
                Read more <FaArrowRight className="ml-2 mt-[4px]" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No cars match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Car;
