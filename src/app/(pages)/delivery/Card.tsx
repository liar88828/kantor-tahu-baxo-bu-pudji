import { Rupiah } from '@/lib/utils/rupiah';

import { imageValid, ImgCard } from '@/app/components/Atom/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/components/Atom/Text/TextCard';
import { TextHidden } from '@/app/components/Atom/Text/TextHidden';
import { EditCard } from '@/app/element/Edit';
import { DeleteCard } from '@/app/element/Delete';
import { ToModel } from '@/interface/Utils';
import { CardBody, CardButton, LiCard } from '@/app/components/Card';

export function ListTravel(
  { d, to }:
    { d: TDelivery, to: ToModel }
) {
  // console.log(d.img)
  return ( <LiCard name={ d.nama }>
      <ImgCard img={ imageValid( d.img ) }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts><span className={ 'badge badge-primary' }> { d.hp }</span></Texts>
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