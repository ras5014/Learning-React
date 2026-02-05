# Microfrontend with Vite + single-spa (Host + Products)

This repo contains a small **microfrontend** setup using **Vite**, **React**, **single-spa**, and **Vite Module Federation**. There are two apps:

- `host/`: the shell that owns routing and mounts microfrontends
- `products/`: a remote microfrontend exposed to the host

This README explains:

- How the current codebase is wired
- Why each piece exists
- How to rebuild this architecture from scratch

---

**Quick Start (current repo)**

1. Install deps in each app:

```powershell
cd host; npm install
cd ..\products; npm install
```

2. Run both dev servers:

```powershell
cd host; npm run dev
cd ..\products; npm run dev
```

3. Open `http://localhost:4000`. Navigate to `/products` to see the remote.

---

**Current Architecture (indepth analysis)**

**1) Host app (`host/`)**

- Runs on port **4000**
- Owns the router and single-spa lifecycle
- Loads the remote microfrontend via **Module Federation**

Key files:

- `host/vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        products: "http://localhost:4001/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

Why this matters:

- **`@originjs/vite-plugin-federation`** is what enables dynamic loading of the remote bundle.
- `remotes.products` points to the **remote entry** exposed by the products app.
- `shared` ensures React and Redux are singletons so you avoid duplicated React copies.

- `host/src/main.tsx`

```ts
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import AppStoreProvider from './providers/AppStoreProvider'
import { registerApplication, start } from 'single-spa'

registerApplication({
  name: 'host-app',
  app: () => Promise.resolve({
    bootstrap: () => Promise.resolve(),
    mount: () => {
      const root = createRoot(document.getElementById('root')!)
      root.render(
        <AppStoreProvider>
          <App />
        </AppStoreProvider>
      )
      return Promise.resolve()
    },
    unmount: () => Promise.resolve()
  }),
  activeWhen: () => true
})

registerApplication({
  name: 'products',
  app: () =>
    import('products/ProductsApp').then((module: any) => {
      const lifecycles = module?.default ?? module
      return {
        bootstrap: lifecycles?.bootstrap,
        mount: lifecycles?.mount,
        unmount: lifecycles?.unmount
      }
    }),
  activeWhen: ['/products']
})

start({
  urlRerouteOnly: true
})
```

Why this matters:

- The host itself is registered as a **single-spa application** that is always active.
- The `products` app is **lazy-loaded** only when the URL matches `/products`.
- `import('products/ProductsApp')` is the Module Federation remote import.
- `start()` begins single-spa routing and lifecycle management.

**2) Products app (`products/`)**

- Runs on port **4001**
- Exposes its single-spa lifecycles as a remote module

Key files:

- `products/vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "products",
      filename: "remoteEntry.js",
      exposes: {
        "./ProductsApp": "./src/spa-entry.jsx",
      },
      shared: ["react", "react-dom", "react-redux", "@reduxjs/toolkit"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
```

Why this matters:

- `filename: "remoteEntry.js"` is what the host consumes.
- `exposes` tells the host which module it can import (`products/ProductsApp`).

- `products/src/spa-entry.jsx`

```jsx
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  renderType: "createRoot",
  rootComponent: App,
  errorBoundary(err, info, props) {
    return <div>Error loading products microfrontend</div>;
  },
});

export const { bootstrap, mount, unmount } = lifecycles;
export default lifecycles;
```

Why this matters:

- `single-spa-react` wraps your React app into single-spa **lifecycles**.
- The host loads these lifecycles and mounts/unmounts the remote.

- `products/src/main.tsx`

```ts
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
```

Why this matters:

- This is **optional** and only used when you run the products app standalone.
- The microfrontend version is powered by `spa-entry.jsx` instead.

---

**How To Build This From Scratch (teacher-style)**

**Goal**: a host app that controls routing and renders microfrontends, plus a products app that exposes a single-spa lifecycle to the host.

**Step 1: Create both apps**

```powershell
npm create vite@latest host -- --template react-ts
npm create vite@latest products -- --template react-ts
```

**Step 2: Install dependencies**

Host:

```powershell
cd host
npm install single-spa @originjs/vite-plugin-federation
```

Products:

```powershell
cd ..\products
npm install single-spa single-spa-react @originjs/vite-plugin-federation
```

**Step 3: Configure Vite Module Federation**

Host `vite.config.ts`:

```ts
federation({
  name: "host",
  remotes: {
    products: "http://localhost:4001/assets/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
})
```

Products `vite.config.ts`:

```ts
federation({
  name: "products",
  filename: "remoteEntry.js",
  exposes: {
    "./ProductsApp": "./src/spa-entry.jsx",
  },
  shared: ["react", "react-dom"],
})
```

**Step 4: Create the microfrontend entry**

`products/src/spa-entry.jsx`:

```jsx
import React from "react";
import * as ReactDOMClient from "react-dom/client";
import singleSpaReact from "single-spa-react";
import App from "./App";

const lifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  renderType: "createRoot",
  rootComponent: App,
});

export const { bootstrap, mount, unmount } = lifecycles;
export default lifecycles;
```

**Step 5: Register apps in the host**

`host/src/main.tsx`:

```ts
import { registerApplication, start } from 'single-spa'

registerApplication({
  name: 'host-app',
  app: () => Promise.resolve({
    bootstrap: () => Promise.resolve(),
    mount: () => {
      // render host UI
      return Promise.resolve()
    },
    unmount: () => Promise.resolve()
  }),
  activeWhen: () => true,
})

registerApplication({
  name: 'products',
  app: () =>
    import('products/ProductsApp').then((module: any) => {
      const lifecycles = module?.default ?? module
      return {
        bootstrap: lifecycles?.bootstrap,
        mount: lifecycles?.mount,
        unmount: lifecycles?.unmount
      }
    }),
  activeWhen: ['/products'],
})

start()
```

**Step 6: Run both apps**

```powershell
cd host
npm run dev
```

```powershell
cd ..\products
npm run dev
```

Visit `http://localhost:4000/products`.

---

**Common Pitfalls (and how to avoid them)**

- **React duplicated**: always `shared` React in federation to avoid multiple copies.
- **Remote entry not reachable**: confirm `http://localhost:4001/assets/remoteEntry.js` loads in the browser.
- **Routing mismatch**: `activeWhen` controls mount. If `/products` doesn’t show anything, check the URL and the host’s router.
- **CORS issues**: Vite dev servers must allow cross-origin. In this repo `vite --cors` is used.

---

**Next Steps You Can Try**

1. Add another remote (e.g. `checkout/`) and register it with `activeWhen: ['/checkout']`.
2. Add shared UI components using another federated package.
3. Add a root config app that only handles routing and move host UI to its own microfrontend.