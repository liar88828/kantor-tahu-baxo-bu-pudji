'use client'
import React from 'react'

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, } from '@tanstack/react-table'
import { TOrder } from '@/entity/orderan';

// const columnHelper = createColumnHelper<TPeople>()

// const columns = [
//   columnHelper.group( {
//     header: 'Info',
//     footer: props => props.column.id,
//     columns: [
//       columnHelper.accessor( '', {
//         header: () => '',
//         footer: props => props.column.id,
//       } ),

//       columnHelper.group( {
//         header: 'More Info',
//         columns: [
//           columnHelper.accessor( 'id', {
//             header: () => "id",
//             footer: info => info.column.id,
//           } ),
//           columnHelper.accessor( 'pesan', {
//             header: () => "pesan",
//             footer: info => info.column.id,
//           } ),
//           columnHelper.accessor( 'kirim', {
//             header: () => 'kirim',
//             footer: info => info.column.id,
//           } ),
//         ]
//       } ),
//     ]
//   } ),
//   columnHelper.accessor( 'pengirim', {
//     header: () => <span>pengirim</span>,
//     footer: info => info.column.id,
//   } ),
//   columnHelper.accessor( 'alamat_penerima', {
//     header: 'alamat_penerima',
//     footer: info => info.column.id,
//   } ),
//   columnHelper.accessor( 'hp_penerima', {
//     header: 'Profile hp_penerima',
//     footer: info => info.column.id,
//   } ),
//   columnHelper.accessor( 'orderan', {
//     header: ' orderan',
//     footer: info => info.column.id,
//   } ),
//   columnHelper.accessor( 'jumlah', {
//     header: ' jumlah',
//     footer: info => info.column.id,
//   } ),
//   columnHelper.accessor( 'total', {
//     header: 'total',
//     // footer: ( info ) => <span>{ sum(info.column.to) }</span>,
//   } ),
// ]

const columnHelper = createColumnHelper<TOrder>()

const columns = [
  columnHelper.accessor( "total.no", {} ),

  columnHelper.group( {
    id: 'tanggal',
    header: () => <span>tanggal</span>,
    columns: [
      columnHelper.accessor( 'tanggal.pesan', {} ),
      columnHelper.accessor( "tanggal.kirim", {} ),
    ],
  } ),

  columnHelper.group( {
    header: 'Nama', columns: [
      columnHelper.accessor( 'orang.pengirim', { header: 'pengirim', } ),
      columnHelper.accessor( 'orang.hpPengirim', { header: 'hp_pengirim', } ),
      columnHelper.accessor( 'orang.penerima', { header: 'penerima', } ),
    ],
  } ),

  columnHelper.accessor( "orang.alamatPenerima", {} ),
  columnHelper.accessor( "orang.hpPenerima", { cell: info => info.getValue(), } ),
  columnHelper.accessor( "listOrderan", {} ),

  columnHelper.group( {
    header: 'lain lain', columns: [
      columnHelper.accessor( 'listItem', { header: 'item', } ),
      columnHelper.accessor( 'total', { header: 'total', } ),
    ],
  } ),
  columnHelper.accessor( "travel.ekspedisi", {} ),
  columnHelper.accessor( "travel.ongkir", {} ),
  columnHelper.accessor( "total", {} ),
  columnHelper.accessor( "total.totalBayar", {} ),
  columnHelper.accessor( "total.totalPenjualan", {} ),

]

export function Tables() {
  const [ data, setData ] = React.useState( () => [] )
  const rerender = React.useReducer( () => ( {} ), {} )[ 1 ]

  const table = useReactTable( {
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  } )

  return (
    <div className="p-2">
      <table>
        <thead>
        { table.getHeaderGroups().map( headerGroup => (
          <tr key={ headerGroup.id }>
            { headerGroup.headers.map( header => (
              <th key={ header.id } colSpan={ header.colSpan }>
                { header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  ) }
              </th>
            ) ) }
          </tr>
        ) ) }
        </thead>
        <tbody>
        { table.getRowModel().rows.map( row => (
          <tr key={ row.id }>
            { row.getVisibleCells().map( cell => (
              <td key={ cell.id }>
                { flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                ) }
              </td>
            ) ) }
          </tr>
        ) ) }
        </tbody>

        <tfoot>
        { table.getFooterGroups().map( footerGroup => (
          <tr key={ footerGroup.id }>
            { footerGroup.headers.map( header => (
              <th
                key={ header.id }
                colSpan={ header.colSpan }>
                { header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  ) }
              </th>
            ) ) }
          </tr>
        ) ) }
        </tfoot>
      </table>
      <div className="h-4"/>
      <button onClick={ () => rerender() } className="border p-2">
        Rerender
      </button>
    </div>
  )
}