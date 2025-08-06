import { config, fields, collection } from "@keystatic/core";

import { block } from "@keystatic/core/content-components";

export default config({
  storage:
    process.env.NODE_ENV === "production"
      ? {
          kind: "github",
          repo: {
            owner: "BrunoYDev",
            name: "My-Blog",
          },
        }
      : {
          kind: "local",
        },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/**",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({
          label: "Publish Date",
          validation: { isRequired: true },
        }),
        author: fields.text({ label: "Author" }),
        excerpt: fields.text({ label: "Excerpt", multiline: true }),
        pinned: fields.checkbox({
          label: "Is this the Pinned Post?",
          defaultValue: false,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({
          label: "Body Content",
          options: {
            image: {
              directory: "public/postImages",
              publicPath: "/postImages/",
            },
          },
          components: {
            CenteredImage: block({
              label: "Centered Image",
              schema: {
                src: fields.image({
                  label: "Image File",
                  directory: "public/postImages/",
                  publicPath: "/postImages/",
                  validation: { isRequired: true },
                }),
                alt: fields.text({
                  label: "Alt Text",
                  validation: { isRequired: true },
                }),
                width: fields.number({
                  label: "Width",
                  validation: { isRequired: true },
                }),
                height: fields.number({
                  label: "Height",
                  validation: { isRequired: true },
                }),
              },
            }),
            YouTube: block({
              label: 'YouTube Video',
              schema: {
                videoId: fields.text({
                  label: 'YouTube Video ID',
                  description: 'Paste the video ID from the YouTube URL (e.g., dQw4w9WgXcQ)',
                  validation: { isRequired: true }
                }),
              },
              ContentView: (props) => `📺 YouTube Video ID: ${props.value.videoId}`
            }),
          },
        }),
      },
    }),
  },
});
