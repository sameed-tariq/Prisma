import { Router } from "express";
import { createComment, updateComment, fetchComment, findComment, deleteComment } from "../Controller/commentController.js";

const router = Router()

router.post("/", createComment)
router.put("/:id", updateComment)
router.get("/", fetchComment)
router.get("/:id", findComment)
router.delete("/:id", deleteComment)

export default router