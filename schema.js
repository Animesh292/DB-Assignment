// Creating a connection to mongoDB database
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/products")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("Error", err);
  });

//Creating Schemas using mongoose for products, product_categories, product_inventory and discount
const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String, //VARCHAR
    },
    desc: {
      type: String, //text
    },
    SKU: {
      type: String, //VARCHAR
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId, //references product_category table or collection
      ref: "Category",
    },
    inventory_id: {
      type: mongoose.Schema.Types.ObjectId, //references inventory table or collection
      ref: "Inventory",
    },
    price: {
      type: Number,
    },
    discount_id: {
      type: mongoose.Schema.Types.ObjectId, //references discount table or collecitons
      ref: "Discount",
    },
  },
  { timestamps: true }
);

// product categories Schema
const productsCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String, //varchar
    },
    desc: {
      type: String, //text
    },
  },
  { timestamps: true }
);

//Product Inventory Schema
const productInventorySchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

//discount Schema
const discountSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    desc: {
      type: String,
    },
    discount_percent: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

// Creating models
const Product = mongoose.model("product", productsSchema);
const Category = mongoose.model("category", productsCategoriesSchema);
const Inventory = mongoose.model("inventory", productInventorySchema);
const Discount = mongoose.model("discount", discountSchema);

// A Typical example of such Product, I have already inserted values to categories, inventory, and discount for simplicity.

async function createProduct() {
  //an asynchrounous function because we have to wait until promise is returned
  try {
    // Find the category with name "Electronics"
    const category = await Category.findOne({ name: "Electronics" });
    // Find the inventory with quantity 10
    const inventory = await Inventory.findOne({ quantity: 10 });
    // Find the discount with discount percent 10.2
    const discount = await Discount.findOne({ discount_percent: 10.2 });

    // Create the product object using the found documents
    const exampleProduct = new Product({
      name: "Refrigerator",
      desc: "An example of product Refrigerator",
      SKU: "ABC123",
      category_id: category ? category._id : null,
      inventory_id: inventory ? inventory._id : null,
      price: 500,
      discount_id: discount ? discount._id : null,
    });

    // Save the product to the database
    const savedProduct = await exampleProduct.save();
    console.log("Example product saved successfully:", savedProduct);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Call the function to create the product
createProduct();
