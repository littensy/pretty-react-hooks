## 🌺 [pretty-react-hooks](https://npmjs.com/package/@rbxts/pretty-react-hooks)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/littensy/pretty-react-hooks/ci.yml?branch=master&style=for-the-badge&logo=github)
[![npm version](https://img.shields.io/npm/v/@rbxts/pretty-react-hooks.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@rbxts/pretty-react-hooks)
[![npm downloads](https://img.shields.io/npm/dt/@rbxts/pretty-react-hooks.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@rbxts/pretty-react-hooks)
[![GitHub license](https://img.shields.io/github/license/littensy/pretty-react-hooks?style=for-the-badge)](LICENSE.md)

An opinionated collection of useful hooks and utilites for [React](https://github.com/littensy/rbxts-react) in [roblox-ts](https://roblox-ts.com).

If you find a bug or have a feature request, please [open an issue](https://github.com/littensy/pretty-react-hooks/issues/new/).

&nbsp;

## ⭐ Featured

Check out some featured hooks:

-   [🦾 `useMotion`](src/use-motion/) - Creates a memoized Motion object set to the given initial value. Returns a binding that updates with the Motion, along with the Motion object.
-   [⏱️ `useAsync`](src/use-async/) - A hook that runs an async function and returns the result and status
-   [⚙️ `useTagged`](src/use-tagged/) - Tracks and returns a list of all instances with the given tag

This package also exports some useful utilities:

-   [📕 `hoarcekat`](src/utils/hoarcekat.tsx) - Create a Hoarcekat story
-   [📦 `binding utils`](src/utils/binding.ts) - Work with values that may or may not be bindings

Or, see the [full list of hooks](src/).

&nbsp;

## 📦 Installation

This package is available for Roblox TypeScript projects on [NPM](https://www.npmjs.com/package/@rbxts/pretty-react-hooks).

```sh
npm install @rbxts/pretty-react-hooks
yarn add @rbxts/pretty-react-hooks
pnpm add @rbxts/pretty-react-hooks
```

&nbsp;

## 🌻 Contributing

Contributions are welcome! Note that if you make a change to a hook, you should also check the tests and documentation.

To get started, clone the repository and run `pnpm install`. Then, you can run the following commands:

-   `pnpm dev` - Enable watch mode with support for TestEZ Companion
-   `pnpm build` - Compile the package's `out` directory

You will likely need the following extensions:

-   [Rojo VSCode extension](https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo)
-   [TestEZ Companion](https://marketplace.visualstudio.com/items?itemName=tacheometrist.testez-companion)

&nbsp;

## 📝 License

pretty-react-hooks is licensed under the [MIT License](LICENSE.md).
