
# Yjs demonstration

This repository shows a demonstration of the <http://y-js.org/>-framework with following setup:

- real-time collaborative editing
- offline editing
- server storage

Links:  [yjs homepage](http://y-js.org/) and [github page](https://github.com/y-js/yjs/)


## Setup

This demo requires node version 8 and git installed, and some free disk storage.

Run following commands:

```
git clone git@github.com:adabru/yjs-demo.git
cd yjs-demo
```

Ensure you use node version 8. If you already installed packages using another version, delete the `node_modules`-folder.

```
node -v
```

The demo uses webpack for dependency management.

```
npm i webpack webpack-cli
```

The demo will synchronize maps and text between browser clients.

```
npm i y-map y-array y-text
```

The demo uses a websocket server for connecting the clients with each other and a leveldb database to keep a snapshot of the synchronized data. The leveldb dependency is the reason while currently node version 8 should be used.

```
npm i y-websockets-client y-websockets-server y-leveldb
```

The demo uses indexeddb to enable offline editing with the possibility to close and reopen the browser.

```
npm i y-indexeddb
```

Bundle the demo frontend.

```
webpack
```

Start the http and the wesocket server.

```
node backend.js
```

Summary:

```
git clone git@github.com:adabru/yjs-demo.git
cd yjs-demo
npm i webpack webpack-cli  y-map y-array y-text  y-websockets-client y-websockets-server y-leveldb  y-indexeddb
webpack
node backend.js
```

## Walkthrough

Next comes the demonstration of

- real-time collaborative editing
- offline editing
- server storage


### real-time collaborative editing

Open a browser and point it to <http://localhost:8011>.

Open another tab, private browsing session or another browser and point it also to <http://localhost:8011>.

Edit the textarea in one location and watch the changes in the other location.

Create a new fruit in one location and watch it being added in the other location.


### offline editing

Open a browser and point it to <http://localhost:8011>.

Stop the server (Ctrl-C) to ensure the server is not able to store any changes.

Edit a textarea and create a new fruit. As the server is not running, these are offline changes.

Close the browser. Every data in the memory is lost but the changes were already saved to indexeddb.

Open the browser again at <http://localhost:8011>, it shows an error as the http server is not running.

Start the server again with `node backend.js`.

Reload the webpage and watch the offline change still being there.


### server storage

Open another browser or a private session at <http://localhost:8011>.

Watch every change you made so far being applied. The leveldb module stores everything in the folder `./y-leveldb-databases`.
