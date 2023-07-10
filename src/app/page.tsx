export type TProducts = {
  map ( arg0: ( p: TProducts ) => import( "react" ).JSX.Element ): import( "react" ).ReactNode;
  product: string;
  price: string;
  id?: string;
}

const getPostsData: () => Promise<TProducts> = async () =>
{

  const res: Response = await fetch( "https://64abfb149edb4181202ee8ce.mockapi.io/product/",
    { cache: "no-cache" } )
  return res.json()
}

export default async function Home ()
{
  const [ products ] = await Promise.all( [ getPostsData(), ] )
  return (
    <main className="">
      <h1 className="text-3xl font-bold text-center">
        Product Warehouse
      </h1>

      <form action="" className='flex flex-col gap-5 max-w-xl mx-auto p-5'>
        <input
          type="text"
          placeholder='Enter Product name...'
          className='border border-gray-300 p-2 rounded-md' />
        <input
          type="text"
          placeholder='Enter Product name...'
          className='border border-gray-300 p-2 rounded-md' />
        <button className='bg-blue-500 p-2 rounded-md text-white'>Add Product</button>
      </form>


      <h2 className='font-bold p-5'>List og Product</h2>
      <div className="flex flex-wrap gap-5">
        { products.map( ( p: TProducts ) => (
          <div className="p-5 shadow" key={ p.id }>
            <p>{ p.product }</p>
            <p>{ p.price }</p>
          </div>
        ) ) }
      </div>

    </main> )
}