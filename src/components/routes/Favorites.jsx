import React from 'react'
import { useFetcher } from "react-router-dom";
import {  updateContact } from "../contacts";

export async function action({ request, params }) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

//*The ★ button on the contact page makes sense for this. We aren't creating or deleting a new record, we don't want to change pages, we simply want to change the data on the page we're looking at. */

const Favorite = ({ contact }) => {
  // useFetcher hook. It allows us to communicate with loaders and actions without causing a navigation.
  const fetcher = useFetcher();

  let favorite = contact.favorite;
  //👉 Read the optimistic value from fetcher.formData. this permit us to put star immediatly befor the netwok latency finish. if it fail, we revert to real data.
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }
  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};

export default Favorite

