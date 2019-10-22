import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["stimulus", "lodash.debounce"],
    output: [{ file: pkg.module, format: "esm" }],
    plugins: [
      babel({
        exclude: ["node_modules/**"]
      })
    ]
  }
];
