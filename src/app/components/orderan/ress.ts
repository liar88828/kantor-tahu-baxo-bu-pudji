import { TOrder } from '@/entity/orderan';

export const createOrder = async ( valueForm: TOrder ) => {
  const response = await fetch( "http://localhost:3000/api/orderan", {
    method: "POST",
    body: JSON.stringify( { valueForm } ),
    headers: { "Content-Type": "application/json", }
  } )
  return response.json()
}


