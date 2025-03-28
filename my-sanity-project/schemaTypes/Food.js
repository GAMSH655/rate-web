import { defineField, defineType } from "sanity";
export default defineType({
  name: "food",
  title: "Food",
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
      title: "About",
      type: "blockContent",
    }),
    defineField({
      name: "instructions", 
      title: "instructions",
      type: "blockContent",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent", 
    }),
    defineField({
      name: "benefits",
      title: "benefits",
      type: "blockContent", 
    }),
  ],
});
