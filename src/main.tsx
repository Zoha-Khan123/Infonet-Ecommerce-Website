import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router'
import Layout from './Layout.tsx'
import FetchData from './components/fetch-data/fetch-data.tsx'
import Contact from './components/contact/contact.tsx'
import SignUp from './components/sign-up/sign-up.tsx'
import ProductDetail from './components/product-detail/product-detail.tsx'
import NotFound from './components/not-found/not-found.tsx'


const route = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'products',
        element: <FetchData />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path:'sign-up',
        element:<SignUp/>
      },
      {
        path: ':id',
        element: <ProductDetail />,
      },

      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>,
)
