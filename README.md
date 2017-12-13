# Code Challenge

A responsive calendar of Netflix Originals releases. It shows events from the Github gist in a Calendar view, that collapses to a list for a better UX in narrower viewports. The displayed month is set in the URL and it changes as the app is navigated.

Live demo at http://netflix.jairtrejo.mx/

## Implementation
I implemented the app as a React single page application. It uses [page.js](https://visionmedia.github.io/page.js/) to handle routing and html pushState, and [luxon](http://moment.github.io/luxon/) for general date wrangling.

The tests use [enzyme](https://github.com/airbnb/enzyme) to test the components, and are run using [ava](https://github.com/avajs/ava);

For a build system I relied on simple npm scripts. I used browserify to bundle the JavaScript; I think it's a great tool for that specific use case. With browserify I'm using babel for ES2015 transpilation, cssify for importing CSS from JavaScript (react-spinkit requires it), and envify to generate a React production build. For CSS pre-processing I used less.

## Running locally
You must have [npm](http://www.npmjs.org) installed. From this directory run:

```
npm install
```

To install dependencies, and then:

```
npm run start
```

To start the development server. Go to `http://localhost:9966` to see it in action.

To execute tests using [ava](https://github.com/avajs/ava) run:

```
npm test
```
