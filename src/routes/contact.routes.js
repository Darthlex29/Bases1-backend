import { Router } from "express";
import { findAll, addNewContact, findContactByEmail, findContactByUser, findContactById } from "../controllers/contact.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";
import { deleteContact } from "../repositories/contact.dao.js";

const router = Router();

router.get("/contacts", findAll);
router.get("/contacts/user/:id", findContactById)
router.post("/contacts", checkSession, addNewContact);
router.get("/contacts/mail", checkSession, findContactByEmail);
router.get("/contacts/log/users", checkSession, findContactByUser);
router.delete("/contacts", deleteContact)


export default router;