const presets = [
    [
      "@babel/env",
      {
        useBuiltIns: "usage",
      },
    ],
  ];
const plugins = [
  [
    "@babel/plugin-proposal-class-properties", { "loose": true }
  ]
];
  
  module.exports = { presets, plugins };