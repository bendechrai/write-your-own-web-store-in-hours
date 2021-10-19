# Write Your Own Web Store In Hours

![spacer](workshop-assets/readme-images/spacer.png)

## 🧪 Time to try the whole thing!

- Just to be safe, restart `netlify dev` to make sure all the latest code and environment variables are pulled in.
- If you're still logged in to the web store, log out and back in to make sure you've got the latest access token.
- Click on a "Buy Now" button, and you should be redirected to the Stripe Payment page.
- Pay with the test credit card number `4242 4242 4242 4242` and any future expiry date and 3-digit CVC.

And you'll be redirected to the home page again. Now check the [list of successful payments](https://dashboard.stripe.com/test/payments?status%5B%5D=successful) in your Stripe dashboard, and you should see one just appeared!

![spacer](workshop-assets/readme-images/spacer.png)

![🎉 🎊 CONGRATS! YOU'VE CREATED YOUR OWN WEB STORE 🎉 🎊](workshop-assets/readme-images/congratulations.gif)

![spacer](workshop-assets/readme-images/spacer.png)

# 🕵️ What's missing?

This workshop has given you the basics to understand how to use Auth0 Actions to provide additional glue to connect your usres with other third-party systems, like Stripe. It is designed to give you a comprehension of the possibilities, but it not intended to be production ready code.

There are places where error handling could have been added. Just for example, when the `buy` endpoint is called, we don't handle issues where the access token doesn't contain a `stripe_customer_id`. Also, we're not locking API function calls to their expected HTTP Methods. There are many options for improving the resillience of this code, which I'll leave for you to discover.

![spacer](workshop-assets/readme-images/spacer.png)

---

_[⎌ Back to step 9: Starting a Stripe Checkout](./STEP-9-START-CHECKOUT.md)_
