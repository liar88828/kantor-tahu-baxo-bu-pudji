import { ImgCard } from '@/app/components/Atom/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/components/Atom/Text/TextCard';
import { formatPhone } from '@/lib/utils/formatPhone';
import { TextHidden } from '@/app/components/Atom/Text/TextHidden';
import { EditCard } from '@/app/element/Edit';
import { DeleteCard } from '@/app/element/Delete';
import { CardBody, CardButton, LiCard } from '@/app/components/Card';

export const to = "bank"

export function ListBank( { d }: { d: TBank } ) {
  return ( <LiCard name={ d.nama }>
      <ImgCard img={ d.img }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts className={ " " }>{ formatPhone( d.hp ) }</Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis } className2={ "badge badge-info" }/>
              <Texts>{ d.lokasi }</Texts>
            </div>

            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

