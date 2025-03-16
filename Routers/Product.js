import { Router } from "express";

import {add, deleteById, update, getAllrPoducts, getById, updateStock} from "../controllers/Product.js"
const productRouter = Router()
productRouter.get("/",getAllrPoducts)
productRouter.get("/:id",getById)
productRouter.delete("/:id",deleteById)
productRouter.post("/",add)
productRouter.put("/:id",update)
// productRouter.put("/update/stock/:id", updateStock)

export default productRouter;