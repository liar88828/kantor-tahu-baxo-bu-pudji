// import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primereact/resources/primereact.css';                       // core css
// import 'primeicons/primeicons.css';                                 // icons
// import 'primeflex/primeflex.css';
import './flag.css';
import FormOrder from "./form/page";
import { SlideBar } from '@/app/component/slidebar';

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
      <SlideBar/>

    </>
  );
}
