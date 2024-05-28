// import mailJetLib from "node-mailjet";

// const publicAPIKey = "d53e2a9efadd421882157600e84a8e95";
// const secretAPIKey = "4ce1d79f9dcbfa58ffe5210ae37d084c";

// const mailJet = mailJetLib.apiConnect(publicAPIKey, secretAPIKey, {
//   config: {},
//   options: {},
// });

// export const mailTest = () => {
//   const request = mailJet.post("send", { version: "v3.1" }).request({
//     Messages: [
//       {
//         From: {
//           Email: "isaac.estrella24@compscihigh.org",
//           Name: "Isaac Estrella Secret Sauce",
//         },
//         To: [
//           {
//             Email: "mdmomencsh2028@gmail.com",
//             Name: "Safi Momen",
//           },
//         ],
//         Subject: "Your email flight plan!",
//         TextPart:
//           "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
//         HTMLPart:
//           '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
//       },
//     ],
//   });

//   request
//     .then((result) => {
//       console.log(result.body);
//     })
//     .catch((err) => {
//       console.log(err.statusCode);
//     });
// };
