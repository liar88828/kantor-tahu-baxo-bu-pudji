import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { sendData } from '@/app/utils/ress/sendApi';

export async function getDataById( id: string ) {
  return await sendData<TProduct>( "product", "GET", id );
}

export async function getData() {
  return await sendData<TProduct[]>( "product", "GET", "" );
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  return await sendData<TProduct>( "product", "DELETE", id )
}