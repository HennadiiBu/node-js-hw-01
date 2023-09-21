import * as contactBook from "./contacts.js";

import { Command } from "commander";

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        const contactList = await contactBook.listContacts();
        return console.log(contactList);
      case "get":
        const oneContact = await contactBook.getContactById(id);
        return console.log(oneContact);
      case "add":
        const newContact = await contactBook.addContact({ name, email, phone });
        return console.log(newContact);
      case "remove":
        const deleteContact = await contactBook.removeContact(id);
        return console.log(deleteContact);
      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

invokeAction(argv);


