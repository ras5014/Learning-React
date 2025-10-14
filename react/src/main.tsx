import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { lazy, Suspense } from 'react'

/* 
  - Lazy Loading App component
  - Wrapping App with Suspense component to show fallback while loading
  - ✅ What happens:
    The App code isn’t in the main JS bundle.
    When <App /> is first rendered, React downloads App.tsx’s chunk.
    App Component doesn't load until it is required to render. We can add a button to show/hide the component to see this in action.
*/
const App = lazy(() => import('./App'))

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    {/* Suspense shows fallback while the About component loads */}
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
