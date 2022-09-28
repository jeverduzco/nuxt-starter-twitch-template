export default defineNuxtPlugin(async () => {
  const options = {
    autoTrack: true,
    doNotTrack: false,
    cache: false,
    domains: "umami.example.com",
    scriptUrl: "https://umami.example.com/umami.js",
    websiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
  };

  await loadScript(options);

  return {
    provide: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      umami: () => window.umami
    }
  };
});

function loadScript (options) {
  return new Promise((resolve, reject) => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const script = document.createElement("script");

    script.async = true;
    script.defer = true;
    script.dataset.autoTrack = options.autoTrack;
    script.dataset.doNotTrack = options.doNotTrack;
    script.dataset.websiteId = options.websiteId;

    if (Object.prototype.hasOwnProperty.call(options, "domains")) {
      script.dataset.domains = options.domains;
    }

    script.src = options.scriptUrl;

    head.appendChild(script);

    script.onload = resolve;
    script.onerror = reject;
  });
}
