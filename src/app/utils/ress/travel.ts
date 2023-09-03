import { sendData } from '@/app/utils/ress/sendApi';

export async function getDataById( id: string ) {
  return await sendData( "travel", "GET", id );
}

export async function getData(): Promise<{ data: TTravel[], msg: string }> {
  return await sendData( "travel", "GET", "" );
}

export const deleteData = async ( id: string, ) => {
  return await sendData( "travel", "DELETE", id )
}