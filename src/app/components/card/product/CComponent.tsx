import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';
import { ButtonAction } from '@/app/elements/button/card/ActionButton';
import { CardBody, LiCard, UlCard } from '@/app/elements/card/Card';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';
import { TextHidden } from '@/app/elements/Text/TextHidden';

export const to = "product"

export function ListProduct( { data }: {
  data: TProduct[ ]
} ) {
  return (

    <UlCard>
      { data.map( ( d: TProduct ) => (
        <LiCard key={ d.id }>

          <ImgCard img={ d.img }/>
          <CardBody>
            <div>
              <TextTitle text={ d.nama }/>
              <TextBody>
                <div>
                  <Texts>{ Rupiah( d.harga ) }</Texts>
                  <TextHidden title={ "Jenis" } value={ d.jenis }/>
                  <Texts>{ d.lokasi }</Texts>
                </div>
                <div>
                  <TextHidden title={ "Keterangan" } value={ d.keterangan }/>
                </div>
              </TextBody>
            </div>

            <ButtonAction>
              <EditCard to={ to } id={ d.id }/>
              <DeleteCard to={ to } id={ d.id }/>
            </ButtonAction>

          </CardBody>
        </LiCard>
      ) ) }
    </UlCard>
  )
}

