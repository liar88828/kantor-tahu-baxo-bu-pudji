"use client"
import { CellContext, HeaderContext, Row, RowData } from '@tanstack/table-core';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import {
  ColumnDef, ColumnOrderState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';

import { notifyData } from '@/app/utils/notif/toash';
import type { TOrderServer } from '@/entity/server/orderan';
import { useRouter } from 'next/navigation';
import { useSkipper } from '@/app/components/table/utils/Skipper';
import { IndeterminateCheckbox } from '@/app/components/table/utils/IndeterminateCheckbox';
import { Filter } from '@/app/components/table/utils/FirstValue';
import { exportToExcel } from '@/lib/export/excel';
import { deleteDataMany, deleteDataOne } from '@/app/utils/ress/orderan';
import { TPOrderan } from '@/entity/server/produkOrderan';
import { TOrderanData } from '@/entity/orderan';
import { formatPhoneNumber } from '@/lib/utils/formatNumber';
import { Rupiah } from '@/lib/utils/rupiah';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: ( rowIndex: number, columnId: string, value: unknown ) => void
  }
}

//-------------------------Main Table
export function TableOrder( { dataOrderan }: {
  dataOrderan: {
    msg: string,
    data: TOrderServer[]
  },
} ) {

  // console.log( dataOrderan.data )

  const { data: dataOrder } = dataOrderan
  const router              = useRouter()

  const [ rowShow, setRowShow ] = useState<number>( 1 )

  // sorting
  const [ sorting, setSorting ] = useState<SortingState>( [] )

  // visibility
  const [ columnVisibility, setColumnVisibility ] = useState( {} )
  const [ columnOrder, setColumnOrder ]           = useState<ColumnOrderState>( [] )

  //check box
  const [ rowSelection, setRowSelection ] = useState( {} )
  const [ data, setData ]                 = useState( dataOrder )
  const [ open, setOpen ]                 = useState( true )

  const [ autoResetPageIndex, skipAutoResetPageIndex ] = useSkipper()
  const [ selected, setSelected ]                      = useState<string | number[]>( [] );

  function getOrderan(
    header: string,
    lokasi: [ "semarang", "ungaran" ],
    jenis: [ "orderan", "item" ]
  ) {

    function cellData(
      info: CellContext<{
        semuaProduct: TPOrderan[];
        pesan: Date | string;
        kirim: Date | string;
        waktuKirim: Date | string
      } & TOrderanData, any>,
      lok: string
    ) {
      return info.getValue()
                 .filter( ( j: TProduct ) => {
                   const namas   = j.nama.includes( header )
                   const jeniss  = j.jenis.toLowerCase().includes( jenis[ 0 ] )
                   const lokasis = j.lokasi.toLowerCase().includes( lok )
                   return namas && jeniss && lokasis
                 } )
                 .map( ( d: TProduct ) => ( <p key={ d.id }>{ d.jumlah }</p> ) );
    }

    function footerData(
      props: HeaderContext<TOrderServer, any>,
      lok: string,
      parent: string = ""
    ) {
      function getNumber(
        m: {
          semuaProduct: TPOrderan[];
          pesan: Date | string;
          kirim: Date | string;
          waktuKirim: Date | string
        } & TOrderanData,
        option: "harga" | "jumlah"
      ) {
        return m.semuaProduct
                .filter( ( f ) => {
                  const namas   = f.nama.includes( header )
                  const jeniss  = f.jenis.toLowerCase().includes( jenis[ 0 ] )
                  const lokasis = f.lokasi.toLowerCase().includes( lok )
                  if( parent === "parent" ) {
                    return jeniss && namas
                  }

                  return jeniss && namas && lokasis
                } )
                .map( m => {
                  if( option === "jumlah" ) return m.jumlah
                  if( option === "harga" ) return m.harga
                  return 0
                } )
                .reduce( ( a, d ) => a + d, 0 );
      }

      const jumlah = props.table.getRowModel().rows
                          .map( m => m.original )
                          .map( m => getNumber( m, "jumlah" )
                          ).reduce( ( a, d ) => a + d, 0 )

      if( parent === "parent" ) {
        const harga = props.table.getRowModel().rows
                           .map( m => m.original )
                           .map( m => getNumber( m, "harga" )
                           ).reduce( ( a, d ) => a + d, 0 )
        return `Jumlah ${ jumlah } : ${ Rupiah( harga * jumlah ) }`
      }
      return jumlah

    }

    return {
      header: header,
      footer: ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 1 ], "parent" ),

      columns:
        [
          {
            accessorKey: 'semuaProduct',
            header     : 'UNG',
            cell  : ( info: CellContext<TOrderServer, any> ) => cellData( info, lokasi[ 1 ] ),
            footer: ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 1 ], "" ),

          },
          {
            accessorKey: 'semuaProduct',
            header     : 'SMG',
            cell  : ( info: CellContext<TOrderServer, any> ) => cellData( info, lokasi[ 0 ] ),
            footer: ( props: HeaderContext<TOrderServer, any> ) => footerData( props, lokasi[ 0 ] ),
          }
        ],
    };
  }

//---------table value---------------
  const columns = useMemo<ColumnDef<TOrderServer>[]>( () => [
      {
        id    : 'select',
        header: ( { table } ) => (
          <IndeterminateCheckbox
            { ...{
              checked      : table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange     : table.getToggleAllRowsSelectedHandler(),
            } }
          />
        ),

        cell: ( { row } ) => (
          <div className="px-1">
            <IndeterminateCheckbox
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
            cell       : info => {
              const d = new Date( info.getValue() )
              return `${ d.getFullYear() }-${ d.getMonth() }-${ d.getDate() }`

            },
          },
          {
            accessorKey: 'kirim',
            header     : 'Kirim',
            footer     : "Kirim",
            cell       : info => {
              const d = new Date( info.getValue() )
              return `${ d.getFullYear() }-${ d.getMonth() }-${ d.getDate() }`
            },
          }, {
            accessorKey: 'waktuKirim',
            header     : 'Waktu Kirim',
            footer     : 'Waktu Kirim',
            cell       : info => {
              const d = new Date( info.getValue() )
              return `${ d.getHours() } : ${ d.getMinutes() }`
            },

          },
        ],
      },

      {
        header : 'Nama',
        columns: [
          {
            accessorKey: 'pengirim',
            header: 'Pengirim',
            accessorFn: row => row.pengirim,
            id        : "pengirim",
            cell       : info => info.getValue(),
            footer: 'Pengirim',
          },
          {
            accessorKey: 'hpPengirim',
            header: 'Telepon Pengirim',
            cell  : info => formatPhoneNumber( info.getValue() as string ),
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
        cell  : info => formatPhoneNumber( info.getValue() as string ),
        footer: 'Telephone Penerima',
      },

      getOrderan( "Tahu Bakso Rebus", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Tahu Bakso Goreng", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Bandeng Presto", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Otak-Otak Bandeng", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Bakso Sapi 20", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Bakso Sapi 12", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Bakso Aneka", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Nugget", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Rolade Tahu", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
      getOrderan( "Rolade Singkong", [ "semarang", 'ungaran' ], [ "orderan", "item" ] ),
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
                                      .filter( f => f.jenis === 'Item' )
                                      .map( m => m.jumlah )
                                      .reduce( ( a, d ) => a + d, 0 )
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
                                                         .filter( f => f.jenis === 'Item' )
                                                         .map( m => m.harga )
                                                         .reduce( ( a, d ) => a + d, 0 )
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
            footer     : props => props.column.id,
          },
        ],
      },

    ],
    [] )

  const defaultColumn: Partial<ColumnDef<TOrderServer>> = {
    cell: ( { getValue, row: { index }, column: { id }, table } ) => {
      const initialValue = getValue()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [ value, setValue ] = useState( initialValue )

      const onBlur = () => table.options.meta?.updateData( index, id, value )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect( () => { setValue( initialValue )}, [ initialValue ] )
      // console.log( table)
      return (
        <input value={ value as string }
               onChange={ e => {
                 setValue( e.target.value )

               } }
               onBlur={ onBlur }/>
      )
    },
  }

  const table = useReactTable( {
    data,
    columns,
    defaultColumn,
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
    autoResetPageIndex,
    // debug
    // debugTable  : true,
    // debugHeaders: true,
    // debugColumns: true,

    // select and change
    meta: {
      updateData: ( rowIndex, columnId, value ) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setData( ( old: any[] ) =>
          old.map( ( row: any, index: number ) => {
            if( index === rowIndex ) {
              return { ...old[ rowIndex ]!, [ columnId ]: value, }
            }
            return row
          } )
        )
      },
    },

  } )

  // delete row
  const handlerDelete        = async () => {
    if( selected ) {
      const filteredData = data.filter( ( item ) => item.id !== selected );
      setData( filteredData );
    }
  };
  const filteredSelectedRows = table.getFilteredSelectedRowModel().flatRows;

  useEffect( () => {
    if( setSelected ) {
      const originIds = filteredSelectedRows.map( ( row ) => row.original.id )[ 0 ];
      setSelected( originIds );
    }
  }, [ setSelected, filteredSelectedRows ] );

  async function deleteTable( array: Row<TOrderServer>[] ) {
    const id: string[] = array.map( row => row.original.id )
    if( array.length === 1 ) {
      // console.log( "test1" )
      const res = await deleteDataOne( id );
      notifyData( res.msg )
    }
    if( id.length > 1 ) {
      // console.log( "test2" )
      const res = await deleteDataMany( id );
      notifyData( res.msg )
    }

    await handlerDelete()

  }

  if( !dataOrderan ) {
    return ( <h1>Data Kosong</h1> )
  }

  return <div className="p-2 ">
    {/*------------Table------------*/ }
    <div className="overflow-x-auto border rounded border-black  ">
      <Suspense fallback={ <p>Fetching user details...</p> }>
        <table className="table table-xs      ">
          {/*--------------------------------tHead---------------------------*/ }
          <thead className={ "    " }>
          { table.getHeaderGroups().map( headerGroup => (
            <tr key={ headerGroup.id } className={ "  hover:bg-gray-50" }>
              { headerGroup.headers.map( header => {
                return (
                  <th className={ " border border-black  hover:bg-gray-50 text-center bg-gray-200 text-black" }
                      key={ header.id } colSpan={ header.colSpan }>
                    { header.isPlaceholder ? null : (
                      <div
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
                          <tr key={ row.id }
                              className={ ` bg-white hover:bg-slate-200 ${ i % 2 === 0 ? "bg-slate-50"
                                                                                       : "bg-slate-100" }` }
                          >
                            { row.getVisibleCells().map( cell => {
                              return (
                                <td className={ "border border-black " } key={ cell.id }>
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
              { footerGroup.headers.map( header => (
                <th key={ header.id }
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
              <IndeterminateCheckbox
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
      </Suspense>
    </div>

    {/*------------Move Page -----------*/ }
    <div className="flex items-center bg-white p-2 border ">
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

        <span className="flex items-center gap-1  p-2">| Go to page:

          <input
            type="number"
            className="border p-1 rounded  w-12"
            onChange={ e => {
              const page = e.target.value ? Number( e.target.value ) - 1 : 0
              table.setPageIndex( page )
            } }
            defaultValue={ table.getState().pagination.pageIndex + 1 }
          />

           </span>

        {/*--------------Show ---------------*/ }

        <span className="flex items-center gap-1  p-2">
              Max Row
          <input type={ 'number' }
                 onChange={ ( e: React.ChangeEvent<HTMLInputElement> ) => setRowShow( Number( e.target.value ) ) }

                 className={ "border border-black w-10" }
          />
          <select
            className={ "p-1 rounded" }
            value={ table.getState().pagination.pageSize }
            onChange={ e => table.setPageSize( Number( e.target.value ) ) }
          >
            { [ 10, rowShow, 20, 30, 40, 50 ].map( pageSize => (
              <option key={ pageSize } value={ pageSize }>
                Show { pageSize }
              </option>
            ) ) }
          </select>
          </span>
      </div>
    </div>

    {/*------------Console ------------------*/ }
    <div className="flex gap-2">

      {/*------------Check Visible----------------*/ }
      <div>
        <button
          onClick={ () => setOpen( !open ) }
          className={ "btn btn-info text-white" }>
          { open ? "Open" : "Close" }
        </button>

        <div className="  ">
          <label>
            <input
              { ...{
                type    : 'checkbox',
                checked : table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              } }
            />
            Toggle All
          </label>
        </div>

        <div className={ ` bg-red-200 ${ open ? "hidden" : "" }` }>
          { table.getAllLeafColumns().map( column => ( <div
              key={ column.id }
              className="px-1">
              <label>
                <input
                  { ...{
                    type    : 'checkbox',
                    checked : column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  } }
                />
                { column.id }
              </label>
            </div>
          ) ) }
        </div>
      </div>


      {/*<ConsoleLog onClick={ () => console.info( 'rowSelection', rowSelection ) }*/ }
      {/*            onClick1={ () => console.info( 'table.getSelectedRowModel().flatRows', table.getSelectedRowModel().flatRows ) }*/ }
      {/*/>*/ }

      {/*<p>   { table.getSelectedRowModel().flatRows.length }</p>*/ }

      { table.getSelectedRowModel().flatRows.length > 0 ?
        ( <button
          className="btn btn-error text-white"
          onClick={ () => deleteTable( table.getSelectedRowModel().flatRows ) }
        >
          DELETE
        </button> ) : ""
      }

      {/*{console.log(table.getSelectedRowModel().flatRows.length)}*/ }

      { table.getSelectedRowModel().flatRows.length === 1 ?
        ( <button
          className=" btn btn-info text-white"
          onClick={ () => {
            const id: string = table.getSelectedRowModel().flatRows[ 0 ].original.id
            router.replace( "/orderan/" + id, )
          } }
          type={ "button" }
        >
          EDIT
        </button> ) : ""
      }

      { table.getSelectedRowModel().flatRows.length > 0 && <button onClick={ () => {
        // console.log( table.getSelectedRowModel().flatRows )

        exportToExcel( table.getRowModel()
          //                     .rows.map( row => {
          //   return row.cells.map( cell => ( {
          //     value: cell.value,
          //     style: {
          //       background: getBackgroundColorForRow( cell.row.original.color )
          //     }
          //   } ) )
          // } )
        )
      } } className=" btn  bg-green-400 text-white ">
        Export to Excel
      </button> }

      { table.getSelectedRowModel().flatRows.length > 0
        && <button onClick={ () => {

          if( sessionStorage.getItem( "table" ) ) {
            sessionStorage.removeItem( "table" )
          }
          sessionStorage.setItem( "table", JSON.stringify(
            table.getSelectedRowModel().flatRows.map( d => d.original )
          ) )
          router.replace( "/print/kirim" )

        } } className=" btn  bg-yellow-400 text-white ">
          Print
        </button> }

      { table.getSelectedRowModel().flatRows.length > 0
        && <button onClick={ () => {

          if( sessionStorage.getItem( "table" ) ) {
            sessionStorage.removeItem( "table" )
          }
          sessionStorage.setItem( "table", JSON.stringify(
            table.getSelectedRowModel().flatRows.map( d => d.original )
          ) )
          router.replace( "/print/excel" )

        } } className=" btn  bg-yellow-400 text-white ">
          Excel
        </button> }
    </div>


    {/*------------DEBUG-----*/ }
    {/*<div className="">*/ }
    {/*  <div>{ table.getRowModel().rows.length } Rows</div>*/ }
    {/*  <pre>{ JSON.stringify( table.getState().pagination, null, 2 ) }</pre>*/ }
    {/*  <pre>{ JSON.stringify( sorting, null, 2 ) }</pre>*/ }
    {/*</div>*/ }
  </div>
}


