# ReactJS server-side renderer

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
6. install express js
```
npm install express
```
7. create file gitignore
```
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
```
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
11. type these on your command line
```
node index.js
```
12. go to your browser type "http://localhost:5000" on url address
13. congratulations! you made your first "hello world" app
14. install nodemon and browser-sync on devdependencies
```
npm install --only=dev nodemon browser-sync
```
15. install dotenv
```
npm install dotenv
```
16. create .env file and .env.example
```
touch .env
touch .env.example
```
17. type or copy and paste these below on your .env and .env.exmple file
```
NODE_ENV=development
```
18. edit your index.js with these
```diff
const express = require("express");
+ const browserSync = require("browser-sync");
+ const dotenv = require("dotenv");

+ dotenv.config();
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
+    if(process.env.NODE_ENV!=="production"){
+        browserSync({
+          online: false,
+          open: false,
+          port: 3000,
+          proxy: "localhost:" + port,
+          ui: false,
+        });
+    }
+    else{
        console.log(`> server running on http://localhost:${port}`);
+    }
});

```