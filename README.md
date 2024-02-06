# OnomatoPedalStandalone

controllers/frontController.js notes:

1. use below PATH when testing with "npm start"
    - const PATH = "./";
2. use BELOW PATH when building with "npm run pack"
    - const PATH = "resources/app.asar/";

app.js notes:

1. USE "" PATH when testing with "npm start"
    - const PATH = "";
2. use BELOW PATH when building with "npm run pack"
    - const PATH = "resources/app.asar/";


main.js notes:
set const dev = true; to view js console.  set to false to hide.

USAGE:

"npm run pack" will create a windows executable under /dist
    - ship with entire contents of win-unpacked folder
    - source code will get archived into /win-unpacked/resources/app.asar

"npm start" will launch app in test mode
    - you must update PATH variable in app.js and controllers/frontController.js