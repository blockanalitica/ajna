export function VitePluginAjna(config) {
  let viteConfig;

  const { enableDev = false } = config || {};

  return {
    name: "vite-plugin-simpleanalytics",

    configResolved(resolvedConfig) {
      // store the resolved config
      viteConfig = resolvedConfig;
    },

    transformIndexHtml() {
      const tags = [];

      if (viteConfig.command === "serve" && !enableDev) {
        return tags;
      }

      const noscriptSrc =
        "https://queue.simpleanalyticscdn.com/noscript.gif?hostname=ajna.blockanalitica.com";
      const noscriptTemplate = `<img src="${noscriptSrc}" referrerpolicy="no-referrer-when-downgrade" alt="" />`;

      tags.push({
        tag: "script",
        injectTo: "body",
        attrs: {
          src: "https://scripts.simpleanalyticscdn.com/latest.js",
          async: true,
          "data-hostname": "ajna.blockanalitica.com",
        },
      });

      tags.push({
        tag: "noscript",
        injectTo: "body-prepend",
        children: noscriptTemplate,
      });

      return tags;
    },
  };
}

export default VitePluginAjna;
