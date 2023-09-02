import { SubmitHandler, useForm } from 'react-hook-form';
import { InputForm } from '@/app/elements/input/InputNew';
import { formBank } from '@/app/utils/format/bank';
import { getDataById } from '@/app/utils/ress/bank';
import { useParams } from 'next/navigation';

export function Form( { sendData, data, method }: {
  sendData: ( data: TBank, id: string ) => Promise<void>,
  data: Awaited<TBank>
  method: "PUT" | "POST"
} ) {

  const { id } = useParams()

  const { register, handleSubmit, } = useForm<TBank>( {
          defaultValues: method !== "PUT" ? data : async () => {
            const { data: d }: {
              data: TBank,
            } = await getDataById( id )
            return {
              nama      : d.nama,
              jenis     : d.jenis,
              lokasi    : d.lokasi,
              keterangan: d.keterangan,
              id        : d.id,
              no        : d.no,
              hp        : d.hp
            }

          }
          ,
          mode: "onChange",
        } )
  ;

  const onSubmit: SubmitHandler<TBank> = async ( data ) => {
    await sendData( data, id )
  }

  return ( <form onSubmit={ handleSubmit( onSubmit ) }
                 className="w-full flex  flex-row gap-5 ">

    <div className="  sm:m-4 bg-white rounded p-5 w-2/3">
      <InputForm title={ formBank.nama } type="text" reg={ register( "nama" ) }/>
      <InputForm title={ formBank.lokasi } type="text" reg={ register( "lokasi" ) }/>
      <InputForm title={ formBank.jenis } type="text" reg={ register( "jenis" ) }/>
      <InputForm title={ formBank.hp } type="tel" reg={ register( "hp" ) }/>
      <InputForm title={ formBank.no } type="tel" reg={ register( "no" ) }/>
      <InputForm title={ formBank.keterangan } type="textarea" reg={ register( "keterangan" ) }/>
      <button type="submit"
              className="bg-blue-500 p-2 rounded-md text-white">Simpan
      </button>
    </div>


  </form> )
}