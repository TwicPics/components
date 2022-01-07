<img align="right" width="25%" src="https://raw.githubusercontent.com/twicpics/components/main/logo.png">

# TwicPics Components Test for Next Issue : error in dev mode 

This folder contains a Next project allowing to test the anomaly encountered in "watch mode" (yarn dev).

Issue: if 'next dev' is launched, an 'install function already called' error is raised on server side when modifying the class calling the installTwicPics method. 
## Usage

You must first build `@twicpics/components` using `yarn build` at the root of the repository.

Then, type `yarn serve` ('yarn serve' installs dependencies and launch 'next dev') and point your browser towards `http://localhost:3000`.

Try to modify _app.js --> no blocking error should be raised. 
