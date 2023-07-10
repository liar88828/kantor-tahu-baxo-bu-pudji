import Image from 'next/image'

export default function Home ()
{
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



    </main>
  )
}
