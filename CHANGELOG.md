<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Upgrade dependencies (**Nuxt.js** up to 3.2.0).

## [0.15.1] - 2022-02-01

### Changed

- Make the configuration of components global so that components can be used in different frameworks simultaneously.
- Upgrade dependencies (**Nuxt.js** up to 3.1.1).

## [0.15.0] - 2022-01-20

### Add

- Add support for **SvelteKit**.

### Changed

- Simplify Svelte3 components generation using <svelte:element>. **Requires** Svelte3.47+.
- Update documentation with new online demos.
- Upgrade dependencies (**Next.js** up to 13.1).
- Upgrade dependencies (**Svelte** up to 3.55).

### Fixed

- Fix typing of Svelte components.

## [0.14.2] - 2022-12-21

### Add

- Add `Anchor` type export to **Angular** components.
- Add `center` to the list of possible values for the `anchor` property.

## [0.14.1] - 2022-12-08

### Fixed

- Fix the issue that prevents **React** + **typescript** projects from being compiled.

### Changed

- Update **Next.js** documentation.

## [0.14.0] - 2022-11-29

### Added

- Add a custom loader for **Next.js Image**
- Add alias for installation function: both `installTwicpics` and `installTwicPics` can be used

### Changed

- Upgrade dependencies (**Svelte** up to 3.53.1)

## [0.13.1] - 2022-11-17

### Changed

- Updates documentation and sample code following the release of [Nuxt3.0.0](https://github.com/nuxt/framework/releases/tag/v3.0.0)

### Fixed

- Fixes React-native documentation
- Fixes the problem preventing the **Nuxt3** module from working with [Nuxt3.0.0-rc.14](https://github.com/nuxt/framework/releases/tag/v3.0.0-rc.14)

## [0.13.0] - 2022-11-14

### Added

- Add `TwicImg` support for **React Native**

### Changed

- Eliminates excess slashes in the path and domain values configured when setting up components
- Upgrade dependencies (**Gatsby.js** up to 5.0.1)
- Upgrade dependencies (**Next.js** up to 13.0.0)
- Upgrade dependencies (**Svelte** up to 3.52.0)

### Fixed

- Fixes the issue preventing the use of twic-components within a shadow-dom.

## [0.12.0] - 2022-10-12

### Added

- Add automatic poster generation for `<TwicVideo>`
- Add `eager` prop to disable lazy loading on `<TwicImg>` and `<TwicVideo>`
- Add new `<TwicView>` component that eager loads all its children in bulk as soon as the TwicView itself becomes visible

### Changed

- Refactoring to remove shadow DOM generation for _Web Components_
- Upgrade dependencies

## [0.11.0] - 2022-09-29

### Added

- Add API to listen to the loading state of images and videos.

### Changed

- Add some video samples.
- Upgrade dependencies.

### Fixed

- Fix transient image flickering on resize

## [0.10.0] - 2022-09-07

### Added

- Add `intrinsic` attribute to prevent upscaling and limit number of variants.

### Changed

- Preview `URL` no longer uses the [alternative format](https://www.twicpics.com/docs/api/basics#alternative-url-format) for better cache invalidation efficiency.

### Fixed

- Fixes placeholder loading error when asset URL starts with more than one slash.
- Fixes the problem preventing the `Nuxt3` module from working with RC versions of `Nuxt3`.

## [0.9.1] - 2022-08-23

### Fixed

- Fix broken regexp in Safari

## [0.9.0] - 2022-08-17

### Added

- Add `anchor` attribute to position image in both `contain` and `cover` mode
- Add `bot` attribute to specify SEO-friendly transformations for search engine bots
- Add support for **Angular 14+**
- `ratio` can now be specified as `<width>:<height>` in addition to `<width>/<height>`

### Changed

- **Breaking**: `focus` is now applied __after__ `preTransform`
- No longer removes **Angular** template dependencies after building components
- Upgrade dependencies and documentation

### Fixed

- Fix an issue that made the placeholder visible under some transparent images
- Fix subpixel bleed-through

## [0.8.2] - 2022-06-27

### Fixed

- Remove `console.log` on components initialization

## [0.8.1] - 2022-06-06

### Changed

- Domain URL now allow trailing slash

### Fixed

- Component wrapper now behaves like a normal div in **Angular**

## [0.8.0] - 2022-05-12

### Added

- Aspect ratio can now be managed via the container dimensions
- Add demo link to **Svelte 3** documentation

### Changed

- Improve configuration for `transition` attribute
- Remove useless `div` in angular component
- Upgrade dependencies version

### Fixed

- Fix issue when testing inside storybook

## [0.7.0] - 2022-05-06

### Added

- Add support for **Nuxt 3**
- Add `preTransform` attribute to configure a list of TwicPics API transformations
- Allow runtime environment configuration (`offline`, `debug` or `production` by default)

### Changed

- `src` attribute is now optional (a red placehold is displayed when missing)
- Improve `transition` attribute configuration

### Fixed

- Fix potential undefined `class` in **React** and **Svelte**
## [0.6.6] - 2022-04-29

### Changed

- Improve style isolation for components

### Fixed

- Fix a refresh issue with **Angular**

## [0.6.5] - 2022-04-28

### Added

- Add demo link to the `Nuxt 2` documentation
- Add `path` to the initialization parameter list

## [0.6.4] - 2022-04-25

### Added

- Add demo link to the **Vue 2** documentation

### Fixed

- Fix `esm` version importation 

## [0.6.3] - 2022-04-15

### Added

- Add demo link to the **Angular** documentation
- Add `Mode` and `Placeholder` types exports to **Angular** components
- Add `zoom` as a `transition` value

## [0.6.2] - 2022-03-21

### Added

- New framework-specific documentation
- Add support for **Gatsby**

### Changed

- Upgrade dependencies version

## [0.6.1] - 2022-03-01

### Changed

- Simplify integration with **Nuxt 2**
- Remove `className` attribute in **Angular**

## Fixed

- `className` attribute is now applied to wrapper div in **React** and **Svelte 3**
- Fix type validation of transition attributes in **React**, **Vue 2**, and **Vue 3**
- Transitions can now properly be disabled

## [0.6.0] - 2022-02-04

### Added

- Support for **Angular 11**

### Changed

- Drastically decrease the size of all **Angular** built files

### Fixed

- Fix aspect ratio not being respected in CSS grids
- No longer generating empty CSS property values in SRR
- No longer generating `background-image: undefined` when placeholder is `none` in **Svelte**

## [0.5.2] - 2022-01-27

### Fixed

- CSS property names are no longer camel-cased in **Svelte 3**

## [0.5.1] - 2022-01-20

### Added

- Add warning message in the browser console when components not initialized

### Fixed

- `placeholder="none"` no longer corrupts background URLs that generated `404` responses

## [0.5.0] - 2022-01-12

### Added

- Add support for **Angular 12+**
- Allow to style components using pure CSS
- Allow passing `className` props to **React** (and **Next**) and **Svelte 3** components

### Changed

- **Breaking**: remove `width` and `height` attributes

### Fixed

- Fix server-side `install function already called` error that happened with **Next**
- Using custom class with `installTwicPics` now work as intended

## [0.4.1] - 2021-10-09

### Changed

- **Breaking**: remove `<noscript>` tags generation in SSR mode (Hydration is too heavy-handed in most frameworks)

## [0.4.0] - 2021-10-07

### Added

- Clarify the documentation regarding transition-related attributes
- Component names can now be changed in **Vue**
- Add support for native **Web Components**

### Changed

- **Breaking:** Per framework styles unified in a single style sheet (eg.`react/style.css`, `vue2/style.css` etc. -> `style.css`)
- Decrease footprint of **TypeScript** definitions

### Fixed

- Fix `<noscript>` tag generation in **Nuxt**
- Silence hydration warnings due to `<noscript>` tags in **Next**

## [0.3.1] - 2021-09-29

### Fixed

- Fix module resolution for **Next**

## [0.3.0] - 2021-09-27

### Added

- Add example usages for all frameworks
- Add **TypeScript** definitions for all frameworks
- Add `<noscript>` tags generation in SSR mode

## [0.2.1] - 2021-07-28

### Fixed

- Fix default placeholder value for **Svelte 3**

## [0.2.0] - 2021-07-28

### Added

- Add support for **Svelte 3**

### Changed

- Decrease footprint of all components

## [0.1.0] - 2021-07-27

### Added

- Support for **React**, **Next**, **Vue 2**, **Vue 3**, and **Nuxt 2**

[Unreleased]: https://github.com/TwicPics/components/compare/main...dev
[0.15.1]: https://github.com/TwicPics/components/compare/0.15.0...0.15.1
[0.15.0]: https://github.com/TwicPics/components/compare/0.14.2...0.15.0
[0.14.2]: https://github.com/TwicPics/components/compare/0.14.1...0.14.2
[0.14.1]: https://github.com/TwicPics/components/compare/0.14.0...0.14.1
[0.14.0]: https://github.com/TwicPics/components/compare/0.13.1...0.14.0
[0.13.1]: https://github.com/TwicPics/components/compare/0.13.0...0.13.1
[0.13.0]: https://github.com/TwicPics/components/compare/0.12.0...0.13.0
[0.12.0]: https://github.com/TwicPics/components/compare/0.11.0...0.12.0
[0.11.0]: https://github.com/TwicPics/components/compare/0.10.0...0.11.0
[0.10.0]: https://github.com/TwicPics/components/compare/0.9.1...0.10.0
[0.9.1]: https://github.com/TwicPics/components/compare/0.9.0...0.9.1
[0.9.0]: https://github.com/TwicPics/components/compare/0.8.2...0.9.0
[0.8.2]: https://github.com/TwicPics/components/compare/0.8.1...0.8.2
[0.8.1]: https://github.com/TwicPics/components/compare/0.8.0...0.8.1
[0.8.0]: https://github.com/TwicPics/components/compare/0.7.0...0.8.0
[0.7.0]: https://github.com/TwicPics/components/compare/0.6.6...0.7.0
[0.6.6]: https://github.com/TwicPics/components/compare/0.6.6...0.6.6
[0.6.5]: https://github.com/TwicPics/components/compare/0.6.4...0.6.5
[0.6.4]: https://github.com/TwicPics/components/compare/0.6.3...0.6.4
[0.6.3]: https://github.com/TwicPics/components/compare/0.6.2...0.6.3
[0.6.2]: https://github.com/TwicPics/components/compare/0.6.1...0.6.2
[0.6.1]: https://github.com/TwicPics/components/compare/0.6.0...0.6.1
[0.6.0]: https://github.com/TwicPics/components/compare/0.5.2...0.6.0
[0.5.2]: https://github.com/TwicPics/components/compare/0.5.1...0.5.2
[0.5.1]: https://github.com/TwicPics/components/compare/0.5.0...0.5.1
[0.5.0]: https://github.com/TwicPics/components/compare/0.4.1...0.5.0
[0.4.1]: https://github.com/TwicPics/components/compare/0.4.0...0.4.1
[0.4.0]: https://github.com/TwicPics/components/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/TwicPics/components/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/TwicPics/components/compare/0.2.1...0.3.0
[0.2.1]: https://github.com/TwicPics/components/compare/0.2.0...0.2.1
[0.2.0]: https://github.com/TwicPics/components/compare/0.1.0...0.2.0
[0.1.0]: https://github.com/TwicPics/components/releases/tag/0.1.0
