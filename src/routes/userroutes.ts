import express from "express";
import {Router} from "express";
import * as Users from "../controllers/usersController";
const router = Router();
router.post("/signup", Users.createUser);
router.post("/login", Users.loginUser);

export default router;