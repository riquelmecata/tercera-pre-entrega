import { Router } from 'express';
import { getProducts, getOneProductById, createProduct, productDeleter, productUpdater } from "../../controller/product.controller.js"
import { adminValidator } from "../../middlewares/auth.middleware.js"

// Importar todos los routers;
export const router = Router();

router.get("/",getProducts)

// Endpoint para traer el producto solicitado by id en el params
router.get("/:pid", getOneProductById)

router.post("/",adminValidator,createProduct)

router.put("/:pid",adminValidator,productUpdater)

router.delete("/:pid",adminValidator, productDeleter)