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

