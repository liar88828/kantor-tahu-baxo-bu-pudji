import React from 'react';

const MyComponent = () => {
  return (
    <div className={ "border border-black p-2 m-2 w-[48%] text-xs" }>
      {/*----------------------Head*/ }
      <div className=" flex flex-row justify-between m-1">
        <ul className=" w-[70%] flex flex-col gap-2">
          <li className={ "flex gap-1" }>
            <h1 className={ "uppercase" }>Pemesan</h1>
            <p>:</p>
            <span>nama Pemesan</span>

          </li>
          <li className={ "flex gap-1" }>
            <h1 className={ "uppercase" }>Pengirim</h1>
            <p>:</p>

            <span>nama Pengirim</span>

          </li>
          <li className={ "flex gap-1" }>
            <h1 className={ "uppercase whitespace-nowrap" }>Penerima </h1>
            <p>:</p>
            <br/>
            <p>
              <a> Ima </a> <a>012345678</a>
              <br/>
              <a> Jl Kebumen RT 05 RW 05 Kel Rowosari Kec Tembalang </a>
              <br/>
              <a>Kota Semarang 50279</a>
            </p>
          </li>
        </ul>
        <div className=" w-[30%] text-center text-xs">
          <div className="border border-black bg-yellow-200 break-alls ">
            <h1 className={ "uppercase text-xs font-bold" }>kirim</h1>
            <h1 className={ "uppercase text-md font-bold" }>Minggu</h1>
            <p> 20 Agustus 2023</p>
            <p className={ "font-bold" }>08.00</p>
          </div>
          <div className="border border-black text-xs">
            <h1>Outlet</h1>
            <p className={ " " }>Jl. parmulasih No. 15 Semarang</p>
          </div>
          <div className=" ">
            <h1 className={ "italic underline font-bold text-xs whitespace-nowrap " }>BUKAN BUKTI BAYAR</h1>
          </div>
        </div>
      </div>
      {/*---------------------Table*/ }

      <table className={ "text-xs  w-full" }>
        <thead className={ "border-black border" }>
        <tr className={ "border-black border" }>
          <th className={ "border-black border" }>No.</th>
          <th className={ "border-black border" }>Nama Barang</th>
          <th className={ "border-black border" }>Banyaknya</th>
          <th className={ "border-black border" }>Harga Satuan</th>
          <th className={ "border-black border" }>Jumlah</th>
        </tr>
        </thead>
        <tbody>
        <tr className={ "border-black border" }>
          <td className={ "border-black border text-center" }>1</td>
          <td className={ "border-black border" }>TahuBaxo Vakum</td>
          <td className={ "border-black border" }>15</td>
          <td className={ "border-black border" }>47.000</td>
          <td className={ "border-black border" }>705.000</td>
        </tr>
        <tr>
          <td className={ "border-black border text-center" }>2</td>
          <td className={ "border-black border" }>Kardus Jumbo</td>
          <td className={ "border-black border" }>1</td>
          <td className={ "border-black border" }>12.000</td>
          <td className={ "border-black border" }>12.000</td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td className={ "font-bold" }> SubTotal</td>
          <td>717.000</td>
        </tr>
        </tbody>
      </table>

      {/*-----------------------Footer*/ }
      <div className="flex flex-row justify-between  mt-1 ">
        {/*tanda tangan */ }
        <div className="flex flex-col w-[60%] justify-between ">
          <div className="flex flex-row mb-10 gap-1">
            <h1 className={ "font-bold" }>Catatan</h1>
            <p>:</p>
            <p> Keterangan Untuk Ngaji</p>
          </div>
          <div className="flex flex-row justify-around ">
            <div className={ " text-center" }>
              <p>Customer</p>
              <br/>
              <p>( Tanda Tangan )</p>
            </div>
            <div className={ " text-center" }>
              <p>Penerima Pemesanan</p>
              <br/>
              <p>( TSO )</p>
            </div>
          </div>
        </div>


        <div className="text-xs w-[30%] text-end">
          <table>
            <tbody className={ "border border-black " }>
            <tr>
              <td>Total</td>
              <td>:</td>
              <td>717.000</td>
            </tr>
            <tr>
              <td>Biaya Kirim</td>
              <td>:</td>
              <td>35.000</td>
            </tr>
            <tr>
              <td>Total + Biaya Kirim</td>
              <td>:</td>
              <td className={ "text-lg font-bold" }>752.000</td>
            </tr>

            <tr>
              <td>Total Berat</td>
              <td>:</td>
              <td>50 kg</td>
            </tr>
            <tr>
              <td>Jumlah Paket</td>
              <td>:</td>
              <td>10 Paket</td>
            </tr>
            </tbody>

            <tbody className={ "border border-black mt-5 " }>
            <tr>
              <td>Pembayaran</td>
              <td>:</td>
              <td className={ "font-bold" }>MANDIRI</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyComponent;
