# Write Your Own Web Store In Hours

![spacer](workshop-assets/readme-images/spacer.png)

## Connecting the Buy Now button to a Stripe Checkout

Stripe Checkout creates a secure, Stripe-hosted payment page that lets you collect payments quickly. In this step, we'll create a lambda function that checks the user's Access Token, preps Stripe for this checkout, and wires up the React method to handle the button click.

![spacer](workshop-assets/readme-images/spacer.png)

## Create a Protected Netlify Function

👉💻👈 Install an NPM module that provides JWT verification for Netlify functions.

```
npm install @serverless-jwt/netlify
```

👉💻👈 Create `/netlify/functions/buy.js`

```
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
});

exports.handler = verifyJwt(async function(event, context) {

    // Get Stripe Customer ID from Access Token
    const stripeCustomerId = context.identityContext.claims['http://localhost:8888/stripe_customer_id'];

    // Decode the payload
    const payload = JSON.parse(event.body)

    // Chreate a new Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:8888/success',
        cancel_url: 'http://localhost:8888/',
        payment_method_types: ['card'],
        customer: stripeCustomerId,
        line_items: [
            {
                price: payload.priceId,
                quantity: 1
            },
        ],
        mode: 'payment',
    });

    return {
        statusCode: 200,
        body: JSON.stringify(session)
    }

})
```

👉💻👈 Add the two new environment variables to `/.env`

```
AUTH0_ISSUER=https://xxxxxxxxxx.us.auth0.com/
AUTH0_AUDIENCE=http://localhost:8888
```

❗ NOTE: Make sure you have a trailing slash for `AUTH0_ISSUER`!

👉💻👈 Restart `netlify dev` in order to load in the environment varliables and register the new function.

![spacer](workshop-assets/readme-images/spacer.png)

## Wire Up The UI

👉💻👈 Update the `buy()` method in `/src/pages/home.js`, and also retrieve the `getAccessTokenSilently` method from the useAuth0 hook:

```
    const {isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently} = useAuth0();

    const buy = async () => {

        // We need an access token for our API to get the
        // Stripe Customer ID from
        const access_token = await getAccessTokenSilently()

        // Call the API endpoint, passing in the access token
        // as a header, and the Price ID as the payload
        fetch('/.netlify/functions/buy',
            {
                method: 'POST',
                headers: {
                    authorization: `Bearer ${access_token}`
                },
                body: JSON.stringify({
                    "priceId": product.prices[0].id
                })
            })
        .then(res => res.json())
        .then(json => {
            // The response is a checkout session object,
            // which has a `url` attribute which we simply
            // redirect the user to
            window.location.assign(json.url)
        })
    }
```
