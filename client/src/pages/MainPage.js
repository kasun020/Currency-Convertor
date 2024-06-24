import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MainPage() {
  //states for the form
  const [date, setDate] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const [amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const [currencyNames, setCurrencyNames] = useState({}); //state to store all currency names as an array
  const [loading, setLoading] = useState(true); //state to check if the data is loading or not

  //function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); //preventdefault to stop the form from reloading the page
    try {
      const responce = await axios.get("http://localhost:5000/convert", {
        params: {
          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },
      });

      setAmountInTargetCurrency(responce.data.targetAmount.toFixed(2));
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  //get all currency names
  useEffect(() => {
    const getCurrencyNames = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:5000/getAllCurrencies"
        );
        setCurrencyNames(responce.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCurrencyNames();
  }, []);

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-green-500">
        Convert your currency
      </h1>
      <p className="lg:mx-32 opacity-40 py-6 ">
        provide accurate and real-time currency conversion for travelers,
        businesses, and anyone dealing with multiple currencies. With a sleek
        and responsive interface, users can easily select their desired
        currencies and enter the amount they wish to convert. The app leverages
        up-to-date exchange rates sourced from reliable financial data
        providers, ensuring precise conversions at any given time.
      </p>
      <div className="mt-5 flex items-center justify-center flex-col">
        <section className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="mb-5">
                <label
                  htmlFor={date} // use htmlFor instead of for
                  className="block mb-2 text-sm font-medium
                   text-gray-900 dark:text-white" // use className instead of class
                >
                  Date
                </label>
                <input
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  type="date"
                  id={date} // id should be a string
                  name="date"
                  className="bg-gray-50 border
                   border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-green
                    -500 focus:border-green
                    -500 block w-full
                     p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-green
                       -500 dark:focus:border-green
                       -500" // use className instead of class
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-5">
                <label
                  htmlFor={sourceCurrency} // use htmlFor instead of for
                  className="block mb-2 text-sm font-medium
                   text-gray-900 dark:text-white" // use className instead of class
                >
                  Source currency
                </label>

                <select
                  onChange={(e) => {
                    setSourceCurrency(e.target.value);
                  }}
                  name="sourceCurrency" // name should be a string
                  id="sourceCurrency" // id should be a string
                  value={sourceCurrency}
                  className="bg-gray-50 border
                   border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-green
                    -500 focus:border-green
                    -500 block w-full
                     p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-green
                       -500 dark:focus:border-green
                       -500" // use className instead of class
                  placeholder="Select source currency"
                  required
                >
                  <option value="">Select source currency</option>
                  {/* loop through the currency names and display them as options */}
                  {Object.keys(currencyNames).map((currency) => (
                    <option className="p-1" key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-5">
                <label
                  htmlFor={targetCurrency} // use htmlFor instead of for
                  className="block mb-2 text-sm font-medium
                   text-gray-900 dark:text-white" // use className instead of class
                >
                  Target currency
                </label>

                <select
                  onChange={(e) => {
                    setTargetCurrency(e.target.value);
                  }}
                  name="targetCurrency" // name should be a string
                  id="targetCurrency" // id should be a string
                  value={targetCurrency}
                  className="bg-gray-50 border
                   border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-green
                    -500 focus:border-green
                    -500 block w-full
                     p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-green
                       -500 dark:focus:border-green
                       -500" // use className instead of class
                  placeholder="Select target currency"
                  required
                >
                  <option value="">Select target currency</option>
                  {/* loop through the currency names and display them as options */}
                  {Object.keys(currencyNames).map((currency) => (
                    <option className="p-1" key={currency} value={currency}>
                      {currencyNames[currency]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <div className="mb-5">
                <label
                  htmlFor={amountInSourceCurrency} // use htmlFor instead of for
                  className="block mb-2 text-sm font-medium
                   text-gray-900 dark:text-white" // use className instead of class
                >
                  Amount in source currency
                </label>
                <input
                  onChange={(e) => {
                    //this function will be called when the input value changes
                    setAmountInSourceCurrency(e.target.value);
                  }}
                  type="number"
                  id="amountInSourceCurrency" // id should be a string
                  name="amountInSourceCurrency" // name should be a string
                  className="bg-gray-50 border
                   border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-green
                    -500 focus:border-green
                    -500 block w-full
                     p-2.5 dark:bg-gray-700 dark:border-gray-600
                      dark:placeholder-gray-400 dark:text-white
                       dark:focus:ring-green
                       -500 dark:focus:border-green
                       -500" // use className instead of class
                  placeholder="Amount in source currency"
                  required
                />
              </div>
            </div>
            <button
              className="bg-green-600
             hover:bg-green-800
              text-white 
              font-bold py-2 px-4
              rounded-md" // use className instead of class
            >
              Get the Target currency
            </button>
          </form>
        </section>
      </div>
      {!loading ? (
        <section className="lg:mx-60 mt-5">
          {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to{" "}
          <span className="text-green-500">{amountInTargetCurrency}</span>{" "}
          {currencyNames[targetCurrency]}
        </section>
      ) : null}
    </div>
  );
}
