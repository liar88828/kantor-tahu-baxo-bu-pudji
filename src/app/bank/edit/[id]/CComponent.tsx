import { putData } from '@/app/utils/ress/bank';
import { notifyData } from '@/app/utils/notif/toash';
import { defaultFormBank } from '@/app/utils/format/bank';
import { LinkNavbar } from '@/app/elements/link/LinksNavbar';
import { Form } from '@/app/components/form/Bank';

export function CComponent() {
  const sendData = async ( data: TBank, id: string ) => {
    const res = await putData( data, id )
    notifyData( res.msg )
  }
  return (
    <LinkNavbar>
      <div className="flex flex-row">
        <Form sendData={ sendData } data={ defaultFormBank } method={ "PUT" }/>
      </div>
    </LinkNavbar>

  )
}

