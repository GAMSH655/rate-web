import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../Client/Client";
import { PortableText } from "@portabletext/react";

const CreamDetails = () => {
  const [singleCream, setSingleCream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchCreams = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await client.fetch(
          `*[_type == "cream" && slug.current == $slug][0] {
            title,
            slug,
            image {
              asset->{ url },
              alt
            },
            about,
            overview,
            ingredients,
            usage,
            benefits,
            packaging,
            reviews,
            precautions
          }`,
          { slug }
        );

        if (!data) {
          setError(true);
        } else {
          setSingleCream(data);
        }
      } catch (err) {
        console.error("Failed to fetch cream:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCreams();
  }, [slug]);

  if (loading)
    return <h1 className="text-center mt-10 text-gray-600">Loading cream details...</h1>;

  if (error || !singleCream)
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error ? "Failed to load cream details." : "Cream not found."}
        {console.log(error)}
      </h2>
    );

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        {singleCream.image?.asset?.url && (
          <img
            src={singleCream.image.asset.url}
            alt={singleCream.image?.alt || "Cream image"}
            className="w-full sm:w-1/2 m-5 rounded-xl"
          />
        )}
      </div>

      <h1 className="text-center text-[2.5rem] sm:text-[4rem] font-semibold">
        {singleCream.title}
      </h1>

      {singleCream.about && (
        <div className="prose lg:prose-xl mx-auto my-6">
          <h2 className="font-bold text-xl mb-2">About</h2>
          {typeof singleCream.about === "string" ? (
            <p>{singleCream.about}</p>
          ) : (
            <PortableText value={singleCream.about} />
          )}
        </div>
      )}

      {singleCream.overview && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Overview</h2>
          <PortableText value={singleCream.overview} />
        </div>
      )}
      
      {singleCream.ingredients && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Ingredients</h2>
          <PortableText value={singleCream.ingredients} />
        </div>
      )}

      {singleCream.usage && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Usage</h2>
          <PortableText value={singleCream.usage} />
        </div>
      )}

      {singleCream.benefits && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Benefits</h2>
          <PortableText value={singleCream.benefits} />
        </div>
      )}

      {singleCream.packaging && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Packaging</h2>
          <PortableText value={singleCream.packaging} />
        </div>
      )}

      {singleCream.reviews && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Reviews</h2>
          <PortableText value={singleCream.reviews} />
        </div>
      )}

      {singleCream.precautions && (
        <div className="prose lg:prose-xl mx-auto m-5">
          <h2 className="font-bold text-xl mb-2">Precautions</h2>
          <PortableText value={singleCream.precautions} />
        </div>
      )}
    </div>
  );
};

export default CreamDetails;
