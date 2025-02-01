import { Router } from "express";
import { findAll, addNewContact, findContactByEmail, findContactByUser } from "../controllers/contact.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

router.get("/contacts", findAll);
router.post("/contacts", checkSession, addNewContact);
router.get("/contacts/mail", checkSession, findContactByEmail);
router.get("/contacts/user", checkSession, findContactByUser);

export default router;