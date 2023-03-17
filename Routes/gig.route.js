import express from "express";
import {deleteUser} from '../Controllers/user.controller.js'

const router = express.Router();

router.get("/test",deleteUser)
export default router;
