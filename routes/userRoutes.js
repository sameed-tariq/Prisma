import { Router } from "express";
import { createUser, updateUser, fetchUser, findUser, deleteUser } from "../Controller/userController.js";

const router = Router()

router.post("/", createUser)
router.put("/:id", updateUser)
router.get("/", fetchUser)
router.get("/:id", findUser)
router.delete("/:id", deleteUser)

export default router