// 'use client'
// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import { useState } from 'react';
//
// export default function Example() {
//   // `value` will be the parsed phone number in E.164 format.
//   // Example: "+12133734253".
//   const [value, setValue] = useState()
//   console.log(value)
//   return (
//     <PhoneInput
//       placeholder="Enter phone number"
//       value={value}
//       onChange={setValue}/>
//   )
// }
//
// // 'use client'
// // import React, { useCallback, useRef } from 'react';
// // // @ts-ignore
// // import { toPng } from 'html-to-image';
// //
// // function Page() {
// //
// //   const elementRef         = useRef<HTMLTableElement>( null );
// //   const htmlToImageConvert = useCallback( () => {
// //     toPng( elementRef.current, { cacheBust: false } )
// //     .then( ( dataUrl: any ) => {
// //       const link    = document.createElement( "a" );
// //       link.download = "my-image-name.png";
// //       link.href     = dataUrl;
// //       link.click();
// //     } )
// //     .catch( ( err: any ) => {
// //       console.log( err );
// //     } );
// //   }, [ elementRef ] )
// //
// //   return (
// //     <div>
// //       <button
// //         className={ 'btn btn-primary' }
// //         onClick={ htmlToImageConvert }>Download Image
// //       </button>
// //
// //       <table
// //         ref={ elementRef }
// //         style={ {
// //           fontFamily    : "Arial, Helvetica, sans-serif",
// //           borderCollapse: "collapse",
// //           width         : "50%",
// //           margin        : "0 auto",
// //         } }
// //       >
// //         <tr>
// //           <th
// //             style={ {
// //               backgroundColor: "#04AA6D",
// //               padding        : "12px 8px",
// //               textAlign      : "left",
// //               border         : "1px solid #ddd",
// //             } }
// //           >
// //             Company
// //           </th>
// //           <th
// //             style={ {
// //               backgroundColor: "#04AA6D",
// //               padding        : "12px 8px",
// //               textAlign      : "left",
// //               border         : "1px solid #ddd",
// //             } }
// //           >
// //             Contact
// //           </th>
// //           <th
// //             style={ {
// //               backgroundColor: "#04AA6D",
// //               padding        : "12px 8px",
// //               textAlign      : "left",
// //               border         : "1px solid #ddd",
// //             } }
// //           >
// //             Country
// //           </th>
// //         </tr>
// //         <tr>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Alfreds Futterkiste
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Maria Anders
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Germany
// //           </td>
// //         </tr>
// //         <tr>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Berglunds snabbköp
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Christina Berglund
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Sweden
// //           </td>
// //         </tr>
// //         <tr>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Centro comercial Moctezuma
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Francisco Chang
// //           </td>
// //           <td
// //             style={ {
// //               padding  : "8px",
// //               border   : "1px solid #ddd",
// //               textAlign: "left",
// //             } }
// //           >
// //             Mexico
// //           </td>
// //         </tr>
// //       </table>
// //     </div>
// //   );
// // }
// //
// // export default Page;