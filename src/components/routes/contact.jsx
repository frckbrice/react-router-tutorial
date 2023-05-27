import { Form, useLoaderData } from "react-router-dom";
import Favorite from "./Favorites";
// import { contact } from "../data/input";

import { getContact } from "../contacts";

//👉 Add a loader  and access data with useLoaderData
export async function loader({ params }) {
  // const contact = await getContact(params.contactId);
  // console.log("in the contact file. getContact()", contact);
  // return { contact };
  //*👉 Throw a 404 response in the loader
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export default function Contact() {

  const { contact } = useLoaderData();
  console.log("usecontactloader() data", contact);

  

  return (
    <div id="contact">
      <div>
        <img key={contact.avatar} src={contact.avatar || null} alt="" />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${contact.twitter}`}
              rel="noreferrer"
            >
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                window.open("exit", "Thanks !");
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}
