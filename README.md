# ReactJS server-side renderer

#### 1. Npm init
1. make a repository on github
2. make a directory
    ```sh
    mkdir [directory-name]
    cd [directory-name]
    ```
3. add git to the directory
    ```sh
    git init
    ```
4. add your repository url of your github to the directory
    ```sh
    git remote add origin [https://github-repositry-url.git]
    ```
5. add npm to the directory
    ```sh
    npm init
    ```
    
#### 2. Setup express
6. install express js
    ```sh
    npm install express
    ```
7. create file gitignore
    ```sh
    touch .gitignore
    ```
8. type or copy and paste these to your .gitignore file
    ```
    node_modules
    package-lock.json
    yarn.lock
    yarn-error.lock
    ```
9. create index.js file
    ```sh
    touch index.js
    ```
10. type or copy and paste these to your index.js file
    ```javascript
    const express = require("express");

    const app = express();
    const port = 5000;

    app.get("/", (req, res) => {
        res.send("hello world");
    });

    app.listen(port, () => {
        console.log(`> server running on http://localhost:${port}`);
    });
    ```
11. start the server by type these on your command line
    ```sh
    node index.js
    ```
12. go to your browser type "http://localhost:5000" on url address
13. congratulations! you made your first "hello world" app

#### 3. Adding devtools on express
14. install nodemon on devdependencies
    ```sh
    npm install --only=dev nodemon
    ```
15. edit package.json file
    ```diff
    ...
    "scripts": {
    -    "test": "echo \"Error: no test specified\" && exit 1"
    +    "start": "nodemon index.js"
    },
    ...
    ```
16. stop the server and run with this command
    ```sh
    ctrl + c
    npm run start
    ```
17. open your browser and enter "http://localhost:5000" on url address

#### 4. Setup static directory and adding browser-sync
18. create a directory named public
    ```
    mkdir public
    ```
19. create a file named index.html inside public directory
    ```
    touch public/index.html
    ```
20. type or copy and paste code below into public/index.html file
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        HELLO FROM STATIC DIRECTORY
      </body>
    </html>

    ```
21. edit index.js file
    ```diff
    const express = require("express");
    +const path = require("path");

    const app = express();
    const port = 5000;

    -app.get("/", (req, res) => {
    -  res.send("hello world");
    -});
    +app.use("/", express.static(path.join(__dirname, "public")));

    app.listen(port, () => {
    console.log(`> server running on http://localhost:${port}`);
    });

    ```
21. install dotenv
    ```
    npm install dotenv
    ```
22. create two file named .env and .env.example
23. type or copy and paste code below into .env and .env.example
    ```
    NODE_ENV=development
    ```
24. edit .gitignore file, add .env without .env.example 
    ```diff
    +.env
    node_modules
    package-lock.json
    yarn.lock
    yarn-error.lock
    ```
25. install browser-sync into devdependencies
    ```
    npm install --only=dev browser-sync
    ```
26. edit index.js file
    ```diff
    const express = require("express");
    const path = require("path");
    +const browserSync = require("browser-sync");
    +const dotenv = require("dotenv");

    +dotenv.config();
    const app = express();
    const port = 5000;

    app.use("/", express.static(path.join(__dirname, "public")));

    app.listen(port, () => {
    +  if (process.env.NODE_ENV !== "production") {
    +    browserSync({
    +      files: [path.join(__dirname, "public")],
    +      online: false,
    +      open: false,
    +      port: 3000,
    +      proxy: "localhost:" + port,
    +      ui: false,
    +    });
    +  } else {
        console.log(`> ready on http://localhost:${port}`);
    +  }
    });
    ```
27. restart the server
    ```
    ctrl + c
    npm run start
    ```
28. open your browser and enter "http://localhost:3000" on url address
    ```sh
    npm run start
    ```
#### 5. Setup react and webpack
29. install react and react-dom
    ```sh
    npm install react react-dom
    ```
30. install @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli into devdependencies
    ```sh
    npm install --only=dev @babel/core @babel/preset-env @babel/preset-react babel-loader webpack webpack-cli
    ```
31. create directory and files
    ```sh
    mkdir src
    touch src/index.js
    touch src/app.js
    touch webpack.config.js
    touch .babelrc 
    ```
32. type or copy and paste code below to src/app.js
    ```javascript
    import React from "react";

    const App = () => {
        return <div>App</div>;
    };

    export default App;

    ```
33. type or copy and paste code below to src/index.js
    ```javascript
    import React from "react";
    import { render } from "react-dom";

    import App from "./App";

    render(<App />, document.querySelector("#root"));

    ```
34. type or copy and paste code below to .babelrc
    ```javascript
    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
    ```
35. type or copy and paste code below to webpack.config.js
    ```javascript
    const path = require("path");
    module.exports = {
        mode: "development",
        entry: "./src/index.js",
        resolve: {
            extensions: [".js"],
        },
        module: {
            rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "src")],
                exclude: [path.resolve(__dirname, "node_modules")],
                use: ["babel-loader"],
            },
            ],
        },
        output: {
            path: __dirname + "/public",
            filename: "js/bundle.js",
        },
        devtool: "eval-source-map",
    };

    ```
36. install ejs
    ```sh
    npm install ejs
    ```
37. create directory named views
    ```sh
    mkdir views
    ```
38. move public/index.html to views/
39. rename views/index.html to views/index.ejs
40. edit index.js
    ```diff
    ...
    dotenv.config();
    const app = express();
    const port = 5000;

    +app.set("view engine", "ejs");
    +app.set("views", path.resolve(__dirname, "views"));
    app.use("/", express.static(path.join(__dirname, "public")));
    +app.get("**", (req, res) => {
    +    res.render("index", { title: "React Express" });
    +});

    ...

    ```
41. create file named nodemon.json
42. type or copy and paste this code below
    ```json
    {
        "ignore": ["public/**", "src/**"]
    }
    ```
43. edit package.json
    ```diff
    ...
    "scripts": {
    -   "start": "nodemon index.js",
    +    "server:start": "nodemon index.js",
    +    "client:start": "webpack --watch"
    },
    ...
    ```
44. restart server
    ```sh
    ctrl + c
    npm run server:start
    ```
45. open new terminal and run react
    ```sh
    npm run client:start
    ```
50. open your browser and enter "http://localhost:3000" on url address
