import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./components/index.css";
import Contact, { loader as contactLoader } from "./components/routes/contact";
import {action as contactAction} from "./components/routes/Favorites"
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./components/routes/roots";
import EditContact, { action as editAction } from "./components/routes/edit";
import { action as destroyAction } from "./components/routes/destroy";
import Index from "./components/routes/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    //👉Configure the loader on the route(to load data from Api)
    loader: rootLoader,
    //👉 Import and set the action on the route to create contacts
    action: rootAction,
    //👉Move the contacts route to be a child of the root route to make them appear in the blank right part

    children: [
      {
        /**We could add the error element to every one of the child routes but, since it's all the same error page, this isn't recommended.

There's a cleaner way. Routes can be used without a path, which lets them participate in the UI layout without requiring new path segments in the URL */
        //👉 Wrap the child routes in a pathless route
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: "contacts/:contactId",
            element: <Contact />,
            //👉 Configure the loader on the route to get users by params (ID)
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          //👉 Add the destroy route to the route config
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
