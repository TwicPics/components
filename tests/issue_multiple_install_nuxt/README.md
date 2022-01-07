<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components Test for Nuxt Issue : error in dev mode 

This folder contains a Nuxt project allowing to test the anomaly encountered in "watch mode" ('nuxt').

Issue: if 'nuxt' is launched, an 'install function already called' error is raised on server side when modifying the class calling the installTwicPics method. 
## Usage

You must first build `@twicpics/components` using `yarn build` at the root of the repository.

Then, type `yarn serve` ('yarn serve' installs dependencies and launch 'nuxt') and point your browser towards `http://localhost:3000`.

Try to modify plugins/twicpics.js --> no blocking error should be raised. 
