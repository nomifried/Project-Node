import { Router } from "express";

import { addOrder, getAllOrders, getorderUsertId, updateOrderDispatched, deleteOrder } from "../controllers/Order.js";

const routerOrder = Router();
routerOrder.get("/", getAllOrders)
routerOrder.get("/user/:userId", getorderUsertId)
routerOrder.put("/:id", updateOrderDispatched)
routerOrder.post("/", addOrder)
routerOrder.delete("/:id", deleteOrder)
export default routerOrder;