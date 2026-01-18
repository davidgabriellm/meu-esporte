import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import Payment from "../models/Payment.js";
import Address from "../models/Address.js";
import Product from "../models/Product.js";
import { Sequelize } from "sequelize";
import * as Yup from "yup";

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      address_id: Yup.string()
        .uuid("address_id deve ser um UUID válido")
        .required("address_id é obrigatório"),

      total: Yup.number()
        .positive("total deve ser maior que zero")
        .required("total é obrigatório"),

      payment_method: Yup.string()
        .oneOf(["credit_card", "pix", "boleto", "stripe"], "Método de pagamento inválido")
        .required("payment_method é obrigatório"),

      items: Yup.array()
        .of(
          Yup.object().shape({
            product_id: Yup.string()
              .uuid("product_id deve ser um UUID válido")
              .required("product_id é obrigatório"),

            quantity: Yup.number()
              .integer("quantity deve ser um inteiro")
              .min(1, "quantity deve ser no mínimo 1")
              .required("quantity é obrigatória"),

            price: Yup.number()
              .positive("price deve ser maior que zero")
              .required("price é obrigatório"),
          })
        )
        .min(1, "Pedido deve ter pelo menos um item")
        .required("items é obrigatório"),
    });

     try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(400).json({
        error: "Validation fails",
        messages: err.inner.map((e) => ({
          field: e.path,
          message: e.message,
        })),
      });
    }

    const { items, total, address_id, payment_method } = req.body;

    const order = await Order.create({
      user_id: req.user_id,
      address_id,
      total,
      status: "pending",
    });

    const orderItems = await Promise.all(
      items.map((item) =>
        OrderItem.create({
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })
      )
    );

    const payment = await Payment.create({
      order_id: order.id,
      method: payment_method,
      amount: total,
      status: "pending",
    });

    return res.status(201).json({ order, items: orderItems, payment });
  }

  async index(req, res) {
    try {
      const orders = await Order.findAll({
        where: { user_id: req.user_id },
        order: [["created_at", "DESC"]],
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "image_url", "price"],
              },
            ],
          },
          {
            model: Address,
            as: "address",
          },
          {
            model: Payment,
            as: "payment",
          },
        ],
      });

      return res.json(orders);
    } catch (err) {
      console.error("🔥 ERRO REAL DO SEQUELIZE:");
      console.error(err?.original || err);
      return res.status(500).json({
        error: "Erro ao buscar pedidos",
        details: err?.original?.message || err.message,
      });
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id, user_id: req.user_id },
      include: [
        {
          model: OrderItem,
          as: "items", // <--- FALTAVA ISSO NO SEU CÓDIGO ANTERIOR
          include: [{ model: Product, as: "product" }],
        },
        {
          model: Payment,
          as: "payment", // <--- FALTAVA ISSO
        },
        {
          model: Address,
          as: "address", // <--- FALTAVA ISSO
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    return res.json(order);
  }
}

export default new OrderController();
