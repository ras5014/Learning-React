import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App'
import AppStoreProvider from './providers/AppStoreProvider'
import { registerApplication, start } from 'single-spa'

// Register the host app (shell)
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
    activeWhen: () => true // Always active
})

// Register the remote micro-frontends
registerApplication({
    name: 'products',
    app: () => import('products/ProductsApp').then(module => ({
        bootstrap: module.bootstrap,
        mount: module.mount,
        unmount: module.unmount
    })),
    activeWhen: ['/products']
})

// Start single-spa
start({
    urlRerouteOnly: true
})
