import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["..\\public"],
};
export default config;


// module.exports = {
//   stories: ['../src/**/*.stories.tsx'],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-actions',
//     '@storybook/preset-create-react-app',
//     {
//       name: '@storybook/addon-storysourse',
//       options: {
//         rule: {
//           test: [/\.stories\.tsx?$/],
//         },
//         LoaderOptions: {
//           prettierConfig: {
//             printWidth: 80, singleQuote: false,
//             options: { parser: 'typescript' }
//           }
//         }
//       }
//     }
//   ]
// }