
//👉 Add the destroy action
import { redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

let value = 10;
export async function action({ params }) {
   value= await deleteContact(params.contactId);
  return redirect("/");
}
 console.log(value);