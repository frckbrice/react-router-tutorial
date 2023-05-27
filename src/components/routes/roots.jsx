//the root layout component
import { useEffect } from "react";
import {
  Outlet,
  Link,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contacts";

//Export a loader from root.jsx
//  export async function loader() {
//    const contacts = await getContacts();
//    return { contacts };
//  }
//👉 Filter the list if there are URLSearchParams
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  //👉 Return q from this loader and set it as the search field default value
  console.log(
    "in the root file, the loader data (contacts:):",
    getContacts(q),
    q
  );
  return { contacts, q };
}

//👉 Redirect the contact to the edit page
export async function action() {
  const contact = await createContact();
  console.log(" in the root file, createContact()", contact);
  return redirect(`/contacts/${contact.id}/edit`);
  //  return { contact };
}

//👉 Create the action and change <form> to <Form>
export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  console.log(" in the root file, useLoaderData()", contacts);

  //Submitting Forms onChange
  const submit = useSubmit();

  //👉 Add the search spinner for better UX. this makes the user feeling the search is going on
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>reabase academy 'RRC'</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              // adding the spinner for better UX
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              // onChange={(event) => {
              //*The submit function will serialize and submit any form you pass to it.
              //   submit(event.currentTarget.form);
              // }}
              //*Managing the History Stack to avoid long history show when typing
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div
              id="search-spinner"
              aria-hidden
              // hidden={true}
              //* this  is what makes the spinner appears
              hidden={!searching}
              style={{ color: "orangered" }}
            />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* //*this <Form> Component prevent browser from sending request direct to the server but to the 'action' instead */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {/* <ul>
            <li>
              <Link to='/contacts/1'>Your Name</Link>
            </li>
            <li>
              <Link to={`/contacts/2`}>Your Friend</Link>
            </li>
          </ul> */}
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* <Link to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </Link> */}
                  {/* //*👉Active Link Styling:  Use a NavLink in the sidebar */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
        <h6>made with love by Avom Brice</h6>
      </div>

      <div
        id="detail"
        className={
          navigation.state === "loading"
            ? "loading"
            : navigation.state === "idle"
            ? "idle"
            : "submitting"
        }
      >
        <Outlet />
      </div>
    </>
  );
}
