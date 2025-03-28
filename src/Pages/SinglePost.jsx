import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../Client/Client";
import { PortableText } from "@portabletext/react";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(false);
        const data = await client.fetch(
          `*[_type == "food" && slug.current == $slug][0] {
            title,
            slug,
            image {
              asset->{ url },
              alt
            },
            about,
            ingredients,
            benefits,
            body
          }`,
          { slug }
        );

        if (!data) {
          setError(true);
        } else {
          setSinglePost(data);
        }
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h2 className="text-center mt-10 text-red-500">Failed to load post.</h2>;
  if (!singlePost) return <h2 className="text-center mt-10">Post Not Found</h2>;

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center">
        {singlePost.image?.asset?.url && (
          <img
            src={singlePost.image.asset.url}
            alt={singlePost.image.alt || "Post image"}
            className="w-full sm:w-1/2 m-5 rounded-xl"
          />
        )}
      </div>
      <h1 className="text-center text-[2.5rem] sm:text-[4rem] font-semibold">
        {singlePost.title}
      </h1>

      {singlePost.about && <PortableText value={singlePost.about} />}

      <div className="grid md:grid-cols-3 gap-4 my-6">
        {singlePost.ingredients && (
          <div className="prose lg:prose-xl mx-auto">
            <PortableText value={singlePost.ingredients} />
          </div>
        )}
        {singlePost.body && (
          <div className="prose lg:prose-xl mx-auto">
            <PortableText value={singlePost.body} />
          </div>
        )}
        {singlePost.benefits && (
          <div className="prose lg:prose-xl mx-auto">
            <PortableText value={singlePost.benefits} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SinglePost;
