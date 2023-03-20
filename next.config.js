const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer({
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
      async headers() {
        return [
          {
            source: "/subtitles/(.*)",
            headers: [
              {
                key: "Access-Control-Allow-Origin", value: "*"
              },
              {
                key: "Access-Control-Allow-Methods",
                value: "GET"
              },
              {
                key: "Access-Control-Allow-Headers",
                 value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
              }
            ]
          }
        ]
      }
    
});
