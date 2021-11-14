const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
});

exports.handler = verifyJwt(async function (event, context) {
  // Get Stripe Customer ID from Access Token
  const stripeCustomerId = context.identityContext.claims["https://8888-foo-bar-00000000.ws-usXX.gitpod.io/stripe_customer_id"];

  // Decode the payload
  const payload = JSON.parse(event.body);

  // Create a new Stripe Checkout Session
  //
  // See Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: "https://8888-foo-bar-00000000.ws-usXX.gitpod.io/success",
    cancel_url: "https://8888-foo-bar-00000000.ws-usXX.gitpod.io/",
    payment_method_types: ["card"],
    customer: stripeCustomerId,
    line_items: [
      {
        price: payload.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
});
