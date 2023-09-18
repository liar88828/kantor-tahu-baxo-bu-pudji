import { DeleteCard } from '@/app/elements/button/card/Delete';
import { EditCard } from '@/app/elements/button/card/Edit';
import { ButtonAction } from '@/app/elements/button/card/ActionButton';
import { CardBody, LiCard, UlCard } from '@/app/elements/card/Card';
import { ImgCard } from '@/app/elements/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/elements/Text/TextCard';
import { formatPhone } from '@/lib/utils/formatPhone';

export const to = "bank"

export function ListBank( { data }: {
  data: TBank[ ]
} ) {
  return (

    <UlCard>
      { data.map( ( d: TBank ) => (
        <LiCard key={ d.id }>
          <ImgCard img={ d.img }/>
          <CardBody>
            <div>
              <TextTitle text={ d.nama }/>
              <TextBody>
                <div>
                  <Texts>{ formatPhone( d.hp ) }</Texts>
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

