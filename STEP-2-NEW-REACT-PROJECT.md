# Write Your Own Web Store In Hours

![spacer](workshop-assets/readme-images/spacer.png)

## 🪄 Create a default React App

👉💻👈 Use `npx` to deploy a default react app

```shell
npx create-react-app .
```

👉💻👈 Start the Netlify Development Server

```shell
netlify dev
```

![spacer](workshop-assets/readme-images/spacer.png)

**🎉 You should now see this web application in the preview pane 🎉**
![Default React App in Gitpod Preview](workshop-assets/readme-images/gitpod-initial-website-preview.jpg)

![spacer](workshop-assets/readme-images/spacer.png)

## Building out a Basic Web App

By the end of this project, we'll have a home page and a success page, but typically you'd have plenty more. Let's configure a proper routing handler to allow for this.

## Routing

👉💻👈 Install React Router

```shell
npm install react-router-dom
```

## Skeleton Files

We only need two pages, but let's do this the right way. We'll create:

- [x] a template component
- [x] a Home component
- [x] a Success component
- [x] routing configuration to handle requests for these two pages

👉💻👈 Create `/src/components/layout.js`

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <h1>My Web Store</h1>
        <nav>
          <ul>
            <li>
              <Link className="menuitem" to="/">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
```

👉💻👈 Create `/src/pages/home.js`

```javascript
import React from "react";

const Home = () => {
  return (
    <>
      <h1>Home</h1>
      <p>Welcome to my web store!</p>
    </>
  );
};

export default Home;
```

👉💻👈 Create `/src/pages/success.js`

```javascript
import React from "react";

const Success = () => {
  return (
    <>
      <h1>Thanks for your order!</h1>
      <p>Your order has been received.</p>
    </>
  );
};

export default Success;
```

👉💻👈 Update `/src/App.js`

```javascript
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./components/layout";
import Home from "./pages/home";
import Success from "./pages/success";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/success">
            <Success />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
```

🧪 Make sure `netlify dev` is still running and check out your new web site. Manually add `/success` to the end of the URL to test the second page.

💡 Make this looks much prettier by replacing `/src/App.css` with the file by the same name in `/workshop-assets`.
