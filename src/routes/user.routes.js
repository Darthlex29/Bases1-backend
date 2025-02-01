import { Router } from "express";
import { findAll, createUser, updateUser, deleteUser, findUserByEmail} from "../controllers/user.controller.js";
import { checkSession } from "../middlewares/session.middleware.js";

const router = Router();

router.get("/users", checkSession, findAll);

router.post("/users", createUser);

router.put("/users", updateUser);

router.delete("/users", deleteUser);

router.post("/users/mail", checkSession, findUserByEmail)

export default router;
