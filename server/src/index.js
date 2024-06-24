const Express = require("express");
const Cors = require("cors");
const axios = require("axios");

const app = Express(); // Create an Express app

//Middleware to allow cross-origin requests between the client and server
app.use(Express.json());
app.use(Cors()); // Enable CORS

//All currencies
app.get("/getAllCurrencies", async (req, res) => {
  const namesURL = `https://openexchangerates.org/api/currencies.json?app_id=8efd59fd015640b4971f5bafa1e2f029`;
  try {
    const namesResponse = await axios.get(namesURL);
    const nameData = namesResponse.data; // Get the data from the response

    return res.json(nameData);
  } catch (err) {
    console.log(err);
  }
});

//get the target amount
app.get("/convert", async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } =
    req.query;
  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=8efd59fd015640b4971f5bafa1e2f029`;

    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates; // Get the rates from the response

    //rates
    const sourceRate = rates[sourceCurrency]; // Get the rate of the source currency
    const targetRate = rates[targetCurrency]; // Get the rate of the target currency

    //final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;

    return res.json({ targetAmount }); // Return the target amount with 2 decimal places
  } catch (err) {
    console.error(err);
  }
});

//Listen to a port
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
