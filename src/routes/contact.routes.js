import { Router } from "express";
import { findAll, addNewContact, findContactByEmail, findContactByUser, findContactById } from "../controllers/contact.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

router.get("/contacts", findAll);
router.get("/contacts/user", findContactById)
router.post("/contacts", checkSession, addNewContact);
router.get("/contacts/mail", checkSession, findContactByEmail);
router.get("/contacts/log/users", checkSession, findContactByUser);


export default router;