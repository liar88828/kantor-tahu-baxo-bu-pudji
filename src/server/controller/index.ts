import TrolleyRepository from "@/server/repository/trolley.repo";
import TrolleyController from "@/server/controller/trolley.controller";
import ProductRepository from "@/server/repository/product.repo";
import ProductController from "@/server/controller/product.controller";
import OrderRepository from "@/server/repository/orderan.repo";
import OrderController from "@/server/controller/order.controller";
import {PaymentRepository} from "@/server/repository/payment.repo";
import PaymentController from "@/server/controller/payment.controller";
import TableController from "@/server/controller/table.controller";

export const trolleyController = new TrolleyController(new TrolleyRepository())
export const productController = new ProductController(new ProductRepository())
export const orderController = new OrderController(new OrderRepository())
export const paymentController = new PaymentController(new PaymentRepository())
export const tableController = new TableController(new OrderRepository())