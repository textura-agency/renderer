import typescript from 'rollup-plugin-typescript2';

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.js', name: 'Renderer', format: 'umd' },
      { file: 'dist/index.esm.js', name: 'Renderer', format: 'esm' },
    ],
    plugins: [typescript({
      tsconfigOverride: {
        "compilerOptions": {
          "target": "esNext",
          "module": "esNext",
          "moduleResolution": "node",
          "noImplicitAny": true,
          "removeComments": true,
          "preserveConstEnums": true,
          "outDir": "./dist",
          "sourceMap": false,
          "declaration": true,
          "lib": [
            "esNext", "dom"
          ]
        },
        "include": [
          "src/**/*.ts"
        ],
        "exclude": [
          "node_modules",
          "dist"
        ]
      }
    })]
  }
];