const Cart = require("../db/cart");

// async function addToCart(userId, productId, quantity) {
//   let product = Cart.findOne({ userId: userId, productId: productId });
//   if (product) {
//     await Cart.findOneAndUpdate(product.id, {
//       quantity: product.quantity + quantity,
//     });
//   } else {
//     product = new Cart({
//       userId: userId,
//       productId: productId,
//       quantity: quantity,
//     });
//     await product.save();
//   }
// }
async function addToCart(userId, productId, quantity) {
  let product = await Cart.findOne({ userId: userId, productId: productId });

  if (product) {
    if(product.quantity + quantity == 0){
await removeFromCart(userId, productId)
    }else{
      await Cart.findOneAndUpdate(
        { _id: product._id },
        { $inc: { quantity: quantity } }
      );
    }
  
  } else {
    const newProduct = new Cart({
      userId: userId,
      productId: productId,
      quantity: quantity,
    });
    await newProduct.save();
  }
}

async function removeFromCart(userId, productId) {
  await Cart.findOneAndDelete({ userId: userId, productId: productId });
}

async function getCart(userId) {
  const products = await Cart.find({ userId: userId }).populate("productId");
  return products.map((x) => {
    return { quantity: x.quantity, product: x.productId };
  });
}


async function clearCart(userId){
  await Cart.deleteMany({
    userId:userId,
  })
}

module.exports = { getCart, addToCart, removeFromCart , clearCart};
