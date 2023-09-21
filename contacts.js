import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

export async function getContactById(contactId) {
  const movies = await listContacts();
  const result = movies.find((item) => item.id === contactId);
  return result || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contacts.splice(index, 1);
  await listContacts(contacts);
  return result;
}

export async function addContact( {name, email, phone} ) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await listContacts(contacts);
  return newContact;
}
