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

# Bonus Content: JWT Viewer

If you'd like to add a JWT viewer to this app, so you can see what's coming back from Auth0 in both the ID Token and the Access Token,

```javascript
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { decode } from "js-base64";

const Profile = () => {
  const { isLoading, user, getAccessTokenSilently } = useAuth0();
  const [accessToken, setAccessToken] = useState();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      const [header, payload, signature] = token.split(".");
      setAccessToken(JSON.parse(decode(payload)));
    });
  }, [setAccessToken]);

  if (!isLoading)
    return (
      <>
        <h2>ID Token</h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <h2>Access Token</h2>
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
      </>
    );

  return <p>Loading...</p>;
};

export default Profile;
```

You'll also need to:

```shell
npm i js-base64
```

---

_[⎌ Back to step 9: Starting a Stripe Checkout](./STEP-9-START-CHECKOUT.md)_
