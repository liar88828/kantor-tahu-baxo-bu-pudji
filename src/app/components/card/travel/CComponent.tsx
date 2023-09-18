import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';
import { ButtonAction } from '@/app/elements/button/card/ActionButton';
import { imageValid, ImgCard } from '@/app/elements/img/ImgCard';
import { CardBody, LiCard, UlCard } from '@/app/elements/card/Card';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';

export const to = "travel"

export function CardTravel( { data }: {
  data: TTravel[]
} ) {
  return (
    <UlCard>
      { data.map( ( d ) => {
        const img = imageValid( d.img )
        // console.info(d.id)
        return (
          <LiCard key={ d.id }>
            <ImgCard img={ img }/>
            <CardBody>
              <div>
                <TextTitle text={ d.nama }/>
                <TextBody>
                  <div>
                    <Texts>{ d.hp }</Texts>
                    <Texts>{ d.lokasi }</Texts>
                    <Texts>Kisaran Biaya { Rupiah( d.harga ) }</Texts>
                    <Texts>
                      <span className={ "hidden sm:block" }>Jenis : </span>
                      { d.jenis }
                    </Texts>
                  </div>

                  <div>
                    <Texts>
                      <span className={ "hidden sm:block" }>Keterangan : </span> { d.keterangan }
                    </Texts>
                  </div>
                </TextBody>
              </div>

              <ButtonAction>
                <EditCard to={ to } id={ d.id }/>
                <DeleteCard id={ d.id } to={ to }/>
              </ButtonAction>

            </CardBody>
          </LiCard>
        )
      } ) }
    </UlCard>
  )
}