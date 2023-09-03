import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { formTravel } from '@/app/utils/format/travel';
import { ReactNode } from 'react';

export function Form( { children, sendDataImage, data }:
  {
    children: ReactNode,
    sendDataImage: ( data: TTravel ) => Promise<any>,
    data: Awaited<TTravel>
  } ) {
  // console.log( data )
  const { register, handleSubmit, } = useForm<TTravel>( {
    defaultValues: data,
    mode         : "onChange",
  } );
  // console.log( "-------------" )
  // console.log( data )
  // console.log( "-------------" )

  const onSubmit: SubmitHandler<TTravel> = async ( data ) => {
    await sendDataImage( data )
  }

  return ( <form onSubmit={ handleSubmit( onSubmit ) }
                 className="w-full flex  flex-row gap-5 ">

    <div className="  sm:m-4 bg-white rounded p-5 w-1/2">
      <InputForm title={ formTravel.namaPengiriman } type="text" reg={ register( "namaPengiriman" ) }/>
      <InputForm title={ formTravel.noHpPerusahaan } type="tel" reg={ register( "noHpPerusahaan" ) }/>
      <InputForm title={ formTravel.lokasi } type="text" reg={ register( "lokasi" ) }/>
      <InputForm title={ formTravel.jenis } type="text" reg={ register( "jenis" ) }/>
      <InputForm title={ formTravel.harga } type="text" reg={ register( "harga" ) }/>
      <InputForm title={ formTravel.keterangan } type="textarea" reg={ register( "keterangan" ) }/>
    </div>

    <div className=" sm:m-4 bg-white rounded p-5 w-1/2  flex  flex-col gap-5 ">
      { children }
      <button type="submit"
              className="bg-blue-500 p-2 rounded-md text-white">Simpan
      </button>
    </div>
  </form> )
}