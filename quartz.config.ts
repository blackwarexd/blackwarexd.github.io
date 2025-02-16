import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "☠️ ζHUB",
    enableSPA: true,
    enablePopovers: false,
    // analytics: {
    //   provider: "plausible",
    // },
    analytics: null,
    locale: "en-US",
    baseUrl: "blackwarexd.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // header: "Schibsted Grotesk",
        header: "JetBrains Mono",
        body: "Roboto",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f2e9",
          lightgray: "#e0dcd3",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          secondary: "#384b73",
          tertiary: "#84a59d",
          highlight: "#8f9fa926",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#0F0F0F", // background
          lightgray: "rgba(143, 159, 169, 0.15)", // borders
          gray: "#e6e4d9", // graph links, heavier borders
          darkgray: "#e7e6f3", // body text
          dark: "#22d64c", // header text and icons
          secondary: "#FF204E", // link colour, current graph node
          tertiary: "rgba(255, 32, 78, 0.5)", // hover states and visited graph nodes
          highlight: "rgba(143, 159, 169, 0.15)", // internal link background, highlighted text, highlighted lines of code
          textHighlight: "#b3aa0288", // markdown highlighted text background
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Poetry(),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
        keepBackground: true,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
