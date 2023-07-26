import { TOrderSuccess, TOrderValid } from '@/entity/server/orderan';

const findAll = () => {
  // getAll data from database
}

const findById = () => {
  //get only one  data from database
}

const pagenate = () => {
  //get per page data from database
}

const insert = async ( data: TOrderValid ): Promise<TOrderSuccess> => {
  //create data from database

  const sendDatabase = async ( dataBack: TOrderValid ): Promise<TOrderSuccess> => {
    setTimeout( () => 2000 )
    return Object.assign( dataBack, { success: true } )
  }

  const dataSuccess: TOrderSuccess = await sendDatabase( data )
  return dataSuccess
}
const edit = () => {
  //edit data from database
}

const destroy = () => {
  //delete data from database
}

export { insert, destroy, edit, findAll, findById, pagenate }