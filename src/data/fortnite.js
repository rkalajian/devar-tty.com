// required packages
const axios = require("axios");
const { EntryPlugin } = require("webpack");


// Config
const url = "https://fortnite-api.com/v2/shop/br/combined";


async function requestPosts() {
  try {
    const response = await axios.get(url);
    return {
      data: response.data,
    };
  } catch (err) {
    console.error("API not responding, no data returned");
    return {
      total: 0,
      data: [],
    };
  }
}

async function getAllItems() {
  var fndata = new Object();
  console.log("Fortnite Shop Items from API");
  const request = await requestPosts();
  console.log(request);

  fndata.date = request.data.data.date;
  fndata.dailyData = request.data.data.daily.entries;
  fndata.featuredData = request.data.data.featured.entries;

  return fndata;
}

// export for 11ty
module.exports = getAllItems;