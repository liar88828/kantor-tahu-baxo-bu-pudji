"use client"
// import './index.css'

import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import React from 'react';
import { Person, TOrderTotal } from '../../../components/data';
import excel from '../../../lib/excel';

const columnHelper = createColumnHelper<TOrderTotal>()

export default function Table() {
  const [ data, setData ] = React.useState<TOrderTotal[]>( () => [ ...Person ] );
  const rerender = React.useReducer( () => ( {} ), {} )[ 1 ];
  const [ sorting, setSorting ] = React.useState<SortingState>( [] )

  // const rerender = React.useReducer(() => ({}), {})[1]

  // let datas: any = []

  /* @ts-ignore */
  const columns = React.useMemo<ColumnDef<Person>[]>( () => [

    columnHelper.accessor( 'no',
      {
        header: "No",
        cell: info => info.getValue<number>(),
        footer: info => info.column.id,

      } ),

    // {      header: "tanggal", footer: props => {props.column.id}, columns: [
    //     {
    //       accessorKey: 'pesan',
    //       header: () => 'Pesan',
    //       // cell: info => info.renderValue(),
    //       footer: info => info.column.id,
    //     },
    //
    //     {
    //       accessorKey: 'kirim',
    //       header: () => 'Kirim',
    //       // cell: info => info.renderValue(),
    //       footer: info => info.column.id,
    //     },
    //   ]
    // },

    // columnHelper.accessor( 'no',
    //   {
    //     header: "No",
    //     // cell: info => info.getValue<number>(),
    //     footer: info => info.column.id,
    //
    //   } ),

    {
      header: "Pengirim", footer: props => {props.column.id}, columns: [
        columnHelper.accessor( 'pengirim',
          {
            header: 'pengirim',
            footer: info => info.column.id,
          } ),

        columnHelper.accessor( 'hp_pengirim',
          {
            header: "hp_pengirim",
            footer: info => info.column.id,
          } ),

      ]
    },

    {
      header: "Penerima", footer: props => {props.column.id}, columns: [

        columnHelper.accessor( 'penerima',
          {
            header: 'penerima',
            footer: info => info.column.id,
          } ),
        columnHelper.accessor( 'alamat_penerima',
          {
            header: 'alamat_penerima',
            footer: info => info.column.id,
          } ),
        columnHelper.accessor( 'hp_penerima',
          {
            header: 'hp_penerima',
            footer: info => info.column.id,
          } ),
      ]
    },

    {
      header: "Product", footer: props => {props.column.id}, columns: [

        columnHelper.accessor( 'orderan',
          {
            header: 'orderan',
            footer: info => info.column.id,
          } ),
        columnHelper.accessor( 'harga_orderan',
          {
            header: 'harga_orderan',
            // footer: info => info.column.id,
            footer: info => {
              return info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.harga_orderan, 0 )
            }
          } ),

        columnHelper.accessor( 'jumlah_orderan',
          {
            header: 'jumlah_orderan',
            // footer: info => info.column.id,
            footer: info => {
              return info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.jumlah_orderan, 0 )
            }
          } ),

        columnHelper.accessor( 'item',
          {
            header: 'item',
            footer: info => info.column.id,
          } ),

        columnHelper.accessor( 'harga_item',
          {
            header: 'harga_item',
            // footer: info => info.column.id,
            footer: info => {
              return info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.harga_item, 0 )
            }
          } ),

        columnHelper.accessor( 'jumlah_item',
          {
            header: 'jumlah_item',
            // footer: info => info.column.id,
            footer: info => {
              return info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.jumlah_item, 0 )
            },
          } ),

      ]
    },

    columnHelper.accessor( 'ekspedisi', {
      header: 'ekspedisi',
      footer: info => info.column.id,
    } ),

    columnHelper.accessor( 'ongkir', {
      header: 'ongkir',
      // footer: info => info.column.id,
      footer: ( info ) => {
        return info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.ongkir, 0 )
        // @ts-ignore
        // info.table.getRowModel().rows.reduce((acc, current) => acc + current, 0);
        // info.table.getRowModel().rows.reduce((a,b)=>)
        // .map( e => e.original.ongkir )
        // datas.push()
      }

    } ),

    columnHelper.accessor( 'pembayaran', {
      header: 'pembayaran',
      footer: ( info ) => info.column.id
    } ),
    //()
    // .reduce(
    //     (acc: number, row: Person) => acc + row.visits,
    //     0
    //   );
    //   return <strong>{sum}</strong>;
    // },
    // }, ),

    columnHelper.accessor( 'lokasi', {
      header: 'lokasi',
      footer: info => info.column.id,
    } ),

    columnHelper.accessor(
      'total_bayar', {
        id: "total_bayar",
        header: 'total_bayar',
        footer: info => info.table.getRowModel().rows.reduce( ( total, row ) => total + row.original.total_bayar, 0 )

      }
    ),
    // footer: info => info.column.id
    // footer: info => info.table.getRowModel()

    columnHelper.accessor(
      'keterangan',
      {

        header: 'keterangan',
        cell: info => <i className={ "line-clamp-2" }>{ info.getValue() }</i>,
        footer: info => info.column.id,
      } ),

  ] )

// function sumBy<T>(values: T[], key: keyof T): number {
//   return values.reduce((total, value) => total + value[key], 0);
// }

  // console.log(sum)

  const table = useReactTable( {
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  } );

  const [ state, setState ] = React.useState( table.initialState )

  table.setOptions( prev => ( {
    ...prev,
    state,
    onStateChange: setState,
    debugTable: state.pagination.pageIndex > 2,
  } ) )

  // table.getRowModel().rows.map( e => console.log( e.original.harga_orderan. ) )
  // table.getRowModel().rows.map( e => {
  //   datas.push( e.original.harga_orderan )
  //   // console.log(
  //   datas
  //   // )
  // } )

  const sumBy = ( a: any ) => a.reduce( ( acc: any, current: any ) => acc + current, 0 );
  console.log( sumBy )
  return (
    <div className="p-2">
      <div className="h-2">
        <table>
          <thead>
          { table.getHeaderGroups().map( ( headerGroup ) => (
            <tr key={ headerGroup.id }>
              { headerGroup.headers.map( ( header ) => (
                <th key={ header.id } colSpan={ header.colSpan }>
                  { header.isPlaceholder ? null
                    : ( <div
                        { ...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : '',
                          onClick: header.column.getToggleSortingHandler(),
                        } }
                      >
                        { flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) }

                        { {
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[ header.column.getIsSorted() as string ] ?? null }

                      </div>
                    ) }
                </th>
              ) ) }
            </tr>
          ) ) }
          </thead>
          <tbody>
          { table.getRowModel().rows
          .slice( 0, 10 )
          .map( ( row ) => (
            <tr key={ row.id }>
              { row.getVisibleCells()
              .map( ( cell ) => (
                <td key={ cell.id }>
                  { flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext() ) }
                </td>
              ) ) }
            </tr>
          ) ) }
          </tbody>

          <tfoot>
          { table.getFooterGroups().map( ( footerGroup ) => (
            <tr key={ footerGroup.id }>
              { footerGroup.headers.map( ( header ) => (
                <th key={ header.id }>
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


        <div className="h-2"/>
        <div className="flex items-center gap-2">
          <button
            className="border rounded p-1"
            onClick={ () => table.setPageIndex( 0 ) }
            disabled={ !table.getCanPreviousPage() }
          >
            { '<<' }
          </button>
          <button
            className="border rounded p-1"
            onClick={ () => table.previousPage() }
            disabled={ !table.getCanPreviousPage() }
          >
            { '<' }
          </button>
          <button
            className="border rounded p-1"
            onClick={ () => table.nextPage() }
            disabled={ !table.getCanNextPage() }
          >
            { '>' }
          </button>
          <button
            className="border rounded p-1"
            onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) }
            disabled={ !table.getCanNextPage() }
          >
            { '>>' }
          </button>
          <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            { table.getState().pagination.pageIndex + 1 } of{ ' ' }
            { table.getPageCount() }
          </strong>
        </span>
          <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={ table.getState().pagination.pageIndex + 1 }
            onChange={ e => {
              const page = e.target.value ? Number( e.target.value ) - 1 : 0
              table.setPageIndex( page )
            } }
            className="border p-1 rounded w-16"
          />
        </span>
          <select
            value={ table.getState().pagination.pageSize }
            onChange={ e => {
              table.setPageSize( Number( e.target.value ) )
            } }
          >
            { [ 10, 20, 30, 40, 50 ].map( pageSize => (
              <option key={ pageSize } value={ pageSize }>
                Show { pageSize }
              </option>
            ) ) }
          </select>
          {/*{dataQuery.isFetching ? 'Loading...' : null}*/ }
        </div>
        <div>{ table.getRowModel().rows.length } Rows</div>
        {/*<div>*/ }
        {/*  <button onClick={ () => rerender() }>Force Rerender</button>*/ }
        {/*</div>*/ }
        {/*<pre>{JSON.stringify(pagination, null, 2)}</pre>*/ }
        {/*</div>*/ }


        <div className="h-4"/>
        <button onClick={ () => excel.exportToExcel( table ) } className="border p-2">
          Export to Excel
        </button>
        <div className="h-4"/>
        <button onClick={ () => rerender() } className="border p-2">
          Rerender
        </button>
      </div>
    </div>
  );
}