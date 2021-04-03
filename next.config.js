module.exports = () => {
  /* eslint-disable */
  const withLess = require("@zeit/next-less");
  const lessToJS = require("less-vars-to-js");
  const withPWA = require("next-pwa");
  const fs = require("fs");
  const path = require("path");
  // Where your antd-custom.less file lives
  const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, "./styles/antd.less"), "utf8")
  );
  // fix: prevents error when .less files are required by node
  if (typeof require !== "undefined") {
    require.extensions[".less"] = (file) => {};
  }
  return withPWA(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables, // make your antd custom effective
      },
    }),
    {
      pwa: {
        dest: "public",
      },
    }
  );
};
