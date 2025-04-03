import { defineField, defineType } from "sanity";
export default defineType({
  name: "cream",
  title: "Cream",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title", // ✅ Corrected to reference 'title' field
        maxLength: 96,
      },
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "about", 
      title: "about",
      type: "blockContent",
    }),
    defineField({
      name: "overview", 
      title: "Product-overview",
      type: "blockContent",
    }),
    defineField({
      name: "ingredients", 
      title: "Ingredients",
      type: "blockContent",
    }),
    defineField({
      name: "usage",
      title: "usage",
      type: "blockContent", 
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "blockContent", 
    }),
    defineField({
      name: "packaging",
      title: "Packaging",
      type: "blockContent", 
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "blockContent", 
    }),
    defineField({
      name: "precautions",
      title: "Precautions",
      type: "blockContent", 
    }),
  ],
});
