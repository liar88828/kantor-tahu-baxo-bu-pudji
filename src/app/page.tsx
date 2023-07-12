// import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primereact/resources/primereact.css';                       // core css
// import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';
import './flag.css';
import FormOrder from "./form/page";

// export const apiProduct: string = "https://64abfb149edb4181202ee8ce.mockapi.io/products/";
// const getPostsData: () => Promise<TProducts> = async () =>
// {
//   // const res: Response = await fetch( apiProduct, {
//   //   cache: "no-cache",
//   //   next: {
//   //     tags: [ "products" ],
//   //   },
//   // } );
//   // return res.json();
// };


const navbar = [
  { "name": 'Profile' },
  { "name": 'Home' },
  { "name": 'About' },
  { "name": 'Logout' }
]


export default async function Home() {
  // const [ products ] = await Promise.all( [ getPostsData() ] );

  return ( <>
      {/*slidebar*/}
      <div className=" relative border border-black bg-red-500 w-1/6 h-10">

          <h1>menu</h1>
        <ul>
          <li>Order Product</li>
          <li>Table Order</li>
          <li></li>
          <li></li>
        </ul>

      </div>
    </>
  );
}
