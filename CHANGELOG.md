<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.28.2] - 2024-03-04

### Add

- Add support for **Svelte5**.

## [0.27.2] - 2024-02-05

### Changed

- Makes `debug` mode display the actual loaded URL in **React Native**.

- Updates **React Native** sample dependencies.

### Fixes

- Fixes `Invalid Dom Property` warning for the **React** `TwicPicture` component under development environment.

## [0.27.1] - 2024-01-24

### Fixes

- TwicPics Components for **React** throws null ref error when using `Strict Mode` in `development` environment.

## [0.27.0] - 2024-01-22

### Add

- Add new `<TwicPicture>` component, a drop-in replacement for the `picture` tag, compatible with all frameworks except **Flutter** and **React Native**.

### Changed

- Updates samples dependencies.

### Fixes

- Hydration warning message when using **Next** in `dev` mode.

## [0.26.0] - 2023-11-21

### Add

- Add support for **Angular 17**.

## [0.25.1] - 2023-11-10

### Fixes

- Imports **Nuxt** composables from #imports.

- Styles now persist throughout **Astro3** `View Transitions`.

### Changed

- Updates dependencies.

## [0.25.0] - 2023-11-02

### Add

- Adds video support in **React Native** components.

### Changed

- Updates **Next** samples dependencies up to Next14.

## [0.24.0] - 2023-10-25

### Changed

- Removes dependency on `prop-types` library in **React** components.

## [0.23.2] - 2023-10-12

### Changed

- Makes `alt` property default value an empty string in order to indicates AT that the image can be safely ignored.

## [0.23.1] - 2023-09-29

### Changed

- Updates samples dependencies.

### Fixes

- Fixes excessive package size.

## [0.23.0] - 2023-09-26

### Changed

- Migrates from TypeScript 4 to TypeScript 5.
- Updates samples dependencies.
- Now uses `Vite` to build the `React` sample project.

### Fixes

- Adds missing `Types` entries to `package.json`.

## [0.22.3] - 2023-09-19

### Changed

- Updates brand: TwicPics becomes TwicPics by Frontify.

## [0.22.2] - 2023-09-11

### Fixes

- Fix issue with regeneration of Low-Quality Placeholder when property values are updated.

## [0.22.1] - 2023-09-04

### Add

- Export components property types in **React**.
- Export `Environment` type in **Angular**. 

### Changed

- Upgrade dependencies.

### Fixes

- Fix display issue of images on **Android** in **React Native**.

## [0.22.0] - 2023-08-03

### Add

- Add lazy loading support in **React Native** components.

## [0.21.1] - 2023-07-27

### Fixes

- Fix typing issues in **Svelte4** projects.

## [0.21.0] - 2023-07-25

### Add

- Add support for **Svelte4**.
  
### Changed

- Simplify LQIP data retrieval by using `inspect` route in **React Native**.

### Fixes

- Fix blinking issue in **React Native**.

## [0.20.0] - 2023-07-13

### Add

- Add `refit` property to `TwicImg` that allows to automatically reframe image to main object(s).

### Changed

- Upgrade dependencies.

### Fixed

- Fix **React Native** sample project launch issue on **macOS**.
- Fix type definitions in **React** and **Svelte**.

## [0.19.0] - 2023-06-13

### Add

- Add support for **React Server Components** and **Next.js App Router**.

## [0.18.0] - 2023-06-01

### Add

- Add support for **Angular 16+**
- Make **TwicPics Placeholders** usable as `src` in `TwicImg`.

### Changed

- Rework **SvelteKit** components builder to align with @sveltejs/package 2.0.0.
- Upgrade dependencies.

### Fixed

- No longer generate `LQIP` when `src` is not set.

## [0.17.3] - 2023-04-22

### Fixed

- No longer use direct access to the public runtime config in `Nuxt3` module.

## [0.17.2] - 2023-04-19

### Changed

- Add control over `domain` and `path` values when using the **Next.js Image** component.

### Fixed

- Fix placeholder display when a `path` value is provided during installation.

## [0.17.1] - 2023-04-14

### Changed

- Improve magnifier UX on touch screens by allowing continuous movement even when the finger is no longer on the image container.

## [0.17.0] - 2023-04-12

### Add

- Add `duration`, `from`, `posterFrom` and `to` properties to **TwicVideo** component in order to manage [video slicing](https://www.twicpics.com/docs/topics/video-optimization#video-slicing).
- Add support for **Angular 15+**

### Changed

- Reduce unpacked size by replacing superfluous versions of Angular with aliases to reference versions.

## [0.16.1] - 2023-03-27

### Fixed

- Fix zoom of translucent images.
- No longer activate the magnifier when `zoom` prop is not defined for the **Vue.js** components.
- No longer generate the placeholder div when the `placeholder` property is set to `none`.
- No longer take into account TouchEvents outside the image area while using the magnifier.

## [0.16.0] - 2023-03-21

### Add

- Add new `TwicBackground` component that allows to display a background image in any HTML element.
- Add `title` property that allows to handle [title global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/title).
- Add `zoom` property to `TwicImg` that allows to display a lazy loaded and enlarged image on `mouseover` event.

### Changed

- Remove components factories and splits into several specialized ones (`TwicBackground`, `TwicImg` and `TwicVideo`).
- Upgrade dependencies.

### Fixed

- Fix missing `twic-i` and `twic-d` classes in **Web Components**.
- Fix `ratio` property typing in **React** components.

## [0.15.1] - 2023-02-01

### Changed

- Make the configuration of components global so that components can be used in different frameworks simultaneously.
- Upgrade dependencies (**Nuxt.js** up to 3.1.1).

## [0.15.0] - 2023-01-20

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

- Fixes React Native documentation
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
[0.28.0]: https://github.com/TwicPics/components/compare/0.27.2...0.28.0
[0.27.2]: https://github.com/TwicPics/components/compare/0.27.1...0.27.2
[0.27.1]: https://github.com/TwicPics/components/compare/0.27.0...0.27.1
[0.27.0]: https://github.com/TwicPics/components/compare/0.26.0...0.27.0
[0.26.0]: https://github.com/TwicPics/components/compare/0.25.1...0.26.0
[0.25.1]: https://github.com/TwicPics/components/compare/0.25.0...0.25.1
[0.25.0]: https://github.com/TwicPics/components/compare/0.24.0...0.25.0
[0.24.0]: https://github.com/TwicPics/components/compare/0.23.2...0.24.0
[0.23.2]: https://github.com/TwicPics/components/compare/0.23.1...0.23.2
[0.23.1]: https://github.com/TwicPics/components/compare/0.23.0...0.23.1
[0.23.0]: https://github.com/TwicPics/components/compare/0.22.3...0.23.0
[0.22.3]: https://github.com/TwicPics/components/compare/0.22.2...0.22.3
[0.22.2]: https://github.com/TwicPics/components/compare/0.22.1...0.22.2
[0.22.1]: https://github.com/TwicPics/components/compare/0.22.0...0.22.1
[0.22.0]: https://github.com/TwicPics/components/compare/0.21.1...0.22.0
[0.21.1]: https://github.com/TwicPics/components/compare/0.21.0...0.21.1
[0.21.0]: https://github.com/TwicPics/components/compare/0.20.0...0.21.0
[0.20.0]: https://github.com/TwicPics/components/compare/0.19.0...0.20.0
[0.19.0]: https://github.com/TwicPics/components/compare/0.18.0...0.19.0
[0.18.0]: https://github.com/TwicPics/components/compare/0.17.3...0.18.0
[0.17.3]: https://github.com/TwicPics/components/compare/0.17.2...0.17.3
[0.17.2]: https://github.com/TwicPics/components/compare/0.17.1...0.17.2
[0.17.1]: https://github.com/TwicPics/components/compare/0.17.0...0.17.1
[0.17.0]: https://github.com/TwicPics/components/compare/0.16.1...0.17.0
[0.16.1]: https://github.com/TwicPics/components/compare/0.16.0...0.16.1
[0.16.0]: https://github.com/TwicPics/components/compare/0.15.1...0.16.0
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
