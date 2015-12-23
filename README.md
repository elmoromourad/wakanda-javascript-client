# Wakanda Javascript Client

Minimalist, framework agnostic, JS client to interact with REST API that exposes a
standard and easy to use JS API.

## Install
Git clone this repository then install dependencies. This may not work on Node < 4.0.

```bash
npm install
```

## Run (on web browser)

```bash
npm run webpack-watch
```

On another tab

```bash
gulp serve
```

Then open your browser on `http://localhost:1136/app/index.html`.

## Build (dev)

```bash
npm run webpack-build
```

Bundles are built on `./build/` directory.

You can `require` `wakjsc.node.js` on a Node application, or directly insert
`wakjsc.js` on a `<script>` tag (it's a UMD module) and use `WakJSC` object.

## Unit tests
Unit testing is made with mocha and chai. It directly runs tests against built bundles.
Tests are written in ES5 to avoid useless compilation. There are two modes : one
which runs tests against node bundle, the other against the umd module on PhantomJS with karma.

There also are commands to launch test without rebuilding the bundles.

```bash
#Build and run unit test for karma
npm run test:karma:full

#Run test for karma
npm run test:karma:single

#Build and run unit test for node
npm run test:node:full

#Run test for node
npm run test:node:single
```

There is an Express server on `test/server` directory. It will mocks a real Wakanda Server
for unit tests.
You can launch it by typing `npm run test-server:start` and stop it with `npm run test-server:stop`.

**Unit test needs this server to be running to execute**.

You can use the two following scripts to run both Karma and node unit test with
test server launching and stopping alone. Just be sure that port `3030` is free.

```bash
#Run test server, build bundles and launch karma and node unit tests
npm run test

#Same as previous one but without building bundles
npm run test-single
```

Karma automatically proxies request on `/rest` to test server. For node
test, `WakJSC` module is instancied with test server address on each
test file.

If port `3030` doesn't suit your needs, you can change it on `test/server/server.js`
**and** on `test/server.unit.json`.

As PhantomJS doesn't support `CustomEvent` constructor, there is a polyfill on `test`
directory.

## Example

### Node.js
```javascript
var wakjsc = require('./wakjsc.node.js');
var WakJSC = new wakjsc('http://localhost:8081'); //Pass here Wakanda Server url
console.log(WakJSC.version()); //0.0.1
```

### Browser
You will have to proxy all request on `/rest` to your Wakanda Server (example on gulpfile).
```html
<script src="./wakjsc.js"></script>
<script>
  console.log(WakJSC.version()); //0.0.1
</script>
```
