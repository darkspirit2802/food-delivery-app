import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { manageShop } from "../controllers/shop.controllers.js";


const shopRouter = express.Router();

shopRouter.get("/manageShop", isAuth, manageShop);
export default shopRouter;
