// import { Client, SendEmailV3_1, LibraryResponse } from "node-mailjet";

// const publicAPIKey = "d53e2a9efadd421882157600e84a8e95";
// const secretAPIKey = "4ce1d79f9dcbfa58ffe5210ae37d084c";

// const mailjet = new Client({
//   apiKey: publicAPIKey,
//   apiSecret: secretAPIKey,
// });

// export const mailTest = async () => {
//   const data: SendEmailV3_1.Body = {
//     Messages: [
//       {
//         From: {
//           Email: "pilot@test.com",
//         },
//         To: [
//           {
//             Email: "passenger@test.com",
//           },
//         ],
//         TemplateErrorReporting: {
//           Email: "reporter@test.com",
//           Name: "Reporter",
//         },
//         Subject: "Your email flight plan!",
//         HTMLPart:
//           "<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
//         TextPart:
//           "Dear passenger, welcome to Mailjet! May the delivery force be with you!",
//       },
//     ],
//   };

//   const result: LibraryResponse<SendEmailV3_1.Response> = await mailjet
//     .post("send", { version: "v3.1" })
//     .request(data);

//   const { Status } = result.body.Messages[0];
//   console.log(Status);
// };
