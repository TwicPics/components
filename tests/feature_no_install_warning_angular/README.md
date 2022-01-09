<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components Test for feature display a warning message if no domain configuration has been done

This folder contains an Angular 13 project allowing to test the appearance of a warning message in the browser console if no domain configuration has been performed.

## Usage

You must first build `@twicpics/components` using `yarn build` at the root of the repository.

Then, type `yarn serve` and point your browser towards `http://localhost:3000`.

Check the browser console for warnings messages : `twicpics-components.mjs:61 twicpics-components domain is mandatory and is not defined !` should be displayed.
