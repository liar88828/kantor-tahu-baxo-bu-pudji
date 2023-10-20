import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/components/Atom/Button/card/Delete';
import { EditCard } from '@/app/components/Atom/Button/card/Edit';

import { imageValid, ImgCard } from '@/app/components/Atom/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/components/Atom/Text/TextCard';
import { TextHidden } from '@/app/components/Atom/Text/TextHidden';
import { CardBody, CardButton, LiCard } from '@/app/components/molecules/card/Card';

export const to = "travel"

export function ListTravel(
  { d }:
    { d: TTravel }
) {
  return ( <LiCard name={ d.nama }>
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
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard id={ d.id } to={ to } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}