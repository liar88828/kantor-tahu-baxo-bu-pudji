"use client"
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { formBank } from '@/app/utils/format/bank';
import { GateWay } from '@/app/utils/ress/GateWay';
import { notifyData } from '@/app/utils/notif/toash';
import { useRouter } from 'next/navigation';

export function Form( { data, method }: {
  data: Awaited<TBank>,
  method: "PUT" | "POST"
} ) {
  const router                      = useRouter()
  const { register, handleSubmit, } = useForm<TBank>( {
    defaultValues: data,
    mode         : "onChange",
  } )

  const onSubmit: SubmitHandler<TBank> = async ( d ) => {
    const res = await GateWay( method, "bank", d.id ? d.id : "", d, )
    if( res ) {
      notifyData<TBank>( res.msg )
      if( res.msg.toString().includes( "cess" ) ) {
        router.replace( "/bank/list" )
      }
    }
    console.log( res )
    console.error( "error" )
  }
  return (
    <div className="flex sm:flex-row flex-col">
      <form onSubmit={ handleSubmit( onSubmit ) }
            className="w-full flex  flex-row gap-5 ">
        <div className=" sm:m-4 bg-white rounded p-5 w-full sm:w-2/3">
          <InputForm title={ formBank.nama } type="text" reg={ register( "nama" ) }/>
          <InputForm title={ formBank.lokasi } type="text" reg={ register( "lokasi" ) }/>
          <InputForm title={ formBank.jenis } type="text" reg={ register( "jenis" ) }/>
          <InputForm title={ formBank.hp } type="tel" reg={ register( "hp" ) }/>
          <InputForm title={ formBank.no } type="tel" reg={ register( "no" ) }/>
          <InputForm title={ formBank.img } type="tel" reg={ register( "img" ) }/>
          <InputForm title={ formBank.keterangan } type="textarea" reg={ register( "keterangan" ) }/>
          <button type="submit"
                  className="bg-blue-500 p-2 rounded-md text-white">
            { method === "POST" ? " SIMPAN" : "EDIT" }
          </button>
        </div>
      </form>
    </div>
  )
}