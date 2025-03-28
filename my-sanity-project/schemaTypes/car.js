import { defineField, defineType } from "sanity";
export default defineType({
  name: "car",
  title: "Car",
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
        source: "title",
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
      name: "information", 
      title: "information",
      type: "blockContent",
    }),
    defineField({
      name: "perfomance", 
      title: "performance",
      type: "blockContent",
    }),
    defineField({
      name: "features",
      title: "features",
      type: "blockContent", 
    }),
    defineField({
      name: "levels",
      title: "levels",
      type: "blockContent", 
    }),
    defineField({
      name: "prices",
      title: "prices",
      type: "blockContent", 
    }),
  ],
});
