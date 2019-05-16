const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLFloat } = graphql;

const Product = mongoose.model("products");

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  // remember we wrap the fields in a thunk to avoid circular dependency issues
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    weight: { type: GraphQLFloat },
    category: {
      type: require("./category_type"),
      resolver(parentValue) {
        return Product.findById(parentValue._id)
          .populate("category")
          .then(product => {
            return product.category;
          });
      }
    }
  })
});

module.exports = ProductType;