import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../Client/Client";
import { PortableText } from "@portabletext/react";

const CarDetails = () => {
  const [singleCar, setSingleCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await client.fetch(
          `*[_type == "car" && slug.current == $slug][0] {
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
          }`,
          { slug }
        );

        if (!data) {
          setError(true);
        } else {
          setSingleCar(data);
        }
      } catch (err) {
        console.error("Failed to fetch car:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [slug]);

  if (loading)
    return <h1 className="text-center mt-10 text-gray-600">Loading car details...</h1>;

  if (error || !singleCar)
    return (
      <h2 className="text-center mt-10 text-red-500">
        {error ? "Failed to load car details." : "Car not found."}
      {  console.log(error)}
      </h2>
    );
  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        {singleCar.image?.asset?.url && (
          <img
            src={singleCar.image.asset.url}
            alt={singleCar.image?.alt || "Car image"}
            className="w-full sm:w-1/2 m-5 rounded-xl"
          />
        )}
      </div>
      
      <h1 className="text-center text-[2.5rem] sm:text-[4rem] font-semibold">
        {singleCar.title}
      </h1>

     
      {singleCar.about && (
        <div className="prose lg:prose-xl mx-auto my-6">
          <h2 className="font-bold text-xl mb-2">About</h2>
          {typeof singleCar.about === "string" ? (
            <p>{singleCar.about}</p>
          ) : (
            <PortableText value={singleCar.about} />
          )}
        </div>
      )}

    
      <div className="">
        {singleCar.information && (
          <div className="prose lg:prose-xl mx-auto m-5">
            <h2 className="font-bold text-xl mb-2">Information</h2>
            <PortableText value={singleCar.information} />
          </div>
        )}
        {singleCar.performance && (
          <div className="prose lg:prose-xl mx-auto m-5">
            <h2 className="font-bold text-xl mb-2">Performance</h2>
            <PortableText value={singleCar.performance} />
          </div>
        )}
        {singleCar.features && (
          <div className="prose lg:prose-xl mx-auto m-5">
            <h2 className="font-bold text-xl mb-2">Features</h2>
            <PortableText value={singleCar.features} />
          </div>
        )}
 

     
      {singleCar.levels && (
        <div className="prose lg:prose-xl mx-auto my-6">
          <h2 className="font-bold text-xl mb-2">Trim Levels</h2>
          <PortableText value={singleCar.levels} />
        </div>
      )}

    
      {singleCar.prices && (
        <div className="prose lg:prose-xl mx-auto my-6">
          <h2 className="font-bold text-xl mb-2">Pricing</h2>
          <PortableText value={singleCar.prices} />
        </div>
      )}
    </div>
    </div>
  );
};

export default CarDetails;
