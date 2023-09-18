
export type TOrder = {
  listOrderan: TProduct[ ]
  listItem: TProduct[ ]
  semuaProduct: TProduct[]
} & TOrderanData


export type TOnlyKey = Record<keyof TOrder, any>

