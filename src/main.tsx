import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout.tsx";
import FetchData from "./components/fetch-data/fetch-data.tsx";
import Contact from "./components/contact/contact.tsx";
import ProductDetail from "./components/product-detail/product-detail.tsx";
import NotFound from "./components/not-found/not-found.tsx";
import SignUp from "./components/sign-up/sign-up.tsx";
import SignIn from "./components/sign-up/sign-in.tsx";
import Cart from "./components/cart/cart.tsx";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "products",
        element: <FetchData />,
      },
      {
        path: "contact",

        element: <Contact />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: ":id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
