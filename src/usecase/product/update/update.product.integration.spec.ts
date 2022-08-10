import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe("Test update product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
	const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);

	const product = new Product("123", "Product A", 100);
    await productRepository.create(product);

    const input = {
	  id: "123",
      name: "Product A Updated",
      price: 50,
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(input);
  });
});
