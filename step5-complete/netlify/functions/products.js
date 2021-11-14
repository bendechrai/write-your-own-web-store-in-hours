const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
  // Stripe doesn't give you a list of products with prices,
  // so we'll get all prices with their products. This means
  // products might appear in the results multiple times if
  // they have multiple prices.
  //
  // See Stripe docs: https://stripe.com/docs/api/prices/list
  const prices = await stripe.prices.list({
    expand: ["data.product"],
  });

  // Let's transform the prices with products
  //        to a list of products with prices
  products = [];
  prices.data.map((price) => {
    // Separate product object from price object
    product = price.product;
    delete price.product;

    // Is the product active?
    if (product.active) {
      // Can we find the product in the array already?
      if ((existingProduct = products.find((p) => p.id === product.id))) {
        // YES - add the new price to the existing item
        existingProduct.prices.push(price);
      } else {
        // NO - create new object and add to array
        products.push({ ...product, prices: [price] });
      }
    }
  });

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
};
