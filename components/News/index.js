// import React, { useEffect, useState } from "react";
// import NewsSpecific from "./retrieve";

// const Index = () => {
//   const [articles, setArticles] = useState([]);

//   useEffect(() => {
//     NewsSpecific().then(articles => setArticles(articles));
//   }, []);

//   return (
//     <div>
//       <h1>Article Titles</h1>
//       <ul>
//         {articles.map(article => (
//           <li key={article.title}>
//             {article.title}
//             <br />
//             <br />
//             {article.extract}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Index;