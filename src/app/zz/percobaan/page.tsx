"use client"
// import { Controller, useForm } from 'react-hook-form';
//
// type TypeForm = { name: string }
// export default function YourFormComponent() {
//
//   const { control, handleSubmit, watch } = useForm<TypeForm>();
//   const onSubmit = ( data: TypeForm ) => {
//     console.log( 'Form submitted:', data );
//   };
//
//   return (
//     <form onSubmit={ handleSubmit( onSubmit ) }>
//       <label>
//         Name:
//         <Controller
//           name="name"
//           control={ control }
//           defaultValue=""
//           render={ ( { field } ) => (
//             <input type="text" { ...field } onChange={
//               ( e ) => field.onChange( e.target.value )
//             }/>
//           ) }
//         />
//       </label>
//       <p>Current Name Value: { watch( 'name' ) }</p>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
//
