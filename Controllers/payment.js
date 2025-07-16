const jwt = require('jsonwebtoken'); // Import the jsonwebtoken library
const PayPalOrder = require('../Models/PayPalOrder');
const client_id = "AcbZfLMOatDo0kT1k3isgHk6i9ckW6QEG-X-Ak6ZdkLrHn-LjW7rDSK4MeJ1BUj8w9I8wqvZzuyPlZmi";
const client_secret = "EM5CYSPGQdkO7N30H6nCU3bjA5_EjPd0sJB82DDY7SWfXI5XdvkWATZCzdPjihN1qZEyXpt5cnZ98rUt";
const endpoint_url = "https://api-m.sandbox.paypal.com";
const stripe = require("stripe")("sk_test_51OAQ1hSAE0mbmhcBcOkNZfotYprTRd2cwsAJA0jZ5U0qFxNyAskbBhiPn09q3BpVx5YFL5XHU7enksXlporsyR1800cNt5KiZb");
const uuid = require("uuid").v4;

const get_access_token = async () => {
  const auth = `${client_id}:${client_secret}`;
  const data = 'grant_type=client_credentials';
  const response = await fetch(endpoint_url + '/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(auth).toString('base64')}`
    },
    body: data
  })
    .then(res => res.json());

  const access_token = response.access_token;

  // Decode the access token to extract claims
  const decodedToken = jwt.decode(access_token);

  console.log('Access Token:', access_token);
  console.log('Decoded Token:', decodedToken);

  return access_token;
}

module.exports.createOrder = async (req) => {

  const access_token = await get_access_token();

  let order_data_json = {
    'intent': 'CAPTURE',
    'purchase_units': [{
      'amount': {
        "currency_code": "USD",
        "value": req.body.cart.price
      }
    }]
  };

  console.log('AccessToken is:', access_token);
  const data = JSON.stringify(order_data_json);
  // console.log(data);

  const orderResponse = await fetch(endpoint_url + '/v2/checkout/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
    body: data
  });
  if (!orderResponse) {
    throw new Error("Error in OrderResponse");
  }
  const orderData = await orderResponse.json();
  console.log(orderData);
    return orderData;
}

module.exports.captureOrder = async (orderId, res) => {
  const access_token = await get_access_token();
  const url = endpoint_url + '/v2/checkout/orders/' + orderId + '/capture';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access_token}`,
    },
  })
  console.log("payment successfull!");
  return response.json();
}

module.exports.stripePay = async (req, res) => {
  let status;
  try {
    console.log("Request", req.body)
    const { product, token } = req.body;

    const customer = await stripe.customer({
      email: token.email,
      source: token.id,
    });

    const key = uuid();

    const charge = await stripe.charges.create({
      amount: product.price * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      description: `purchase the ${product.name}`,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    },
      {
        key
      });

    console.log("Charge", { charge });
    status = "Success";
  } catch (error) {
    console.log(error)
    status = "failure";
    res.json({ error, status });
  }
}

