import { Router } from "express";
import { createPost, updatePost, fetchPost, findPost, deletePost, searchPost } from "../Controller/postController.js";

const router = Router()

router.post("/", createPost)
router.put("/:id", updatePost)
router.get("/", fetchPost)
router.get("/search", searchPost)
router.get("/:id", findPost)
router.delete("/:id", deletePost)

export default router