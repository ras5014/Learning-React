import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/HomePage.tsx'

/*
  React Router V7 Instructions:
  - npm i react-router
  - 
*/

// React Router Setup
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from './layouts/MainLayout.tsx';
import AboutPage from './pages/AboutPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ProfileDetails from './pages/ProfileDetails.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: HomePage
      },
      {
        path: "about",
        Component: AboutPage
      },
      {
        path: "profiles",
        Component: ProfilePage, // Dynamic Route Layout
        children: [
          {
            path: ":profileId", // For Dynamic Routes
            Component: ProfileDetails
          }
        ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
