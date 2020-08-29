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
14. install nodemon on devdependencies
```
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
16. run with this command
```
npm run start
```
17. open your browser and enter "http://localhost:5000" on url address
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
ctrl+c
npm run start
```
28. open your browser and enter "http://localhost:3000" on url address