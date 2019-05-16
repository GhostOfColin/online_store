require("../models/index");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLID, GraphQLFloat } = graphql;
const mongoose = require("mongoose");

const CategoryType = require('./types/category_type');
const ProductType = require("./types/product_type");
const UserType = require("./types/user_type");

const User = mongoose.model("users");
const Product = mongoose.model("products");
const Category = mongoose.model("categories");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    newCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString }
      },
      resolve(_, { name }) {
        return new Category({ name }).save();
      }
    },
    deleteCategory: {
      type: CategoryType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Category.remove({ _id });
      }
    },
    newProduct: {
      type: ProductType,
      args: {
        name: { type: GraphQLString }, 
        category: { type: GraphQLString },
        description: { type: GraphQLString },
        weight: { type: GraphQLFloat }
      },
      resolve(_, { name, category, description, weight }) {
        return new Product({ name, category, description, weight }).save();
      }
    },
    deleteProduct: {
      type: ProductType,
      args: { _id: { type: GraphQLID } },
      resolve(_, { _id }) {
        return Product.remove({ _id });
      }
    },
    updateProductCategory: {
      type: ProductType,
      args: {
        productId: { type: GraphQLID },
        categoryId: { type: GraphQLID }
      },
      resolve(_, { productId, categoryId }) {
        return Product.updateProductCategory(productId, categoryId);
      }
    },
  }
});

module.exports = mutation;