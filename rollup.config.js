import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default [
  {
    input: "src/index.js",
    external: ["stimulus"],
    output: [
      { file: pkg.module, format: "es" }
    ],
    plugins: [
      babel({
        exclude: ["node_modules/**"]
      })
    ]
  }
];
