import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteCard } from '@/app/components/Atom/Button/card/Delete';
import { EditCard } from '@/app/components/Atom/Button/card/Edit';
import { ImgCard } from '@/app/components/Atom/img/ImgCard';
import { TextBody, Texts, TextTitle } from '@/app/components/Atom/Text/TextCard';
import { TextHidden } from '@/app/components/Atom/Text/TextHidden';
import { CardBody, CardButton, LiCard } from '@/app/components/molecules/card/Card';

export const to = "product"

export default function ListProduct(
  { d, }:
    { d: TProduct } ) {
  return (
    <LiCard name={ d.nama }>
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
          <EditCard to={ to } id={ d.id } name={ d.nama }/>
          <DeleteCard to={ to } id={ d.id } name={ d.nama }/>
        </CardButton>

      </CardBody>
    </LiCard>

  )
}

