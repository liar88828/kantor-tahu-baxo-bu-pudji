import Image from 'next/image';
import { GateWay } from '@/app/utils/ress/GateWay';
import { Rupiah } from '@/lib/utils/rupiah';
import { AiOutlineFacebook, AiOutlineGlobal, AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai';

export const dynamic    = 'force-dynamic'
export const revalidate = 0
// export const fetchCache = 'auto'
// export const runtime    = 'nodejs'

export default async function Page() {

  const { data }             = await GateWay<TProduct[]>( "GET", 'product', '', {} )
  const { data: dataTravel } = await GateWay<TTravel[]>( "GET", 'travel', '', {} )
  const { data: dataBank }   = await GateWay<TBank[]>( "GET", 'bank', 'all', {} )

  return ( <div className={ " relative " }>

      <div className={ "z-30" }
           style={ {
             backgroundImage : `url( http://localhost:3000/blob.svg)`,
             backgroundSize  : "cover",
             backgroundRepeat: "no-repeat"
           } }>
        <div className={ "  p-10 flex flex-col  font-sans " }>


          <div className="mt-10 ">
            <div>
              <div className=" relative">
                <img src={ "http://localhost:3000/logo.png" }
                     alt={ "logo" }
                     className={ "w-[14rem] h-auto absolute left-1 b-0" }/>

                <div className=" text-center uppercase color-yellow-200 mb-24 ">
                  <h1 className={ "text-7xl font-bold text-green-500 drop-shadow-lg   " }>Menu</h1>
                  <h2 className={ "text-3xl font-bold text-green-700 drop-shadow-lg mt-7 " }>Orderan</h2>
                </div>
              </div>

            </div>

            <hr className={ "my-6 border-green-400 border-t-8 border-dotted  " }/>


            {/*Body*/ }
            <div className=" flex ">
              <ul className={ " flex flex-wrap  justify-center " }>
                { data.map( ( d: TProduct, i: number ) => ( <li
                  key={ d.id }
                  className={ ` m-4  border-2 shadow-md shadow-slate-400 border-black bg-green-200 rounded-full flex ${
                    i % 2 === 0
                    ? " flex-row-reverse "
                    : "  flex-row " }` }>
                  <div className={ `${ i % 2 === 0 ? " text-start " : " text-end " }` }>
                    <figure className={ " h-32 object-cover rounded " }>
                      <Image width={ 200 } height={ 200 } src={ d.img }
                             alt={ "iki gambar" }
                             className={ "rounded-full shadow-md shadow-slate-400 h-full w-48 object-cover " }/>
                    </figure>
                    {/*rounded-3xl object-cover h-full w-32*/ }

                  </div>

                  <div className={ `uppercase w-[16rem] py-2 px-4 flex  flex-col justify-center ${
                    i % 2
                    === 0 ? " text-end "
                          : " text-start " }` }>
                    <h1 className={ "text-2xl font-bold" }>
                      { d.nama }
                    </h1>
                    <p className={ "text-2xl" }>{ Rupiah( d.harga ) }</p>
                  </div>
                </li> ) ) }
              </ul>
            </div>
            <hr className={ "my-6 border-green-400 border-t-8 border-dotted  " }/>

            <div className=" flex justify-around px-3 ">

              {/*---------------Bank-------------*/ }
              <div className="">
                <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8">
                  Metode Pembayaran Kami
                </h1>
                <ul className={ "flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center p-2" }>
                  { dataBank.map( ( t: TBank, i: number ) => {
                    return (
                      <li className="" key={ t.id }>
                        <figure className={ " h-20 object-cover rounded " }>
                          <img src={ t.img }
                               alt={ t.id }
                               width={ 100 }
                               height={ 100 }
                               className={ "rounded-3xl object-cover h-full w-20" }
                          />
                        </figure>
                        { t.nama }
                      </li>
                    )
                  } ) }
                </ul>
              </div>

              {/*---------------Jasa Pengiriman-------------*/ }
              <div className="">
                <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8">
                  Jasa Pengiriman</h1>
                <ul className={ "flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center p-2" }>
                  { dataTravel.map( ( t: TTravel, i: number ) => {
                    return (
                      <li className="" key={ t.id }>
                        <figure className={ " h-20 object-cover rounded " }>
                          <img src={ t.img }
                               alt={ t.id }
                               width={ 100 }
                               height={ 100 }
                               className={ "rounded-3xl object-cover h-full w-20" }
                          />
                        </figure>
                        { t.nama }
                      </li>
                    )
                  } ) }
                </ul>
              </div>

              {/*---------------verifikasi-------------*/ }
              <div className="">
                <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8">
                  verifikasi</h1>
                <ul className={ "flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center p-2" }>
                  <li className="">
                    <figure className={ " h-20 object-cover rounded " }>
                      <img src={ "https://seeklogo.com/images/H/halal-mui-logo-A88C9A098B-seeklogo.com.png" }
                           alt={ "logo hallal" }
                           width={ 100 }
                           height={ 100 }
                           className={ "rounded-3xl object-cover h-full w-20" }
                      />
                    </figure>
                  </li>
                  <li className="">
                    <figure className={ " h-20 object-cover rounded " }>
                      <img
                        src={ "https://www.nicepng.com/png/detail/71-718556_wonderful-indonesia-logo-logo-pesona-indonesia-png.png" }
                        alt={ "logo pesona" }
                        width={ 100 }
                        height={ 100 }
                        className={ "rounded-3xl object-cover h-full w-20" }
                      />
                    </figure>
                  </li>
                </ul>
              </div>

            </div>

            <div className="mt-10">
              <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8">
                Informasi lebih lengkap
              </h1>
              <div className="flex flex-row justify-around">

                <div className=" w-1/2">
                  <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8 ">
                    OutLet Kami
                  </h1>
                  <ul className={ "flex flex-col gap-2" }>
                    <li className={ "font-bold" }>
                      Jl. Diponegoro No 14 Ungaran 024-7691 4420
                    </li>
                    <li className={ "font-bold" }>
                      Jl. Raya Semarang-Bawen, Babadan Ungaran 0851 0033 1711
                    </li>
                    <li className={ "font-bold" }>
                      Jl. Letjend Suprapto No. 24 Sidomulyo, Ungaran 0822 1122 5457
                    </li>
                    <li className={ "font-bold" }>
                      Jl. Pamularsih No 15 Semarang Barat 0822 4247 5758
                    </li>
                  </ul>
                </div>

                <div className=" w-1/2">
                  <h1 className="capitalize text-center text-xl font-bold text-green-700 drop-shadow-lg mb-8">
                    Media Sosial Kami
                  </h1>
                  <ul className={ "flex flex-nowrap md:flex-wrap justify-center" }>
                    <li>
                      <a href={ "https://www.facebook.com/tahubaxoibupudji" }
                         className={ "flex flex-row items-center" }>
                        <AiOutlineFacebook size={ "5rem" }/><h1 className={ "text-lg text-center" }>Tahubaxo
                        Ibupudji</h1>
                      </a>
                    </li>
                    <li>
                      <a href={ "https://www.instagram.com/tahubaxo_ibupudji/" }
                         className={ "flex flex-row items-center" }>
                        <AiOutlineInstagram size={ "5rem" }/><h1
                        className={ "text-lg text-center" }>tahubaxo_ibupudji</h1>
                      </a>
                    </li>
                    <li>
                      <a href={ "https://www.youtube.com/channel/UCS_CUFQKq-cpbwB94Z6NOFA" }
                         className={ "flex flex-row items-center" }>
                        <AiOutlineYoutube size={ "5rem" }/><h1 className={ "text-lg text-center" }>Tahubaxo Ibu
                        Pudji</h1>
                      </a>
                    </li>
                    <li>
                      <a href={ "https://tahubaxo-ibupudji.com/" } className={ "flex flex-row items-center" }>
                        <AiOutlineGlobal size={ "5rem" }/><h1 className={ "text-lg text-center" }>Tahubaxo Ibu Pudji
                        -</h1>
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
