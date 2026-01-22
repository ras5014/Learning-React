# 🚀 React Micro Frontends with Module Federation

<div align="center">

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack%205-Module%20Federation-8DD6F9?style=for-the-badge&logo=webpack&logoColor=white)
![Redux](https://img.shields.io/badge/Redux%20Toolkit-2.11.2-764ABC?style=for-the-badge&logo=redux&logoColor=white)

*A complete guide to building micro frontends with shared Redux state* ✨

</div>

---

## 📑 Table of Contents

- [🎯 What is This Project?](#-what-is-this-project)
- [🏗️ Architecture Overview](#️-architecture-overview)
- [📁 Project Structure](#-project-structure)
- [🛠️ Step-by-Step Setup](#️-step-by-step-setup)
  - [Step 1: Create the Host Application](#step-1-create-the-host-application)
  - [Step 2: Create the Header Remote](#step-2-create-the-header-remote)
  - [Step 3: Create the Products Remote](#step-3-create-the-products-remote)
  - [Step 4: Create the Counter Remote (with Redux)](#step-4-create-the-counter-remote-with-redux)
- [🔄 How Redux Sharing Works](#-how-redux-sharing-works)
- [🔗 How Remotes Access the Host](#-how-remotes-access-the-host)
- [🚦 Running the Application](#-running-the-application)
- [💡 Key Concepts Explained](#-key-concepts-explained)
- [⚠️ Common Pitfalls](#️-common-pitfalls)
- [🎉 Summary](#-summary)

---

## 🎯 What is This Project?

This project demonstrates **Micro Frontends** architecture using **Webpack 5 Module Federation**. 

> 🧠 **Micro Frontends** = Breaking a monolithic frontend into smaller, independent applications that can be developed, deployed, and scaled separately!

### 🌟 Features Demonstrated:
- ✅ **Host Application** consuming multiple remote micro frontends
- ✅ **Multiple Remote Apps** (Header, Products, Counter)
- ✅ **Shared Redux State** across micro frontends
- ✅ **Bi-directional Module Sharing** (Host ↔ Remotes)
- ✅ **Lazy Loading** of remote components
- ✅ **Singleton Dependencies** (React, Redux)

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        🏠 HOST APPLICATION (Port 3000)                   │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                     Redux Store (Source of Truth)                │   │
│  │  ┌─────────────────┐  ┌──────────────┐  ┌──────────────────┐    │   │
│  │  │  counterSlice   │  │ AppStoreProvider│ │   Other Slices   │    │   │
│  │  └─────────────────┘  └──────────────┘  └──────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                   │                                     │
│               ┌───────────────────┼───────────────────┐                │
│               ▼                   ▼                   ▼                │
│  ┌────────────────┐   ┌────────────────┐   ┌────────────────┐         │
│  │    <Header/>   │   │   <Products/>  │   │   <Counter/>   │         │
│  │   (Remote)     │   │    (Remote)    │   │    (Remote)    │         │
│  └────────────────┘   └────────────────┘   └────────────────┘         │
└─────────────────────────────────────────────────────────────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         │                       │                       │ imports counterSlice
         │                       │                       │ & AppStoreProvider
         │                       │                       │
┌────────┴───────┐     ┌────────┴───────┐     ┌────────┴───────┐
│ 📦 HEADER      │     │ 📦 PRODUCTS    │     │ 📦 COUNTER     │
│ Port: 3001     │     │ Port: 3002     │     │ Port: 3003     │
│ Exposes:       │     │ Exposes:       │     │ Exposes:       │
│  ./Header      │     │  ./Products    │     │  ./Counter     │
│                │     │                │     │ Imports from   │
│                │     │                │     │ HOST:          │
│                │     │                │     │ counterSlice   │
│                │     │                │     │ AppStoreProvider│
└────────────────┘     └────────────────┘     └────────────────┘
```

---

## 📁 Project Structure

```
react/
├── 🏠 host/                    # Main container application
│   ├── package.json
│   ├── webpack.config.js       # Module Federation config
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.jsx            # Entry point
│       ├── App.jsx             # Main component with lazy imports
│       ├── index.css
│       ├── app/
│       │   └── store.jsx       # Redux store configuration
│       ├── features/
│       │   └── counter/
│       │       └── counterSlice.js  # Redux slice (EXPOSED!)
│       └── providers/
│           └── AppStoreProvider.jsx  # Redux provider (EXPOSED!)
│
├── 📦 header/                  # Header micro frontend
│   ├── package.json
│   ├── webpack.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.jsx
│       ├── Header.jsx          # Exposed component
│       └── index.css
│
├── 📦 products/                # Products micro frontend
│   ├── package.json
│   ├── webpack.config.js
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── main.jsx
│       ├── Products.jsx        # Exposed component
│       ├── ProductList.jsx
│       └── index.css
│
└── 📦 counter/                 # Counter micro frontend (uses Redux!)
    ├── package.json
    ├── webpack.config.js
    ├── public/
    │   └── index.html
    └── src/
        ├── main.jsx            # Imports AppStoreProvider from host
        ├── Counter.jsx         # Uses Redux from host!
        └── index.css
```

---

## 🛠️ Step-by-Step Setup

### Prerequisites 📋

```bash
# Make sure you have Node.js installed
node --version  # v18+ recommended
npm --version   # v9+ recommended
```

---

### Step 1: Create the Host Application

The **Host** is the main shell that loads all micro frontends.

#### 1.1 Initialize the project

```bash
mkdir host && cd host
npm init -y
```

#### 1.2 Install dependencies

```bash
# Production dependencies
npm install react react-dom @reduxjs/toolkit react-redux

# Development dependencies
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin \
  @babel/core @babel/preset-react babel-loader css-loader style-loader
```

#### 1.3 Create `webpack.config.js` 🔧

```javascript
// host/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  devServer: {
    port: 3000,  // 🏠 Host runs on port 3000
  },
  output: {
    publicPath: "http://localhost:3000/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "host",
      filename: "remoteEntry.js",
      
      // 🎁 EXPOSES: What host shares WITH remotes
      exposes: {
        "./AppStoreProvider": "./src/providers/AppStoreProvider.jsx",
        "./counterSlice": "./src/features/counter/counterSlice",
      },
      
      // 📥 REMOTES: What host consumes FROM remotes
      remotes: {
        header: "header@http://localhost:3001/remoteEntry.js",
        products: "products@http://localhost:3002/remoteEntry.js",
        counter: "counter@http://localhost:3003/remoteEntry.js",
      },
      
      // 🤝 SHARED: Singleton dependencies (only ONE instance!)
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-redux": { singleton: true, eager: true },
        "@reduxjs/toolkit": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
```

> 💡 **Key Insight**: The host **EXPOSES** `AppStoreProvider` and `counterSlice` so remotes can import them!

#### 1.4 Create Redux Store 🗄️

```javascript
// host/src/app/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

#### 1.5 Create Counter Slice 🧮

```javascript
// host/src/features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 1.6 Create AppStoreProvider 🎁

```javascript
// host/src/providers/AppStoreProvider.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";

export const AppStoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppStoreProvider;
```

> ⭐ **This is the MAGIC!** This provider is exposed so remotes can wrap themselves with the SAME Redux store!

#### 1.7 Create Main App Component 🏠

```javascript
// host/src/App.jsx
import React, { Suspense, lazy } from "react";

// 🦥 Lazy loading remote components
const Header = lazy(() =>
  import("header/Header").then((module) => ({ default: module.Header })),
);
const Products = lazy(() =>
  import("products/Products").then((module) => ({ default: module.Products })),
);
const Counter = lazy(() =>
  import("counter/Counter").then((module) => ({ default: module.Counter })),
);

export function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Products...</div>}>
        <Products />
      </Suspense>
      <Suspense fallback={<div>Loading Counter...</div>}>
        <Counter />
      </Suspense>
    </div>
  );
}
```

#### 1.8 Create Entry Point 🚪

```javascript
// host/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { AppStoreProvider } from "./providers/AppStoreProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppStoreProvider>
    <App />
  </AppStoreProvider>,
);
```

#### 1.9 Create HTML Template 📄

```html
<!-- host/public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Host MFE</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

#### 1.10 Update package.json scripts

```json
{
  "scripts": {
    "start": "webpack serve --mode development --open",
    "build": "webpack --mode production"
  }
}
```

---

### Step 2: Create the Header Remote

A simple remote that **doesn't need Redux**.

#### 2.1 Initialize & Install

```bash
mkdir header && cd header
npm init -y
npm install react react-dom
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin \
  @babel/core @babel/preset-react babel-loader css-loader style-loader
```

#### 2.2 Create `webpack.config.js` 🔧

```javascript
// header/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  devtool: "source-map",
  devServer: {
    port: 3001,  // 📦 Header runs on port 3001
  },
  output: {
    publicPath: "http://localhost:3001/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "header",
      filename: "remoteEntry.js",
      
      // 🎁 Exposes Header component
      exposes: {
        "./Header": "./src/Header.jsx",
      },
      
      // 🤝 Shared dependencies
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
```

#### 2.3 Create Header Component 🎨

```javascript
// header/src/Header.jsx
import React from "react";
import "./index.css";

export function Header() {
  return (
    <div className="header">
      <h1>Micro Frontend Header</h1>
    </div>
  );
}
```

#### 2.4 Create Entry Point

```javascript
// header/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Header.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Header />);
```

---

### Step 3: Create the Products Remote

Another simple remote without Redux.

#### 3.1 Initialize & Install

```bash
mkdir products && cd products
npm init -y
npm install react react-dom
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin \
  @babel/core @babel/preset-react babel-loader css-loader style-loader
```

#### 3.2 Create `webpack.config.js` 🔧

```javascript
// products/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  devtool: "source-map",
  devServer: {
    port: 3002,  // 📦 Products runs on port 3002
  },
  output: {
    publicPath: "http://localhost:3002/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products",
      filename: "remoteEntry.js",
      
      // 🎁 Exposes Products component
      exposes: {
        "./Products": "./src/Products.jsx",
      },
      
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
```

#### 3.3 Create Products Components 🛍️

```javascript
// products/src/Products.jsx
import React from "react";
import ProductList from "./ProductList";

export function Products() {
  const products = ["Product 1", "Product 2", "Product 3"];
  return (
    <div>
      <h2>Products List</h2>
      <ProductList products={products} />
    </div>
  );
}
```

```javascript
// products/src/ProductList.jsx
import React from "react";

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  );
}

export default ProductList;
```

---

### Step 4: Create the Counter Remote (with Redux!)

This is the **most interesting** remote - it uses Redux state from the HOST! 🔥

#### 4.1 Initialize & Install

```bash
mkdir counter && cd counter
npm init -y
npm install react react-dom @reduxjs/toolkit react-redux
npm install -D webpack webpack-cli webpack-dev-server html-webpack-plugin \
  @babel/core @babel/preset-react babel-loader css-loader style-loader
```

#### 4.2 Create `webpack.config.js` 🔧

```javascript
// counter/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/main.jsx",
  devtool: "source-map",
  devServer: {
    port: 3003,  // 📦 Counter runs on port 3003
  },
  output: {
    publicPath: "http://localhost:3003/",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "counter",
      filename: "remoteEntry.js",
      
      // 🎁 Exposes Counter component
      exposes: {
        "./Counter": "./src/Counter.jsx",
      },
      
      // ⭐ IMPORTS FROM HOST! (Bi-directional communication)
      remotes: {
        host: "host@http://localhost:3000/remoteEntry.js",
      },
      
      // 🤝 CRITICAL: Must share Redux dependencies as singletons!
      shared: {
        react: { singleton: true, eager: true },
        "react-dom": { singleton: true, eager: true },
        "react-redux": { singleton: true, eager: true },
        "@reduxjs/toolkit": { singleton: true, eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
    }),
  ],
};
```

> 🔥 **The Magic**: Notice the `remotes` section points to the HOST! This is **bi-directional federation**!

#### 4.3 Create Counter Component 🧮

```javascript
// counter/src/Counter.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";

// 🔥 Import Redux actions from the HOST!
const { increment, decrement } = await import("host/counterSlice");

export function Counter() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);
  
  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}
```

> ⭐ **Key Point**: The `increment` and `decrement` actions are imported from the HOST's `counterSlice`!

#### 4.4 Create Entry Point (with Host Provider!) 🚪

```javascript
// counter/src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Counter } from "./Counter.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// 🔥 Try to load AppStoreProvider from HOST, fallback if not available
try {
  const { default: AppStoreProvider } = await import("host/AppStoreProvider");
  root.render(
    <AppStoreProvider>
      <Counter />
    </AppStoreProvider>
  );
} catch (error) {
  console.warn("Host AppStoreProvider not available, rendering without it:", error);
  root.render(<Counter />);
}
```

> 🎯 **This enables the counter remote to run STANDALONE or inside the HOST!**

---

## 🔄 How Redux Sharing Works

Here's the complete flow of how Redux state is shared:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           REDUX SHARING FLOW                            │
└─────────────────────────────────────────────────────────────────────────┘

    ┌───────────────────────────────────────────────────────────────┐
    │                      HOST APPLICATION                          │
    │                                                                 │
    │  1️⃣ Creates Redux Store                                        │
    │     ┌─────────────────────────────────────────┐               │
    │     │ store = configureStore({                │               │
    │     │   reducer: { counter: counterReducer }  │               │
    │     │ })                                      │               │
    │     └─────────────────────────────────────────┘               │
    │                           │                                     │
    │  2️⃣ Creates AppStoreProvider                                   │
    │     ┌─────────────────────────────────────────┐               │
    │     │ <Provider store={store}>                │               │
    │     │   {children}                            │ ◄─── EXPOSED!  │
    │     │ </Provider>                             │               │
    │     └─────────────────────────────────────────┘               │
    │                           │                                     │
    │  3️⃣ Exposes via Module Federation                              │
    │     ┌─────────────────────────────────────────┐               │
    │     │ exposes: {                              │               │
    │     │   "./AppStoreProvider": "...",          │               │
    │     │   "./counterSlice": "..."               │ ◄─── EXPOSED!  │
    │     │ }                                       │               │
    │     └─────────────────────────────────────────┘               │
    └───────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTP Request to
                                    │ http://localhost:3000/remoteEntry.js
                                    ▼
    ┌───────────────────────────────────────────────────────────────┐
    │                     COUNTER REMOTE                             │
    │                                                                 │
    │  4️⃣ Configures remote to HOST                                  │
    │     ┌─────────────────────────────────────────┐               │
    │     │ remotes: {                              │               │
    │     │   host: "host@http://localhost:3000/..."│               │
    │     │ }                                       │               │
    │     └─────────────────────────────────────────┘               │
    │                           │                                     │
    │  5️⃣ Imports from HOST                                          │
    │     ┌─────────────────────────────────────────┐               │
    │     │ const { increment } =                   │               │
    │     │   await import("host/counterSlice");    │               │
    │     │                                         │               │
    │     │ const AppStoreProvider =                │               │
    │     │   await import("host/AppStoreProvider");│               │
    │     └─────────────────────────────────────────┘               │
    │                           │                                     │
    │  6️⃣ Uses SAME Redux instance!                                  │
    │     ┌─────────────────────────────────────────┐               │
    │     │ const count = useSelector(              │               │
    │     │   state => state.counter.value          │               │
    │     │ );                                      │               │
    │     │ dispatch(increment()); // Works! ✅      │               │
    │     └─────────────────────────────────────────┘               │
    └───────────────────────────────────────────────────────────────┘
```

### 🔑 Key Configuration for Redux Sharing

```javascript
// In BOTH host AND counter webpack configs:
shared: {
  react: { singleton: true, eager: true },
  "react-dom": { singleton: true, eager: true },
  "react-redux": { singleton: true, eager: true },      // ⭐ CRITICAL!
  "@reduxjs/toolkit": { singleton: true, eager: true }, // ⭐ CRITICAL!
}
```

> ⚠️ **Without `singleton: true`**, each micro frontend would have its OWN React/Redux instance, causing the context to break!

---

## 🔗 How Remotes Access the Host

### The Bi-directional Federation Pattern 🔄

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    BI-DIRECTIONAL MODULE FEDERATION                     │
└─────────────────────────────────────────────────────────────────────────┘

           HOST (Port 3000)                    COUNTER (Port 3003)
        ┌─────────────────────┐            ┌─────────────────────┐
        │                     │            │                     │
        │  EXPOSES:           │◄───────────┤  IMPORTS:           │
        │  - AppStoreProvider │            │  - host/counterSlice│
        │  - counterSlice     │            │  - host/AppStore... │
        │                     │            │                     │
        │  IMPORTS:           │───────────►│  EXPOSES:           │
        │  - counter/Counter  │            │  - Counter          │
        │                     │            │                     │
        └─────────────────────┘            └─────────────────────┘
```

### Step-by-Step: How Counter Accesses Host

#### 1️⃣ Counter's Webpack Config Points to Host

```javascript
// counter/webpack.config.js
remotes: {
  host: "host@http://localhost:3000/remoteEntry.js",
}
```

This tells webpack: *"When I import from 'host/...', fetch it from localhost:3000"*

#### 2️⃣ Counter Dynamically Imports from Host

```javascript
// counter/src/Counter.jsx
const { increment, decrement } = await import("host/counterSlice");
```

At runtime, this:
1. Fetches `http://localhost:3000/remoteEntry.js`
2. Loads the `counterSlice` module
3. Gets the exported `increment` and `decrement` actions

#### 3️⃣ Counter Uses Host's AppStoreProvider

```javascript
// counter/src/main.jsx
const { default: AppStoreProvider } = await import("host/AppStoreProvider");
root.render(
  <AppStoreProvider>
    <Counter />
  </AppStoreProvider>
);
```

This wraps the Counter with the HOST's Redux Provider, giving it access to the shared store!

---

## 🚦 Running the Application

### Start All Micro Frontends

Open **4 terminal windows** and run each in its directory:

```bash
# Terminal 1 - Host (Main Shell)
cd host
npm start
# 🏠 Opens at http://localhost:3000

# Terminal 2 - Header
cd header
npm start
# 📦 Opens at http://localhost:3001

# Terminal 3 - Products
cd products
npm start
# 📦 Opens at http://localhost:3002

# Terminal 4 - Counter
cd counter
npm start
# 📦 Opens at http://localhost:3003
```

### Verify It Works ✅

1. **Visit `http://localhost:3000`** - You should see all three remotes loaded!
2. **Click Increment/Decrement** - The counter should update
3. **Open DevTools Network tab** - You'll see `remoteEntry.js` files being fetched

### Running Remotes Standalone 🎯

Each remote can run independently:
- **Header**: `http://localhost:3001` - Shows just the header
- **Products**: `http://localhost:3002` - Shows just products
- **Counter**: `http://localhost:3003` - Counter with Redux (from host!)

---

## 💡 Key Concepts Explained

### 📦 Module Federation Plugin Options

| Option | Description |
|--------|-------------|
| `name` | Unique identifier for this micro frontend |
| `filename` | The manifest file name (usually `remoteEntry.js`) |
| `exposes` | Modules this app shares with others |
| `remotes` | Modules this app imports from others |
| `shared` | Dependencies shared as singletons |

### 🔑 Singleton Dependencies

```javascript
shared: {
  react: { 
    singleton: true,  // Only ONE instance across all MFEs
    eager: true       // Load immediately, not lazily
  },
}
```

**Why `singleton: true`?**
- React Context (including Redux) requires the SAME React instance
- Multiple React instances = broken hooks and context

**Why `eager: true`?**
- Loads shared deps immediately
- Prevents race conditions during initialization

### 🦥 Lazy Loading Remote Components

```javascript
const Header = lazy(() =>
  import("header/Header").then((module) => ({ default: module.Header }))
);
```

**Why the `.then()`?**
- Module Federation exports might be named exports
- `lazy()` expects a `default` export
- We transform `{ Header }` to `{ default: Header }`

---

## ⚠️ Common Pitfalls

### ❌ Problem: "Invalid hook call"

**Cause**: Multiple React instances

**Solution**: Ensure `singleton: true` for React in ALL MFEs

### ❌ Problem: "Cannot read properties of undefined (reading 'counter')"

**Cause**: Redux store not properly shared

**Solution**: 
1. Make sure host EXPOSES `AppStoreProvider`
2. Make sure remote IMPORTS and USES it
3. Ensure `react-redux` is a singleton

### ❌ Problem: Remote not loading

**Cause**: Remote not running or wrong URL

**Solution**:
1. Start all remotes before host
2. Check port numbers match webpack config
3. Verify `publicPath` matches `devServer.port`

### ❌ Problem: Styles not loading

**Cause**: Missing CSS loaders

**Solution**: Add to webpack config:
```javascript
{
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
}
```

---

## 🎉 Summary

### What We Built 🏗️

| App | Port | Role | Redux? |
|-----|------|------|--------|
| **Host** | 3000 | Shell container, Redux store owner | ✅ Provider |
| **Header** | 3001 | Simple header component | ❌ |
| **Products** | 3002 | Product listing component | ❌ |
| **Counter** | 3003 | Counter using shared Redux | ✅ Consumer |

### Key Takeaways 🎯

1. **Module Federation** enables true micro frontends in React
2. **Bi-directional sharing** allows remotes to import from host
3. **Singleton shared deps** are CRITICAL for React/Redux
4. **Lazy loading** improves performance and user experience
5. **Each MFE can run standalone** for development/testing

### The Architecture Pattern 📐

```
     ┌──────────────────────────────────────────┐
     │          🏠 HOST APPLICATION              │
     │  • Owns Redux Store                       │
     │  • Exposes Provider + Slices              │
     │  • Consumes Remote Components             │
     └──────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     ┌────────┐   ┌──────────┐   ┌─────────┐
     │ Header │   │ Products │   │ Counter │
     │ Simple │   │  Simple  │   │ Redux   │
     │ Remote │   │  Remote  │   │ Remote  │
     └────────┘   └──────────┘   └─────────┘
```

---

<div align="center">

### 🎊 Congratulations!

You now understand how to build **React Micro Frontends** with **Shared Redux State**!

---

Made with ❤️ for learning React Micro Frontends

</div>
