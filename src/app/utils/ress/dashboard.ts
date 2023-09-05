import { sendData } from '@/app/utils/ress/sendApi';
import { TStatusParams } from '@/interface/repository/SemuaProduk';

export async function updateStatus( status: string, id: string ): Promise<
  any
//{ data: string, msg: string }
> {
  const json: TStatusParams = {
    id    : id,
    status: status
  }
  // console.log( json )

  const to = "dashboard"
  return await sendData( to, "PUT", id, json );
}