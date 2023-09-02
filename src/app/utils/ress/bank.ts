import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { sendData } from '@/app/utils/ress/sendApi';
import { setIdBank } from '@/lib/utils/formatId';

export async function getDataById( id: string ): Promise<{
  data: TBank,
  msg: string
}> {
  const to   = "bank"
  const data = await sendData( to, "GET", id );
  // console.log(data)
  return data
}

export async function getData(): Promise<{
  data: TBank[],
  msg: string
}> {
  const to   = "bank"
  const data = await sendData( to, "GET", "all" );
  // console.log(data)
  return data
}

export async function postData( json: TBank ): Promise<{
  data: TBank,
  msg: string
}> {
  console.log( json )

  json.id = setIdBank( json )

  const to = "bank"
  return await sendData( to, "POST", "", json );
}

export async function putData( json: TBank, id: string ): Promise<{
  data: TBank,
  msg: string
}> {

  const to = "bank"
  return await sendData( to, "PUT", id, json );
}

export const deleteData = async ( id: string, router: AppRouterInstance ) => {
  const to   = "bank"
  const data = await sendData( to, "DELETE", id );
  return data
}