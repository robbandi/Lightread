// // Import the Aylien News API client and authentication classes
// import { ApiClient, DefaultApi, app_id, app_key } from "aylien-news-api";

// // Define the 'NewsSpecific' function
// const NewsSpecific = () => {
//   // Define an array to store the article titles and extracts
//   const articles = [];

//   let NEWSAPI_APP_ID='9fb60ebd'
//   let NEWSAPI_APP_KEY='c032e76fc1ca8cb74f9021576cb5d122'

//   // Check if the API credentials are available
//   if (process.env && process.env.NEWSAPI_APP_ID && process.env.NEWSAPI_APP_KEY) {
//     // Configure the API client with your API credentials
//     const defaultClient = ApiClient.instance;
//     defaultClient.authentications["app_id"].apiKey = NEWSAPI_APP_ID;
//     defaultClient.authentications["app_key"].apiKey = NEWSAPI_APP_KEY;
//   }

//   // Create an instance of the Aylien News API client
//   const api = new DefaultApi();

//   // Define the search parameters
//   const opts = {
//     title: "startup",
//     publishedAtStart: "NOW-7DAYS",
//     publishedAtEnd: "NOW"
//   };

//   // Return a promise that will be resolved with the array of articles
//   return new Promise((resolve, reject) => {
//     // Define a callback function to handle the API response
//     const callback = (error, data, response) => {
//         if (error) {
//           // Reject the promise if an error occurs
//           reject(error);
//         } else {
//           // Loop through the articles in the response
//           for (let i = 0; i < data.stories.length; i++) {
//             // Add the title and extract of the current article to the array of articles
//             articles.push({
//               title: data.stories[i].title,
//               extract: data.stories[i].body
//             });
//           }

//           // Resolve the promise with the array of articles
//           resolve(articles);
//         }
//       };

//     // Call the Aylien News API to search for articles
//     api.listStories(opts, callback);
//     console.log(    api.listStories(opts, callback)    )
//   });
// };

// // Export the 'NewsSpecific' function
// export default NewsSpecific;