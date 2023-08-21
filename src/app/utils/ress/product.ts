import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { sendData } from '@/app/utils/ress/sendApi';

export async function getDataById( id: string ) {
  return await sendData( "product", "GET", id );
}

export async function getData() {
  return await sendData( "product", "GET", "" );
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const data = await sendData( "product", "DELETE", id );
  router.refresh()
  return data
}