module.exports = (api) => {

  const presets = [
    [
      require('@babel/preset-env'),
    ],
    [
      require('@babel/preset-react'),
    ],
    [
      "@babel/preset-typescript"
    ]
  ]

  const plugins = [
    [
      "@babel/plugin-transform-runtime",
      {
        "regenerator": true
      }
    ]
  ]

  return {
    presets,
    plugins
  }

}