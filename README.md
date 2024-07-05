<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components

TwicPics components is a library of components to provide context-aware optimization for images and videos. They come with best practices out of the box: lazy loading, Low Quality Image Placeholders, optimized Cumulative Layout Shift (CLS), and more.

## Get Started

This project is available as an NPM package: [`@twicpics/components`](https://www.npmjs.com/package/@twicpics/components).

Installation:

```sh
# with yarn
yarn add @twicpics/components

# or with NPM
npm install @twicpics/components
```

[Read the documentation](./documentation).

## Contributing

This project uses yarn as dependency manager.

### Building 

Simply type `yarn build`. Dependencies are installed automatically.

### Testing

To run tests, use the following commands:

```sh
# testing common code accross all frameworks
yarn test

# testing ui
yarn test:ui
```