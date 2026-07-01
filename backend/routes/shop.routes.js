import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { getMyShop, manageShop } from "../controllers/shop.controllers.js";
import upload from "../middlewares/multer.js";


const shopRouter = express.Router();

shopRouter.post("/manageShop", isAuth,upload.single("image"), manageShop);
shopRouter.get("/getShop", isAuth, getMyShop);
export default shopRouter;
