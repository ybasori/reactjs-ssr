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
    yarn add express
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
    yarn add --dev nodemon
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
    yarn start
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
    yarn add dotenv
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
    yarn add --dev browser-sync
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
    yarn start
    ```
28. open your browser and enter "http://localhost:3000" on url address
    ```sh
    yarn start
    ```
#### 5. Setup react and webpack
29. install react and react-dom
    ```sh
    yarn add react react-dom
    ```
30. install @babel/core babel-loader webpack webpack-cli into devdependencies
    ```sh
    yarn add --dev @babel/core babel-loader webpack webpack-cli
    ```
31. install @babel/preset-env @babel/preset-react @babel/register ignore-styles into devdependencies
    ```sh
    yarn add @babel/preset-env @babel/preset-react @babel/register ignore-styles
    ```
32. create directory and files
    ```sh
    mkdir src
    touch src/index.js
    touch src/app.js
    touch webpack.config.js
    touch .babelrc 
    mkdir server
    touch server/index.js
    ```
33. rename index.js to server.js
34. move server.js to server
35. type or copy and paste code below to src/app.js
    ```javascript
    import React from "react";

    const App = () => {
        return <div>App</div>;
    };

    export default App;

    ```
36. type or copy and paste code below to src/index.js
    ```javascript
    import React from "react";
    import { hydrate } from "react-dom";

    import App from "./App";

    hydrate(<App />, document.querySelector("#root"));

    ```
37. type or copy and paste code below to .babelrc
    ```javascript
    {
        "presets": [
            "@babel/preset-env",
            "@babel/preset-react"
        ]
    }
    ```
38. type or copy and paste code below to webpack.config.js
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
39. type or copy and paste code below to server/index.js
    ```javascript
    require("ignore-styles");

    require("@babel/register")({
        ignore: [/(node_modules)/],
        presets: ["@babel/preset-env", "@babel/preset-react"],
    });

    require("./server");
    ```
40. edit public/index.html
    ```diff
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="root"></div>
    +    <script src="/js/bundle.js"></script>
      </body>
    </html>

    ```
41. edit server/server.js
    ```diff
    +import express from "express";
    +import path from "path";
    +import browserSync from "browser-sync";
    +import dotenv from "dotenv";
    +import fs from "fs";
    +
    +import React from "react";
    +import ReactDOMServer from "react-dom/server";
    -const express = require("express");
    -const path = require("path");
    -const browserSync = require("browser-sync");
    -const dotenv = require("dotenv");

    dotenv.config();
    const app = express();
    const port = 5000;

    -app.use("/", express.static(path.join(__dirname, "public")));
    +app.use("/js", express.static(path.join(__dirname, "../public/js")));
    +
    +app.get("**", (req, res) => {
    +    const html = ReactDOMServer.renderToString(<App />);
    +    fs.readFile(path.resolve("../public/index.html"), "utf-8", (err, data) => {
    +        if (err) {
    +            console.log(err);
    +            return res.status(500).send("Some error happened");
    +        }
    +        return res.send(
    +            data.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
    +        );
    +    });
    +});
    
    ...

    ```
42. create file named nodemon.json
43. type or copy and paste this code below
    ```json
    {
        "ignore": ["public/**", "src/**"]
    }
    ```
44. edit package.json
    ```diff
    ...
    -"main": "index.js",
    +"main": "server/index.js",
    "scripts": {
    -   "start": "nodemon index.js",
    +    "server:start": "nodemon server/index.js",
    +    "client:start": "webpack --watch"
    },
    ...
    ```
45. edit .gitignore
    ```
    .env
    node_modules
    package-lock.json
    +public/js/bundle.js
    yarn.lock
    yarn-error.lock
    ```
46. restart server
    ```sh
    ctrl + c
    yarn server:start
    ```
47. open new terminal and run react
    ```sh
    yarn client:start
    ```
#### 6. Setup CSS on webpack
48. open your browser and enter "http://localhost:3000" on url address
49. install mini-css-extract-plugin and css-loader into devdependencies
    ```sh
    yarn add --dev mini-css-extract-plugin css-loader
    ```
50. edit webpack.config.js
    ```diff
    const path = require("path");
    +const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    module.exports = {
    mode: "development",
    entry: "./src/index.js",
    resolve: {
    -    extensions: [".js"],
    +    extensions: [".js", ".css"],
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            include: [path.resolve(__dirname, "src")],
            exclude: [path.resolve(__dirname, "node_modules")],
            use: ["babel-loader"],
        },
    +    {
    +        include: [path.resolve(__dirname, "src")],
    +        exclude: [path.resolve(__dirname, "node_modules")],
    +        test: /\.css$/i,
    +        use: [MiniCssExtractPlugin.loader, "css-loader"],
    +    },
        ],
    },
    +plugins: [
    +    new MiniCssExtractPlugin({
    +        filename: "css/styles.css",
    +    }),
    +],
    output: {
        path: __dirname + "/public",
        filename: "js/bundle.js",
    },
    devtool: "eval-source-map",
    };

    ```
51. create a file named src/global.css
    ```sh
    touch src/global.css
    ```
52. type or copy and paste this code below on src/global.css
    ```css
    html{
        font-family: sans-serif;
    }

    ```
53. edit src/index.js
    ```diff
    import React from "react";
    import { hydrate } from "react-dom";

    import App from "./App";
    +import "./global.css";

    hydrate(<App />, document.querySelector("#root"));
    ```
54. edit .gitignore
    ```diff
    .env
    node_modules
    package-lock.json
    +public/css/styles.css
    public/js/bundle.js
    yarn.lock
    yarn-error.lock
    ```
55. edit public/index.html
    ```diff
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    +    <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/js/bundle.js"></script>
      </body>
    </html>

    ```
56. edit server/server.js
    ```diff
    ...
    app.use("/js", express.static(path.join(__dirname, "../public/js")));
    +app.use("/css", express.static(path.join(__dirname, "../public/css")));
    ...
    ```
57. restart server
    ```sh
    ctrl + c
    yarn server:start
    ```
58. restart react
    ```sh
    ctrl + c
    yarn client:start
    ```
59. open your browser and enter "http://localhost:3000" on url address
#### 7. Adding Concurrently
60. install concurrently
    ```sh
    npm install concurrently
    ```
61. edit package.json
    ```diff
    "scripts": {
    +    "start": "concurrently \"npm run client:start\" \"npm run server:start\"",
        "server:start": "nodemon index.js",
        "client:start": "webpack --watch"
    },
    ```
62. stop server and react
    ```sh
    ctrl + c
    ```
63. run app with command line
    ```sh
    yarn start
    ```
64. open your browser and enter "http://localhost:3000" on url address
65. congratulations! you've successfully make a boilerplate for react-express server-side renderer.
#### 8. Adding react-router-dom
66. install react-router-dom
    ```sh
    yarn add react-router-dom
    ```
67. make a file src/Pages/Home/index.js
68. type code below on src/Pages/Home/index.js
    ```javascript
    import React from "react";

    const Home = () => {
        return <div>Home</div>;
    };

    export default Home;

    ```
69. make a file src/Pages/About/index.js
70. type code below on src/Pages/About/index.js
71. edit src/index.js
    ```diff
    import React from "react";
    import { hydrate } from "react-dom";
    +import { BrowserRouter } from "react-router-dom";

    import App from "./App";
    import "./global.css";

    hydrate(
    +    <BrowserRouter>
            <App />
    +    </BrowserRouter>,
        document.querySelector("#root")
    );

    ```
72. edit src/App.js
    ```diff
    import React from "react";
    +import { Switch, Route, Link } from "react-router-dom";
    +
    +import Home from "./Pages/Home";
    +import About from "./Pages/About";

    const App = () => {
    -    return <div>App</div>;
    +    return (
    +        <div>
    +            <nav>
    +                <ul>
    +                    <li>
    +                        <Link to="/">Home</Link>
    +                    </li>
    +                    <li>
    +                        <Link to="/about">About</Link>
    +                    </li>
    +                </ul>
    +            </nav>
    +            <Switch>
    +                <Route path="/about">
    +                    <About />
    +                </Route>
    +                <Route path="/">
    +                    <Home />
    +                </Route>
    +            </Switch>
    +        </div>
    +    );
    };

    export default App;

    ```

73. edit server/server.js
    ```diff
    ...
    import React from "react";
    import ReactDOMServer from "react-dom/server";
    +import { StaticRouter } from "react-router-dom";
    +
    import App from "../src/App";
    ...
    app.get("**", (req, res) => {   
    -    const html = ReactDOMServer.renderToString(<App />);
    +    const context = {};
    +    const html = ReactDOMServer.renderToString(
    +        <StaticRouter location={req.url} context={context}>
    +            <App />
    +        </StaticRouter>
    +    );
        fs.readFile(path.resolve("./public/index.html"), "utf-8", (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Some error happened");
            }
    +        if (context.url) {
    +            return res.status(500).send("Some error happened");
    +        }
            return res.send(
                data.replace(`<div id="root"></div>`, `<div id="root">${html}</div>`)
            );
        });
    });
    ...
    ```
74. open your browser
#### 9. Adding bulma css
75. install bulma css
    ```sh
    yarn add bulma
    ```
76. edit server/server.js and set bulma css as static directory
    ```diff
    ...
    app.use("/js", express.static(path.join(__dirname, "../public/js")));
    app.use("/css", express.static(path.join(__dirname, "../public/css")));
    +app.use(
    +    "/bulma",
    +    express.static(path.join(__dirname, "../node_modules/bulma/css"))
    +);
    ...

    ```
77. edit public/index.html
    ```diff
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Document</title>
    +        <link rel="stylesheet" href="/bulma/bulma.min.css" />
            <link rel="stylesheet" href="/css/styles.css" />
        </head>
        <body>
            <div id="root"></div>
            <script src="/js/bundle.js"></script>
        </body>
    </html>
    ```
78. create file src/Components/Navbar/index.js and type this code below
    ```javascript
    import React, { useState } from "react";
    import { Link, NavLink } from "react-router-dom";

    const Navbar = () => {
        const [isActive, setIsActvie] = useState(false);
        return (
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        My App
                    </Link>
                    <a
                        role="button"
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarBasicExample"
                        onClick={() => setIsActvie(!isActive)}
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>

                <div
                    id="navbarBasicExample"
                    className={`navbar-menu ${isActive && "is-active"}`}
                >
                    <div className="navbar-start">
                        <NavLink className="navbar-item" to="/">
                            Home
                        </NavLink>
                        <NavLink className="navbar-item" to="/about">
                            About
                        </NavLink>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                                <a className="button is-light">Log in</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    };

    export default Navbar;

    ```
79. edit src/App.js
    ```diff
    import React from "react";
    import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
    +
    +import Navbar from "./Components/Navbar";

    import Home from "./Pages/Home";
    import About from "./Pages/About";

    const App = () => {
        return (
            <div>
    -            <nav>
    -                <ul>
    -                    <li>
    -                        <Link to="/">Home</Link>
    -                    </li>
    -                    <li>
    -                        <Link to="/about">About</Link>
    -                    </li>
    -                </ul>
    -            </nav>
    +            <Navbar />
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        );
    };

    export default App;

    ```
80. checkout your browser