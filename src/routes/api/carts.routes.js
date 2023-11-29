import { Router } from 'express';
import { createCart, getCart, cartUpdater, cartCleaner, addProductToCart, deleteProductFromCart, incrementProduct } from '../../controller/cart.controller.js';
import { postTicket } from '../../controller/ticket.controller.js';
import { userValidator }from "../../middlewares/auth.middleware.js"

export const router = Router();

router.post("/", createCart)

router.get("/:cid", getCart)

router.put("/:cid", cartUpdater)

router.delete("/:cid", cartCleaner)

router.post("/:cid/product/:pid", userValidator,addProductToCart)

router.delete("/:cid/product/:pid",userValidator, deleteProductFromCart)

router.put("/:cid/product/:pid", incrementProduct)

router.post("/:cid/purchase", postTicket)