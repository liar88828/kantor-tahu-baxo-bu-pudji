import { Rupiah } from '@/lib/utils/rupiah';
import { ImgCard } from '@/app/components/Atom/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/components/Atom/Text/TextCard';
import { TextHidden } from '@/app/components/Atom/Text/TextHidden';
import { EditCard } from '@/app/element/Edit';
import { DeleteCard } from '@/app/element/Delete';
import { ToModel } from '@/interface/Utils';
import { CardBody, CardButton, LiCard } from '@/app/components/Card';

export const to = "product"

export default function ListProduct(
  { d, to }:
    { d: TProduct, to: ToModel } ) {
  return (
    <LiCard name={ d.nama }>
      <ImgCard img={ d.img }/>
      <CardBody>
        <div>
          <TextTitle text={ d.nama }/>
          <TextBody>
            <div>
              <Texts><span className={ 'badge badge-primary' }>{ Rupiah( d.harga ) }</span></Texts>
              <TextHidden title={ "Jenis : " } value={ d.jenis }/>
              <Texts>{ d.lokasi }</Texts>
            </div>
            <div>
              <TextHidden title={ "Keterangan : " } value={ d.keterangan }/>
            </div>
          </TextBody>
        </div>

        <CardButton>
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

