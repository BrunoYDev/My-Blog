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
      label: "Publicações",
      slugField: "title",
      path: "posts/**",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Título" } }),
        date: fields.date({
          label: "Data de publicação",
          validation: { isRequired: true },
        }),
        author: fields.text({ label: "Autor" }),
        excerpt: fields.text({ label: "Resumo", multiline: true }),
        pinned: fields.checkbox({
          label: "Este é o post fixado?",
          defaultValue: false,
        }),
        hidden: fields.checkbox({
          label: "Ocultar este post",
          defaultValue: false,
        }),
        showToc: fields.checkbox({
          label: "Sumarizar",
          description: "Ative para mostrar o sumário cibernético lateral neste post.",
          defaultValue: false,
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value,
        }),
        content: fields.mdx({
          label: "Conteúdo",
          options: {
            image: {
              directory: "public/postImages",
              publicPath: "/postImages/",
            },
          },
          components: {
            CenteredImage: block({
              label: "Imagem centralizada",
              schema: {
                src: fields.image({
                  label: "Arquivo de imagem",
                  directory: "public/postImages/",
                  publicPath: "/postImages/",
                  validation: { isRequired: true },
                }),
                alt: fields.text({
                  label: "Texto alternativo",
                  validation: { isRequired: true },
                }),
                width: fields.number({
                  label: "Largura",
                  validation: { isRequired: true },
                }),
                height: fields.number({
                  label: "Altura",
                  validation: { isRequired: true },
                }),
              },
            }),
            YouTube: block({
              label: 'Vídeo do YouTube',
              schema: {
                videoId: fields.text({
                  label: 'ID do vídeo do YouTube',
                  description: 'Cole o ID do vídeo a partir da URL do YouTube (ex.: dQw4w9WgXcQ)',
                  validation: { isRequired: true }
                }),
              },
              ContentView: (props) => `📺 ID do vídeo do YouTube: ${props.value.videoId}`
            }),
          },
        }),
      },
    }),
  },
});
