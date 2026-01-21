import { createRoot } from 'react-dom/client'

// 👉 IMPORTANT: Initialize i18n configuration before rendering the app
/**
 * i18n must initialize before any component tries to use it
 * if you forget this, useTranslation() hook won't work
 */
import './i18n/config.ts'

import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <App />
)
