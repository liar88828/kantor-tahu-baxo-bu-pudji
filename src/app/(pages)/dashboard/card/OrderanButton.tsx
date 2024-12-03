import { Rupiah } from '@/lib/utils/rupiah';

export default function OrderanButton( { semuaProduct, id }: {
  id: string
  semuaProduct: TProduct[]
} ) {

  const OrderanCard = <div className="flex flex-wrap gap-3 p-1 ">
    { semuaProduct.map( ( item: TProduct, i: number ) => {
      return (
        <div key={ item.id + item.nama }>
          <div className="w-[9rem]  bg-white border border-slate-100 rounded-lg shadow shadow-black p-2">
            <div className="card-body rounded p-2 ">
              <p className="mb-2 font-bold">{ i + 1 }. { item.nama }</p>
              <p className={ "text-sm" }> { Rupiah( item.harga ) }</p>
              <p className={ "text-sm" }>Jenis : { item.jenis }</p>
              <p className={ "text-sm" }> Jumlah : { item.jumlah }</p>
            </div>
          </div>
        </div>
      )
    } ) }
  </div>

  return (
    <>
      <label htmlFor={ `my_modal_card_orderan_${ id }` }
             className="btn btn-sm sm:btn-md bg-purple-600 text-white">CEK</label>
      <input type="checkbox" id={ `my_modal_card_orderan_${ id }` } className="modal-toggle"/>
      <div className="modal ">
        <div className="modal-box p-3">
          <h1 className={ "font-bold uppercase" }>SEMUA ORDERAN</h1>
          { OrderanCard }
        </div>
        <label className="modal-backdrop text-black" htmlFor={ `my_modal_card_orderan_${ id }` }> </label>
      </div>
    </> )
}

