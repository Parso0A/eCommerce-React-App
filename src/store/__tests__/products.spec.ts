import {
  createProduct,
  getProductsByArrival,
  getProductsBySale,
} from "../products";
import configureStore from "../storeConfiguration";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { Product } from "../../global/models/product/product";

describe("ProductsSlice", () => {
  let fakeAxios: MockAdapter;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  describe("Main Page Products", () => {
    const productsArray: Array<Product> = [
      {
        _id: "test",
        category: { name: "testCategory", _id: "testCat" },
        description: "Test Product",
        name: "TestProduct1",
        photo: {},
        price: 69,
        quantity: 12,
        shipping: true,
        sold: 0,
      },
      {
        _id: "test2",
        category: { name: "testCategory", _id: "testCat" },
        description: "Test Product",
        name: "SampleProduct2",
        photo: {},
        price: 69,
        quantity: 12,
        shipping: true,
        sold: 0,
      },
    ];

    describe("Products by sale", () => {
      const productsBySale = (): Array<Product> =>
        store.getState().entities.products.bySale;

      it("should load products from the server", async () => {
        fakeAxios
          .onGet("/products?sortBy=sell&order=desc&limit=6")
          .reply(200, productsArray);

        await store.dispatch(getProductsBySale());
        expect(productsBySale()).toHaveLength(2);
      });

      it("should not have any products if the server is failing", async () => {
        fakeAxios.onGet("/products?sortBy=sell&order=desc&limit=6").reply(500);

        await store.dispatch(getProductsBySale());
        expect(productsBySale()).toHaveLength(0);
      });
    });

    describe("Products by arrival", () => {
      const productsByArrival = (): Array<Product> =>
        store.getState().entities.products.byArrival;

      it("should load products from the server", async () => {
        fakeAxios
          .onGet("/products?sortBy=createdAt&order=desc&limit=6")
          .reply(200, productsArray);

        await store.dispatch(getProductsByArrival());
        expect(productsByArrival()).toHaveLength(2);
      });

      it("should not have any products if the server is failing", async () => {
        fakeAxios
          .onGet("/products?sortBy=createdAt&order=desc&limit=6")
          .reply(500);

        await store.dispatch(getProductsByArrival());
        expect(productsByArrival()).toHaveLength(0);
      });
    });
  });

  describe("Create Product", () => {
    const productsList = (): Array<Product> =>
      store.getState().entities.products.list;

    const productToAdd = {
      name: "NewProduct",
      description: "Newer Product",
      price: 69,
      category: "Category1",
      shipping: false,
      quantity: 2,
      image: {},
    };

    let formData = new FormData();

    for (const key in productToAdd) {
      formData.set(key, productToAdd[key]);
    }

    const fakeUserId = "User1";

    it("Should create a product", async () => {
      fakeAxios.onPost(`/product/create/${fakeUserId}`).reply(200, {
        ...productToAdd,
        category: { name: "Category1", _id: "Category1" },
      });

      await store.dispatch(createProduct(formData, fakeUserId));

      expect(productsList()).toHaveLength(1);
    });

    it("Should not create a product if the server did not respond", async () => {
      fakeAxios.onPost(`/product/create/${fakeUserId}`).reply(500);

      await store.dispatch(createProduct(formData, fakeUserId));

      expect(productsList()).toHaveLength(0);
    });
  });
});
