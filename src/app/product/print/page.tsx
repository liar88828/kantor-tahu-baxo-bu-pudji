import React from 'react';
import Image from 'next/image';
// bg-gradient-to-r from-cyan-200 to-cyan-400
const MyComponent = () => {
  const array = [
    { id: 1 },
    { id: 102 },
    { id: 112 },
    { id: 47 },
    { id: 25 },
    { id: 104 },
    { id: 45 },
  ]
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
                  <h2 className={ "text-3xl font-bold text-green-700 drop-shadow-lg mt-7 " }>Restoran</h2>
                </div>
              </div>

            </div>

            {/*Body*/ }
            <div className=" flex ">
              <ul className={ "  flex flex-wrap gap-2 justify-center" }>
                { array.map( ( d, i ) => ( <li
                  key={ d.id }
                  className={ ` mx-2 my-4 border-2 shadow-md shadow-slate-400 border-black bg-green-200 rounded-full flex
${ i % 2 === 0 ? " flex-row-reverse " : "  flex-row " }` }>
                  <div className={ `${ i % 2 === 0 ? " text-start " : " text-end " }` }>
                    <Image width={ 200 } height={ 200 } src={ "/img/produk/1692361479653_Tahu Bakso Rebus.jpg" }
                           alt={ "iki gambar" }
                           className={ "rounded-full shadow-md shadow-slate-400 max-w-full h-auto aspect-[4/3]  " }/>
                  </div>
                  <div className={ `uppercase w-[16rem] py-2 px-4 flex  flex-col justify-center ${ i % 2
                                                                                                   === 0 ? " text-end "
                                                                                                         : " text-start " }` }>
                    <h1 className={ "text-2xl font-bold" }>Tahu bakso</h1> <p className={
                    "text-2xl" }>12k</p></div>
                </li> ) ) }  </ul>
            </div>
            <div className="mt-10"><h1 className="uppercase">untuk
              pesanan : 123-456-789</h1></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MyComponent;
