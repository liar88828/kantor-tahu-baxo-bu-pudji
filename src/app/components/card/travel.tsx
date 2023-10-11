import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';

import { imageValid, ImgCard } from '@/app/elements/img/ImgCard';
import { CardBody, CardButton, LiCard } from '@/app/elements/card/Card';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';
import { TextHidden } from '@/app/elements/Text/TextHidden';

export const to = "travel"

export function ListTravel(
  { d }:
    { d: TTravel }
) {
  return ( <LiCard>
      <ImgCard img={ imageValid( d.img ) }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts>{ d.hp }</Texts>
              <Texts>{ d.lokasi }</Texts>
              <Texts>Biaya { Rupiah( d.harga ) }</Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis }/>

            </div>
            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          <EditCard to={ to } id={ d.id }/>
          <DeleteCard id={ d.id } to={ to }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}