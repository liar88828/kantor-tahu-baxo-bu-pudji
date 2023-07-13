import React from 'react'

export default function FormOrder() {
  return (
    <div>

      <main className="relative">
        <h1 className="text-3xl font-bold text-center"> Orderan Form </h1>
        <div className="fixed right-[10rem] bottom-[5rem] "
        >
          {/* <AddProductButton /> */ }
        </div>

        <form
          // action={ }
          className="flex flex-col gap-5  p-5"
        >
          <div className="flex flex-row gap-5">

            <div className="border border-black flex flex-row gap-5 p-5 ">

              <div className="border border-black flex flex-col gap-5 p-5">
                <h1>Nama</h1>
                <hr/>
                <label htmlFor="">Pengirim</label>
                <input
                  type="text"
                  name="product"
                  placeholder="Masukan Nama Pengirim..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Hp Pengirim</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Masukan Nomor Hp Pengirim..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Penerima</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Masukan Nama Penerima ..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Alamat Penerima</label>
                <input
                  type="text"
                  name="price"
                  placeholder="Masukan Nama Penerima..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Hp Penerima</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Masukan Nomor Hp Penerima..."
                  className="border border-gray-300 p-2 rounded-md"
                />


              </div>


              <div className="border border-black flex flex-col gap-5  p-5">

                <h1>Tanggal</h1>
                <hr/>
                <label htmlFor="">Pesan</label>
                <input
                  type="date"
                  name="product"
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Kirim</label>
                <input
                  type="date"
                  name="product"
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>


              <div className="border border-black flex flex-col gap-5 p-5">
                <h1>Orderan</h1>
                <hr/>
                <label htmlFor="">Orderan</label>
                <select name="orderan"
                        id="orderan"
                        className='border border-gray-300 p-2 rounded-md'>
                  <option value="Tahu Bakso Rebus">Tahu Bakso Rebus Rp.42.000</option>
                  <option value="Tahu Bakso Vakum">Tahu Bakso Vakum Rp.46.000</option>
                  <option value="Tahu Bakso Specialty">Tahu Bakso Special Rp.50.000</option>
                  <option value="Tahu Bakso Goreng">Tahu Bakso Goreng Rp.45.000</option>
                  <option value="Bandeng Presto">Bandeng Presto Rp.60.000</option>
                  <option value="Otak-Otak Bandeng">Otak-Otak Bandeng Rp.70.000</option>
                  <option value="Bakso Sapi 20">Bakso Sapi 20 Rp.40.000</option>
                  <option value="Bakso Sapi 12">Bakso Sapi 12 Rp.25.000</option>
                  <option value="Bakso Aneka">Bakso Aneka Rp.29.000</option>
                  <option value="Nugget">Nugget Rp.27.000</option>
                  <option value="Rolade Tahu">Rolade Tahu Rp.19.000</option>
                  <option value="Rolade Singkong">Rolade Singkong Rp.19.000</option>
                </select>

                <h1>Lain Lain</h1>
                <hr/>
                {/* Semisal Peroduct lain selain tahu bakso  */ }
                <label htmlFor="">Item</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Masukkan Jumlah Yang Di Pesan ..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                {/* Total Keseluruhan darii Item lain-lain */ }
                <label htmlFor="">Total</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Total Bayar..."
                  className="border border-gray-300 p-2 rounded-md"
                />
              </div>


              <div className="border border-black flex flex-col gap-5 p-5">


                {/* combo box  */ }
                <label htmlFor="">Ekspedisi</label>
                <select name="jenis pembayaran"
                        id="ekspedisi"
                        className='border border-gray-300 p-2 rounded-md'>
                  <option value="Paxel">Paxel</option>
                  <option value="JNE">JNE</option>
                  <option value="Travel Omega">Travel Omega</option>
                  <option value="Travel Serasi">Travel Serasi</option>
                  <option value="Go Send">Go Send</option>
                  <option value="Maxim">Maxim</option>
                  <option value="Delivery">Delivery</option>
                </select>

                {/* tulis sendiri */ }
                <label htmlFor="">Ongkir</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Masukkan Harga Ongkir ..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                {/* total product tanpa ongkir   tapi di isi dengan product yang lain lain*/ }
                <label htmlFor="">Total Penjualan</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Masukan Total Bayar..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                <label htmlFor="">Total Bayar</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter Product name..."
                  className="border border-gray-300 p-2 rounded-md"
                />

                {/* jenis Pembayaran */ }
                <label htmlFor="">Pembayaran</label>
                <select name="jenis pembayaran"
                        id="cod"
                        className='border border-gray-300 p-2 rounded-md'>
                  <option value="Cash">Cash</option>
                  <option value="BCA">BCA</option>
                  <option value="Mandiri">Mandiri</option>
                  <option value="BRI">BRI</option>
                </select>

              </div>

              {/* <label htmlFor="">Pembayaran</label>
               <input
               type="text"
               name="price"
               placeholder="Metode Pembayaran..."
               className="border border-gray-300 p-2 rounded-md"
               />
               </div> */ }
              {/* <input type="image" formAction={ submitImage } /> */ }

            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 p-2 rounded-md text-white">
            Add Product
          </button>
        </form>

        <h2 className="font-bold p-5">List og Product</h2>


        <div className="">
          {/*<Tables lg gap={ 2 } css={ { mt: '$10' } } />*/ }
        </div>

        <div className="flex flex-wrap gap-5">
          {/* { !products ? <h1>salah</h1> : products.map( ( p: any ) =>
           {
           if ( p == undefined || !p ) return <h1>Hot found</h1>;
           else
           {
           return (
           <div className="p-5 shadow" key={ p.id }>
           <p>{ p.product }</p>
           <p>Rp.{ p.price }</p>
           </div>
           );
           }
           } ) } */ }
        </div>

      </main>


    </div>
  )
}
