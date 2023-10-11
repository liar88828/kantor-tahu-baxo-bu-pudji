import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';

import { CardBody, CardButton, LiCard } from '@/app/elements/card/Card';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';
import { TextHidden } from '@/app/elements/Text/TextHidden';

export const to = "product"

export default function ListProduct(
  { d, }:
    { d: TProduct } ) {
  return (
    <LiCard>
      <ImgCard img={ d.img }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts>{ Rupiah( d.harga ) }</Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis }/>
              <Texts>{ d.lokasi }</Texts>
            </div>
            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
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

