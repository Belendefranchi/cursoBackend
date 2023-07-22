import { Router } from "express";
import ProductManager from "../dao/dbManagers/products.manager.js";
import { productModel } from "../dao/dbManagers/models/products.model.js";
import { getProducts, getProductsById, saveProduct } from "../controllers/products.controller.js";

const router = Router();

const manager = new ProductManager();

router.get("/", getProducts);
router.get("/:pid", getProductsById);
router.get("/", saveProduct);

/* router.get("/", async (req, res) => {
  const { limit, page, role, name, email, age, cartId } = req.query;

  res.cookie('cart', cartId);

  console.log(`Products.router: cart, ${cartId}`);

  try {
    //const { products } = await manager.getAll();
    if (limit) {
      const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
        await productModel.paginate(
          {},
          {
            limit,
            page,
            lean: true,
          }
        );

      res.render("products", {
        payload: docs,
        role,
        name,
        email,
        age,
        cartId,
        limit,
        page,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      });
      console.log(`Products.router: role, ${role}`);
      //res.send({ status: 'success', payload: result });
    } else {
      const { docs, totalPages, hasPrevPage, hasNextPage, nextPage, prevPage } =
        await productModel.paginate(
          {},
          {
            limit: 10,
            page,
            lean: true,
          }
        );

      res.render("products", {
        payload: docs,
        role,
        name,
        email,
        age,
        cartId,
        limit,
        page,
        totalPages,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  try {
    const result = await manager.getProductsById(pid);
    console.log(`Products.router: getProductById, ${result}`);
    res.render("productDetail", { payload: result });
    //res.send({ status: 'success', payload: result });
  } catch (error) {
    console.log(error);
  }
});

router.get("/update/:pid", async (req, res) => {
  const pid = req.params.pid;
  const result = await manager.getProductsById(pid);

  console.log(`Products.router: pid, ${pid}`);
  console.log(`Products.router: result, ${result}`);

  try {
    res.render("update", { payload: result });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  const {
    title,
    category,
    description,
    code,
    price,
    thumbnail,
    stock,
    status,
  } = req.body;

  const products = await manager.getAll();
  const codeExist = products.find((product) => product.code === code);

  //await manager.insertMany();

  if (codeExist) {
    console.log(`Ya existe un producto con el código: ${code}`);
    return res.send(
      "<script>alert('Ya existe un producto con ese código')</script>"
    );
  } else {
    if (
      !title ||
      !category ||
      !description ||
      !code ||
      !price ||
      !thumbnail ||
      !stock
    ) {
      console.log(`Missing fields`);
      return res.send(
        "<script>alert('Debe completar todos los campos')</script>"
      );
    } else {
      try {
        const result = await manager.insertOne({
          title,
          category,
          description,
          code,
          price,
          thumbnail,
          stock,
          status,
        });
        res.send({ status: "Success", payload: result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ status: "Error", error });
      }
    }
  }
});

router.put("/update/:pid", async (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  const {
    title,
    category,
    description,
    code,
    price,
    thumbnail,
    stock,
    status,
  } = req.body;

  if (
    !title ||
    !category ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !status
  ) {
    return res.status(400).send({ status: "Error", error: "Missing fields" });
  }

  try {
    const productToUpdate = await manager.updateOne(pid, {
      title,
      category,
      description,
      code,
      price,
      thumbnail,
      stock,
      status,
    });
    res.send({ status: "success", payload: productToUpdate });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/update/:pid", async (req, res) => {
  const { pid } = req.params;

  const deleteProduct = await manager.deleteOne(pid);
  res.send({ status: "success", payload: deleteProduct });
}); */

export default router;
