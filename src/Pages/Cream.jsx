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

const Cream = () => {
  const [creams, setCreams] = useState([]); // Renamed from cars to creams
  const [filteredCreams, setFilteredCreams] = useState([]); // Renamed from filteredCars to filteredCreams
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreams = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await client.fetch(`
          *[_type == "cream"] { // Adjusted to fetch "cream" data
            title,
            slug,
            image {
              asset->{ url },
              alt
            },
            about,
            overview,
            Ingredients,
            usage,
           Benefits,
          Packaging,
          Reviews,
          Precautions
          }
        `);

        if (!data || data.length === 0) {
          setError(new Error("No creams found"));
        } else {
          setCreams(data);
          setFilteredCreams(data); // Initialize filtered list
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCreams();
  }, []);

  // Filter creams based on search query
  useEffect(() => {
    const filteredResults = creams.filter((cream) =>
      cream.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCreams(filteredResults);
  }, [searchQuery, creams]);

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
    return <div className="text-red-500 p-4">Error loading creams: {error.message}</div>;
  }

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="m-4 md:m-8 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for a cream..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cream List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCreams.length > 0 ? (
          filteredCreams.map((cream, index) => (
            <div className="shadow-lg rounded-md p-4 w-full" key={cream?.slug?.current || `cream-${index}`}>
              {cream.image?.asset && (
                <img
                  src={urlFor(cream.image).width(400).url()}
                  alt={cream.image?.alt || cream.title || "Cream image"}
                  className="w-full h-[200px] object-cover rounded-t-md"
                  loading="lazy"
                />
              )}

              <h3 className="text-colorPrimary font-merriweather-sans text-lg font-bold mt-2">
                {cream.title}
              </h3>

              {cream.about && (
                <div className="font-merriweather-sans text-sm mt-2">
                  <BlockContent
                    blocks={cream.about}
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
                aria-label={`Read more about ${cream.title}`}
                type="button"
                className="flex items-center mt-2 text-blue-600 hover:text-blue-800 transition-all"
                onClick={() => navigate(`/creamDetails/${cream?.slug?.current}`)} // Changed to creamDetails
              >
                Read more <FaArrowRight className="ml-2 mt-[4px]" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-3">No creams match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Cream;
