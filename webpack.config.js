const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // or wherever your main hooks file is
  mode: "production",
  output: {
    publicPath: "auto",
    uniqueName: "authMicrofrontend",
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "authMicrofrontend",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthProvider": "./src/components/AuthConfigProvider.tsx",
        "./useAuthValidation": "./src/hooks/useAuthValidation.ts",
        "./uselogin": "./src/hooks/uselogin.ts",
      },
      shared: {
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
        "react-hook-form": {
          singleton: true,
          requiredVersion: deps["react-hook-form"],
        },
      },
    }),
  ],
};
