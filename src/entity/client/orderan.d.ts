import type { TOrderanData } from '@/entity/Orderan';

type Props =
  {
    tag?: keyof JSX.IntrinsicElements;
  }
  & React.HTMLAttributes<HTMLOrSVGElement>;

export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: TProduct[]
} & TOrderanData

export type Thitung = {
  semuaHargaOrderan: number,
  semuaHargaItem: number,
  semuaHargaProduct: number,
  totalHarga: number
}

export type TOnlyKey = Record<keyof TOrder, any>

