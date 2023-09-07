import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/DeleteCard';
import { EditCard } from '@/app/elements/button/EditCard';
import { ButtonAction } from '@/app/elements/button/ActionButton';
import { CardBody, LiCard, UlCard } from '@/app/elements/card/Card';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';

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
                  <Texts>
                    <span className={ "hidden sm:block" }>Jenis : </span>{ d.jenis }
                  </Texts>
                  <Texts>{ d.lokasi }</Texts>
                </div>

                <div>
                  <Texts>
                    <span className={ "hidden sm:block" }>Keterangan : </span>{ d.keterangan }
                  </Texts>
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

