import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/elements/button/DeleteCard';
import { EditCard } from '@/app/elements/button/EditCard';
import { ButtonAction } from '@/app/elements/button/ActionButton';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { CardBody, LiCard, UlCard } from '@/app/elements/card/Card';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';

export const to = "travel"

export function CardTravel( { data }: {
  data: TTravel[]
} ) {
  return (
    <UlCard>
      { data.map( ( d ) => (
        <LiCard key={ d.id }>
          <ImgCard img={ d.img ?? "" }/>

          <CardBody>
            <div>
              <TextTitle text={ d.namaPengiriman }/>
              <TextBody>
                <div>
                  <Texts>{ d.noHpPerusahaan }</Texts>
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
      ) ) }
    </UlCard>
  )
}