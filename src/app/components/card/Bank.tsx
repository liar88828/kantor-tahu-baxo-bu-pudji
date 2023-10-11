import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';

import { CardBody, CardButton, LiCard, } from '@/app/elements/card/Card';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';
import { formatPhone } from '@/lib/utils/formatPhone';
import { TextHidden } from '@/app/elements/Text/TextHidden';

export const to = "bank"

export function ListBank( { d }: {
  d: TBank
} ) {
  return ( <LiCard>
          <ImgCard img={ d.img }/>
          <CardBody>
            <div>
              <TextTitle text={ d.nama }/>
              <TextBody>
                <div>
                  <Texts className={" "}>{ formatPhone( d.hp ) }</Texts>
                  <TextHidden title={"Jenis : "} value={d.jenis } className2={"badge badge-info"}/>
                  <Texts>{ d.lokasi }</Texts>
                </div>

                <div>
                  <TextHidden title={"Keterangan : "} value={d.keterangan }/>
                </div>
              </TextBody>
            </div>

            <CardButton>
              <EditCard to={ to } id={ d.id }/>
              <DeleteCard to={ to } id={ d.id }/>
            </CardButton>

          </CardBody>
        </LiCard>

  )
}

