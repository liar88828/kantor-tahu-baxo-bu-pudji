"use client"
import React, { useMemo, useState } from 'react';
import {
  Column, ColumnDef, ColumnOrderState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';
import { Filter } from '@/app/components/Atom/input/Filter';
import { formatPhone } from '@/lib/utils/formatPhone';
import { Rupiah } from '@/lib/utils/rupiah';
import { DeleteTable } from '@/app/(pages)/(Transaction)/table/DeleteTable';
import { newSetTanggal, setTanggal } from '@/lib/utils/formatDate';
import { setColumn } from '@/app/components/organisme/table/utils/SetColumn';
import { getOrderan } from '@/app/components/organisme/table/utils/GetOrderan';
import { StatusButton } from '@/app/(pages)/dashboard/card/StatusButton';
import { exportToExcel } from '@/app/(pages)/print/excel/excel';
import { TOrderServer } from '@/interface/orderan';
import EditTable from '@/app/(pages)/(Transaction)/table/EditTable';
import { CheckBox } from '@/app/(pages)/(Transaction)/table/CheckBox';
import PrintButton from '@/app/(pages)/(Transaction)/table/PrintButton';

//-------------------------Main Table
export function TableOrder( { dataOrderan }: {
  dataOrderan: {
    msg: string,
    data: TOrderServer[]
  },
} ) {

  // console.log( dataOrderan.data )

  const { data } = dataOrderan
  // const router   = useRouter()

  const [ rowShow, setRowShow ] = useState<number>( 1 )

  // sorting
  const [ sorting, setSorting ] = useState<SortingState>( [] )

  // visibility
  const [ columnVisibility, setColumnVisibility ] = useState( {} )
  const [ columnOrder, setColumnOrder ]           = useState<ColumnOrderState>( [] )

  //check box
  const [ rowSelection, setRowSelection ] = useState( {} )
  const [ open, setOpen ]                 = useState( true )

  const ToggleOn = Object.keys( columnVisibility ).length === 0
                   ? true
                   : Object.values( columnVisibility )
                           .every( ( value ) => value );

  //---------table value---------------
  // @ts-ignore
  const columns = useMemo<ColumnDef<TOrderServer>[]>( () => [
      {
        id    : 'select',
        header: ( { table } ) => (
          <CheckBox
            { ...{
              checked      : table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange     : table.getToggleAllRowsSelectedHandler(),
            } }
          />
        ),

        cell: ( { row } ) => (
          <div className="px-1">
            <CheckBox
              { ...{
                checked      : row.getIsSelected(),
                disabled     : !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange     : row.getToggleSelectedHandler(),
              } }
            />
          </div>
        ),
      },
      // columnHelper.
      {
        accessorKey  : 'no',
        header       : "NO",
        enableSorting: true,
        cell         : info => info.row.index + 1,
        footer: "NO",
        // size:30,
        // maxSize:30
      },

      {
        accessorKey: 'id',
        header: 'ID',
        cell       : info => info.getValue(),
        footer: () => "ID",

      },

      {
        header : 'Tanggal',
        columns: [
          {
            accessorKey: 'pesan',
            header     : 'Pesan',
            footer     : "Pesan",
            cell: info => {
              // info.getValue()
              // newSetTanggal( info.getValue(), "tanggal" )
              return setTanggal( info.getValue(), "tanggal" )
            }
          },
          // {
          //   accessorKey: 'kirim',
          //   header     : 'Kirim',
          //   footer     : "Kirim",
          //   cell       : info => {//info.getValue()
          //     return info.getValue()
          //   // return   newSetTanggal( info.getValue(), "tanggal" )
          //   }
          // },
          {
            accessorKey: 'waktuKirim',
            header     : 'Waktu Kirim',
            footer     : 'Waktu Kirim',
            cell       : info => {
              // const d = new Date( info.getValue() )
              // return `${ d.getHours() } : ${ d.getMinutes() }`
              return newSetTanggal( info.getValue() )
            },

          },
        ],
      },

      {
        header : 'Nama',
        columns: [
          {
            accessorKey: 'pengirim',
            header    : 'Pengirim',
            accessorFn: row => row.pengirim,
            id        : "pengirim",
            cell       : info => info.getValue(),
            footer    : 'Pengirim',
          },
          {
            accessorKey: 'hpPengirim',
            header: 'Telepon Pengirim',
            cell  : info => formatPhone( info.getValue() as string ),
            footer: 'telepon Pengirim',
          },
          {
            accessorKey: 'penerima',
            header: 'Penerima',
            cell       : info => info.getValue(),
            footer: 'Penerima',
          },
        ],

      },

      {
        accessorKey: 'alamatPenerima',
        header     : 'Alamat Penerima',
        cell       : info => info.getValue(),
        footer: 'Alamat Penerima',
      },

      {
        accessorKey: 'hpPenerima',
        header     : 'Telephone Penerima',
        cell  : info => formatPhone( info.getValue() as string ),
        footer: 'Telephone Penerima',
      },
      // @ts-ignore
      getOrderan( "Tahu Bakso Rebus", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Tahu Bakso Goreng", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Bandeng Presto", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Otak-Otak Bandeng", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Bakso Sapi 20", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Bakso Sapi 12", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Bakso Aneka", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Nugget", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Rolade Tahu", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Rolade Singkong", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      // @ts-ignore
      getOrderan( "Tahu Bakso Vakum", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),

      {
        header : 'Lain-Lain',
        columns: [
          {
            accessorKey: 'semuaProduct',
            header     : 'Item',
            cell       : info => info.getValue()
                                     .filter( ( j: TProduct ) => j.jenis.replaceAll( " ", "" ) === "Item" )
                                     .map( ( d: TProduct ) => <p key={ d.id }> { d.jumlah }</p> ),
            footer     : props => {
              return props.table.getRowModel().rows
                          .map( m => m.original )
                          .map( m => m.semuaProduct
                                      .filter( ( f: TProOrderan ) => f.jenis === 'Item' )
                                      .map( ( m: TProOrderan ) => m.jumlah )
                                      .reduce( ( a: number, d: number ) => a + d, 0 )
                          ).reduce( ( a, d ) => a + d, 0 )
            },
          },
          {
            accessorKey: 'semuaProduct',
            header     : 'Total',
            cell       : info => info.getValue()
                                     .filter( ( j: TProduct ) => j.jenis.toLowerCase().includes( "item" ) )
                                     .map( ( d: TProduct ) => <p key={ d.id }>{ d.jumlah * d.harga }</p> ),
            footer     : props => {
              const rowFooter: number = props.table.getRowModel().rows
                                             .map( m => m.original )
                                             .map( m => m.semuaProduct
                                                         .filter( ( f: TProOrderan ) => f.jenis === 'Item' )
                                                         .map( ( m: TProOrderan ) => m.harga )
                                                         .reduce( ( a: number, d: number ) => a + d, 0 )
                                             ).reduce( ( a, d ) => a + d, 0 )

              return Rupiah( rowFooter )
            }
          },
        ],
      },

      {
        header : 'Ekspedisi',
        columns: [
          {
            accessorKey: 'namaPengiriman',
            header: 'Ekspedisi',
            cell  : info => info.getValue(),
            footer: 'Ekspedisi',
          },
          {
            accessorKey: 'ongkir',
            header: 'Ongkir',
            cell  : info => info.getValue(),
            footer: props => {
              const dFooters = props.table.getRowModel().rows
              const dFooter  = dFooters.reduce( ( total, row ) => total + row.original.ongkir, 0 )
              return Rupiah( dFooter )
            }
          },

          {
            accessorKey: 'status',
            header: 'Status',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },

        ],
      },

      {
        header : 'Total',
        columns: [

          {
            accessorKey: 'totalPenjualan',
            header     : 'Total',
            cell  : info => info.getValue(),
            footer: props => {
              const dFooters = props.table.getRowModel().rows
              const dFooter  = dFooters.reduce( ( total, row ) => total + row.original.totalPenjualan, 0 )
              return Rupiah( dFooter )
            }
          },
          {
            accessorKey: 'totalBayar',
            header: 'Total Bayar',
            cell  : info => info.getValue(),
            footer: props => {
              const dFooters = props.table.getRowModel().rows
              const dFooter  = dFooters.reduce( ( total, row ) => total + row.original.totalBayar, 0 )
              return Rupiah( dFooter )
            }
          },
          {
            accessorKey: 'typePembayaran',
            header     : 'Pembayaran',
            cell       : info => info.getValue(),
            footer: "Pembayaran",
          },
          {
            accessorKey: 'guna',
            header     : 'Keterangan',
            cell       : info => <span className={ "whitespace-nowrap" }> { info.getValue() }</span>,
            footer     : "Keterangan",
          },
        ],
      },

    ],
    [] )

  const table = useReactTable( {
    data,
    columns,
    state: {
      //sorting
      sorting,
      // visible
      columnVisibility,
      columnOrder,
      //select box
      rowSelection
    },

    //select box
    onRowSelectionChange: setRowSelection,

    //sort
    onSortingChange: setSorting,

    //visible
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange     : setColumnOrder,

    // Pipeline
    getCoreRowModel      : getCoreRowModel(),
    getFilteredRowModel  : getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel    : getSortedRowModel(),
    // debug
    // debugTable  : true,
    // debugHeaders: true,
    // debugColumns: true,

    // select and change

  } )

  if( !dataOrderan ) {
    return ( <h1>Data Kosong</h1> )
  }

  function ToggleName( column: Column<TOrderServer> ): any {
    // console.log( column.columnDef )
    if( column.columnDef.header !== undefined && typeof column.columnDef.header !== "function" ) {
      return column.parent === undefined
             ? column.columnDef.header
             : column.parent.id + " " + column.columnDef.header;
    }
    else {
      return column.parent === undefined
             ? column.columnDef.id
             : column.parent.id + " " + column.columnDef.header;
    }
  }

  let tables = table.getSelectedRowModel().flatRows

  // @ts-ignore
  return <div className="p-2 "

  >
    {/*------------Table------------*/ }
    <div className="overflow-x-scroll  border rounded border-black  w-[100%] ">

      <table className="table table-xs static ">
        {/*--------------------------------tHead---------------------------*/ }
        <thead>
        { table.getHeaderGroups().map( headerGroup => (
          <tr key={ headerGroup.id } className={ "  hover:bg-gray-50" }>

            { headerGroup.headers.map( header => {
              // console.log( header )
              return (
                <th

                  className={ " border border-black  hover:bg-gray-50 text-center bg-gray-200 text-black" }
                    key={ header.index } colSpan={ header.colSpan }>
                  { header.isPlaceholder ? null : (

                    <div
                      // data-test={header.column.columnDef.header}
                      data-test={ header.id }

                      { ...{
                        className: header.column.getCanSort()
                                   ? 'cursor-pointer select-none'
                                   : '',
                        onClick  : header.column.getToggleSortingHandler(),
                      } }
                    >
                      { flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      ) }

                      { {
                        asc : ' 🔼',
                        desc: ' 🔽',
                      }[ header.column.getIsSorted() as string ] ?? null }

                      { header.column.getCanFilter() ? (
                        <div>
                          <Filter column={ header.column } table={ table }/>
                        </div>
                      ) : null }
                    </div>
                  ) }
                </th>
              )
            } ) }
          </tr>
        ) ) }
        </thead>

        {/*--------------------------------tBody----------*/ }
        <tbody>{ table.getRowModel().rows
        // .slice( 0, 10 )
                      .map( ( row, i ) => (
                        <tr key={ row.original.id }
                            className={ ` bg-white hover:bg-slate-200 ${ i % 2 === 0 ? "bg-slate-50"
                                                                                     : "bg-slate-100" }` }
                        >
                          { row.getVisibleCells().map( ( cell, i ) => {
                            return (
                              <td className={ "border border-black " } key={ cell.id + `${ i }` }>
                                { flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                ) }
                              </td>
                            )
                          } ) }
                        </tr>
                      ) ) }
        </tbody>

        {/*--------------------------------tFoot----------*/ }
        <tfoot>
        { table.getFooterGroups().map( footerGroup => (
          <tr key={ footerGroup.id } className={ "hover:bg-gray-50" }>

            { footerGroup.headers.map( ( header, i ) => (
              <th key={ header.id + `${ i }` }
                  colSpan={ header.colSpan }
                  className={ " border border-black  hover:bg-gray-50 text-center bg-gray-200 text-black" }
              >
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

        <tr>
          <td className="p-1">
            <CheckBox
              { ...{
                checked      : table.getIsAllPageRowsSelected(),
                indeterminate: table.getIsSomePageRowsSelected(),
                onChange     : table.getToggleAllPageRowsSelectedHandler(),
              } }
            />
          </td>
          <td colSpan={ 20 }>Page Rows ({ table.getRowModel().rows.length })
          </td>

        </tr>
        </tfoot>

      </table>

    </div>

    {/*------------Move Page -----------*/ }
    <div className="flex overflow-x-auto items-center bg-white p-2 border ">
      <div className="px-2 flex flex-row items-center gap-2 rounded ">

        <button
          className="border rounded p-1 bg-gray-300 w-9 h-9"
          onClick={ () => table.setPageIndex( 0 ) }
          disabled={ !table.getCanPreviousPage() }
        >
          { '⏪' }
        </button>

        <button
          className="border rounded p-1 bg-gray-300 w-9 h-9"
          onClick={ () => table.previousPage() }
          disabled={ !table.getCanPreviousPage() }
        >
          { '⬅️' }
        </button>
        <button
          className="border rounded p-1 bg-gray-300 w-9 h-9"
          onClick={ () => table.nextPage() }
          disabled={ !table.getCanNextPage() }
        >
          { '➡️' }
        </button>

        <button
          className="border rounded p-1 bg-gray-300 w-9 h-9"
          onClick={ () => table.setPageIndex( table.getPageCount() - 1 ) }
          disabled={ !table.getCanNextPage() }
        >
          { '⏩' }
        </button>


        <span className="flex items-center gap-1  ">
            <div>Page</div>
            <strong>{ table.getState().pagination.pageIndex + 1 } of { table.getPageCount() }
            </strong>
         </span>

        <label htmlFor={ "Go Page" } className="flex items-center gap-1  p-2">| Go to page:
          <input
            name={ "Go Page" }
            type="number"
            className="border p-1 rounded  w-12"
            onChange={ e => {
              const page = e.target.value ? Number( e.target.value ) - 1 : 0
              table.setPageIndex( page )
            } }
            defaultValue={ table.getState().pagination.pageIndex + 1 }
          />

        </label>

        {/*--------------Show ---------------*/ }

        <label
          htmlFor={ "Max Row" }
          className="flex items-center gap-1  p-2">
          Max Row
          <input
            name={ "Max Row" }
            type={ 'number' }
            onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setRowShow( Number( e.target.value ) ) }

            className={ "border border-black w-10" }
          />
          <select
            className={ "p-1 rounded" }
            value={ table.getState().pagination.pageSize }
            onChange={ e => table.setPageSize( Number( e.target.value ) ) }
          >
            { [ 10, rowShow, 20, 30, 40, 50 ].map( ( pageSize, i ) => (
              <option key={ pageSize + `${ i }` } value={ pageSize }>
                Show { pageSize }
              </option>
            ) ) }
          </select>
        </label>
      </div>
    </div>

    <div className="flex gap-2 overflow-x-auto w-auto flex-wrap">

      {/*------------Check Visible----------------*/ }


      { tables.length > 0 ?
        ( <DeleteTable ids={ tables.map( d => d.original.id as string ) }
        /> ) : ""
      }


      { tables.length === 1 &&
        ( <EditTable id={ tables[ 0 ].original.id as string }/> ) }

      { ToggleOn && tables.length > 0 &&
        <button onClick={ () => {
          exportToExcel( table.getRowModel().flatRows as any )
          // exportToExcel( table.getRowModel()
          //                       .rows.map( row => {
          //     return row.cells.map( cell => ( {
          //       value: cell.value,
          //       style: {
          //         background: getBackgroundColorForRow( cell.row.original.color )
          //       }
          //     } ) )
          //   } )
          // )
        } } className=" btn btn-sm sm:btn-md text-white bg-green-400 ">
          Excel
        </button> }
      {/* @ts-ignore*/ }
      { tables.length > 0 && <PrintButton title={ "Memo" } color={ "bg-orange-400" } table={ tables }/> }
      {/* @ts-ignore*/ }
      { tables.length > 0 && <PrintButton title={ "Termal" } color={ "bg-yellow-400" } table={ tables }/> }

      { tables.length === 1
        && <StatusButton
          id={ tables[ 0 ].original.id as string }
          status={ tables[ 0 ].original.status }
        /> }

      <div>
        <button
          onClick={ () => setOpen( !open ) }
          className={ " btn btn-sm sm:btn-md text-white bg-purple-600 mb-2" }>
          { open ? "Open" : "Close" }
        </button>


        <div className={ `cursor-pointer gap-2 text-white rounded flex flex-wrap ${ open ? "hidden" : "" }` }>

          <div className="p-1 border border-black text-black z-50 rounded bg-white w-fit ">
            <label htmlFor={ "checkbox1" }>
              <input
                name={ "checkbox1" }
                className={ "mr-1" }
                { ...{
                  type    : 'checkbox',
                  checked : table.getIsAllColumnsVisible(),
                  onChange: table.getToggleAllColumnsVisibilityHandler(),
                } }
              />
              Toggle All
            </label>
          </div>

          { table.getAllLeafColumns().map( ( column, i ) => ( <div
              key={ column.id + `${ i }` }
              className={ `p-1 border border-black text-black z-50 rounded ${
                setColumn( column ) }` }>
              <label htmlFor={ "checkbox2" }>
                <input
                  name={ "checkbox2" }
                  className={ "mr-1" }

                  { ...{
                    type    : 'checkbox',
                    checked : column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  } }
                />
                {/*{ i + 1 }.*/ }
                { ToggleName( column ) }
              </label>
            </div>
          ) ) }
        </div>
      </div>


    </div>


    {/*------------DEBUG-----*/ }
    {/*<div className="">*/ }
    {/*  <div>{ table.getRowModel().rows.length } Rows</div>*/ }
    {/*  <pre>{ JSON.stringify( table.getState().pagination, null, 2 ) }</pre>*/ }
    {/*  <pre>{ JSON.stringify( sorting, null, 2 ) }</pre>*/ }
    {/*</div>*/ }
  </div>
}

