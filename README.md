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
40. edit views/index.ejs
    ```diff
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    -    <title>Document</title>
    +    <title><%= title %></title>
      </head>
      <body>
        <div id="root"></div>
    +    <script src="/js/bundle.js"></script>
      </body>
    </html>

    ```
41. edit index.js
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
    "scripts": {
    -   "start": "nodemon index.js",
    +    "server:start": "nodemon index.js",
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
    npm run server:start
    ```
47. open new terminal and run react
    ```sh
    npm run client:start
    ```
#### 6. Setup CSS on webpack
48. open your browser and enter "http://localhost:3000" on url address
49. install mini-css-extract-plugin and css-loader into devdependencies
    ```sh
    npm install --only=dev mini-css-extract-plugin css-loader
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
    import { render } from "react-dom";

    import App from "./App";
    +import "./global.css";

    render(<App />, document.querySelector("#root"));
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
55. edit views/index.ejs
    ```diff
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title><%= title %></title>
    +    <link rel="stylesheet" href="/css/styles.css" />
      </head>
      <body>
        <div id="root"></div>
        <script src="/js/bundle.js"></script>
      </body>
    </html>

    ```
56. restart server
    ```sh
    ctrl + c
    npm run server:start
    ```
57. restart react
    ```sh
    ctrl + c
    npm run client:start
    ```
58. open your browser and enter "http://localhost:3000" on url address
#### 7. Adding Concurrently
59. install concurrently
    ```sh
    npm install concurrently
    ```
60. edit package.json
    ```diff
    "scripts": {
    +    "start": "concurrently \"npm run client:start\" \"npm run server:start\"",
        "server:start": "nodemon index.js",
        "client:start": "webpack --watch"
    },
    ```
61. stop server and react
    ```sh
    ctrl + c
    ```
62. run app with command line
    ```sh
    yarn start
    ```
63. open your browser and enter "http://localhost:3000" on url address
64. congratulations! you've successfully make a boilerplate for react-express server-side renderer.
#### 8. Adding react-router-dom
65. install react-router-dom
    ```sh
    yarn add react-router-dom
    ```
66. make a file src/Pages/Home/index.js
67. type code below on src/Pages/Home/index.js
    ```javascript
    import React from "react";

    const Home = () => {
        return <div>Home</div>;
    };

    export default Home;

    ```
68. make a file src/Pages/About/index.js
69. type code below on src/Pages/About/index.js
70. edit src/App.js
    ```diff
    import React from "react";
    +import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
    +
    +import Home from "./Pages/Home";
    +import About from "./Pages/About";

    const App = () => {
    -    return <div>App</div>;
    +    return (
    +        <Router>
    +            <div>
    +                <nav>
    +                    <ul>
    +                        <li>
    +                            <Link to="/">Home</Link>
    +                        </li>
    +                        <li>
    +                            <Link to="/about">About</Link>
    +                        </li>
    +                    </ul>
    +                </nav>
    +                <Switch>
    +                    <Route path="/about">
    +                        <About />
    +                    </Route>
    +                    <Route path="/">
    +                        <Home />
    +                    </Route>
    +                </Switch>
    +            </div>
    +        </Router>
    +    );
    };

    export default App;

    ```
71. open your browser
#### 9. Adding bulma css
72. install bulma css
    ```sh
    yarn add bulma
    ```
73. edit index.js and set bulma css as static directory
    ```diff
    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "views"));
    +
    app.use("/", express.static(path.join(__dirname, "public")));
    +app.use("/bulma", express.static(path.join(__dirname, "node_modules/bulma/css")));
    +
    app.get("**", (req, res) => {
        res.render("index", { title: "React Express" });
    });

    ```
74. edit views/index.js
    ```diff
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title><%= title %></title>
    +        <link rel="stylesheet" href="/bulma/bulma.min.css" />
            <link rel="stylesheet" href="/css/styles.css" />
        </head>
        <body>
            <div id="root"></div>
            <script src="/js/bundle.js"></script>
        </body>
    </html>
    ```
75. create file src/Components/Navbar/index.js
76. type this code into src/Components/Navbar/index.js
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
77. edit src/App.js
    ```diff
    import React from "react";
    import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
    +
    +import Navbar from "./Components/Navbar";

    import Home from "./Pages/Home";
    import About from "./Pages/About";

    const App = () => {
    return (
        <Router>
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
        </Router>
    );
    };

    export default App;

    ```
78. checkout your browser
