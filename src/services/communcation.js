// import axios from "axios";
// // import { getCookie } from "cookies-next";
// // import { toast } from "react-toastify";

// const nodeEnvironment = process.env.REACT_APP_NODE_ENV;
// const serverUrl = process.env.REACT_APP_NODE_URL;
// const tokenName = process.env.REACT_APP_TOKENNAME;

// export function getServerUrl() {
//     if (nodeEnvironment === "development") {
//         return serverUrl;
//     }

//     if (nodeEnvironment === "machine_IP") {
//         return serverUrl;
//     }

//     if (nodeEnvironment === "server") {
//         return serverUrl;
//     }

//     return serverUrl;
// }

// export const communication = {

//     //*******************lead Tab APIs*****************//
//     getDashboardValue: async function (searchString, page) {
//         try {
//             return axios.post(`${getServerUrl()}/lead/get-lead-list`, { searchString, page },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",// Authorization: `Bearer ${getCookie(tokenName)}`,
//                     },
//                 }
//             );
//         } catch (error) {
//             console.log(error);
//         }
//     },
//     // createLead: async function (dataToSend) {
//     //     try {
//     //         return axios.post(`${getServerUrl()}/lead/create-custom-fields`, dataToSend, {
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 // Authorization: `Bearer ${getCookie(tokenName)}`,
//     //             },
//     //         });
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // },
//     // getLeadDetailById: async function (id, controller) {
//     //     try {
//     //         return axios.post(
//     //             `${getServerUrl()}/lead/get-lead-by-id`,
//     //             { id },
//     //             {
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                     // Authorization: `Bearer ${getCookie(tokenName)}`,
//     //                 },
//     //                 signal: controller ? controller.signal : null,
//     //             }
//     //         );
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // },
//     // updateLead: async function (id, customFields) {
//     //     try {
//     //         console.log('dataToSend', id, customFields)
//     //         return axios.post(`${getServerUrl()}/lead/update-custom-fields`, { id, customFields }, {
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //                 // Authorization: `Bearer ${getCookie(tokenName)}`,
//     //             },
//     //         });
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // },
//     // removeLead: async function (id) {
//     //     console.log(id)
//     //     try {
//     //         return axios.post(`${getServerUrl()}/lead/disable-lead`, { id }, {
//     //             headers: {
//     //                 "Content-Type": "application/json",
//     //             }
//     //         })

//     //     } catch (error) {
//     //         console.log(error)
//     //     }
//     // },

// }
