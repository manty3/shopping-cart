var ObjectId = require("mongodb").ObjectId;
const db = require("../config/connection");
const collection = require("../config/collections");

module.exports = {
  addProduct: (product, callback) => {
    db.get()
      .collection("product")
      .insertOne(product)
      .then((data) => {
        //  console.log(data)
        callback(data.insertedId.toString());
      });
  },

  // getAllProducts: () => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       let products = await db
  //         .get()
  //         .collection(collection.PRODUCT_COLLECTION)
  //         .find()
  //         .toArray();

  //       console.log("Database Object:", db.get());
  //       resolve(products);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const database = db.get(); // Get the database object
        if (!database) throw new Error("Database not connected");

        let products = await database
          .collection(collection.PRODUCT_COLLECTION)
          .find()
          .toArray();
        resolve(products);
      } catch (err) {
        reject(err);
      }
    });
  },

  deleteProduct: (proId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .deleteOne({ _id: new ObjectId(proId) })
        .then((response) => {
          resolve(response);
        });
    });
  },
  getProductDetails: (prodId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .findOne({ _id: new ObjectId(prodId) })
        .then((product) => {
          if (!product) {
            reject(new Error("Product not found"));
          } else {
            resolve(product);
          }
        });
    });
  },
  updateProduct: (prodId, proDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collection.PRODUCT_COLLECTION)
        .updateOne(
          { _id: new ObjectId(prodId) },
          {
            $set: {
              Name: proDetails.Name,
              category: proDetails.category,
              Price: proDetails.Price,
              description: proDetails.description,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
};
