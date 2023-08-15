"use client"
import { RowData } from '@tanstack/table-core';
import { Table as ReactTable } from '@tanstack/table-core/build/lib/types';
import React, { HTMLProps, Suspense, useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  Column, ColumnDef, ColumnOrderState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel,
  getSortedRowModel, SortingState, useReactTable
} from '@tanstack/react-table';

import { notifBaru, notifyData } from '@/app/utils/notif/toash';
import type { TOrderServer } from '@/entity/server/orderan';
import { Rupiah } from '@/lib/utils/rupiah';
import { useRouter } from 'next/navigation';
import { deleteDataMany, deleteDataOne } from '@/app/utils/ress/table';

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
} ) {// console.log( dataOrderan )
  const { msg, data: dataOrder } = dataOrderan

  const router                                         = useRouter()

  useEffect( () => {
    notifBaru( msg )
  }, [] );

  // sorting
  const [ sorting, setSorting ] = React.useState<SortingState>( [] )

  // visibility
  const [ columnVisibility, setColumnVisibility ] = React.useState( {} )
  const [ columnOrder, setColumnOrder ]           = React.useState<ColumnOrderState>( [] )

  //check box
  const [ rowSelection, setRowSelection ] = React.useState( {} )
  const [ data, setData ]                 = React.useState( dataOrder )
  const [ open, setOpen ]                              = useState( true )

  const [ autoResetPageIndex, skipAutoResetPageIndex ] = useSkipper()
  const columns                                        = React.useMemo<ColumnDef<TOrderServer>[]>( () => [
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

      {
        accessorKey: 'no',
        cell       : info => info.row.index + 1,
        footer     : props => props.column.id,
      },

      {
        accessorKey: 'id',
        cell       : info => info.getValue(),
        footer     : props => props.column.id,
      },

      {
        header : 'Waktu',
        footer : props => props.column.id,
        columns: [
          {
            accessorKey: 'pesan',
            cell       : info => {
              const d = new Date( info.getValue() )
              return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
            },
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'kirim',
            cell       : info => {
              const d = new Date( info.getValue() )
              return d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate()
            },
            footer     : props => props.column.id,
          }, {
            accessorKey: 'waktuKirim',
            cell       : info => {
              const d = new Date( info.getValue() )
              return d.getHours() + ":" + d.getMinutes()
            },

            footer: props => props.column.id,
          },

          // {
          //   accessorFn: row => row.lastName,
          //   id        : 'lastName',
          //   cell      : info => info.getValue(),
          //   header    : () => <span>Last Name</span>,
          //   footer    : props => props.column.id,
          // },
        ],
      },

      {
        header: 'Data Orang', footer: props => props.column.id, columns: [
          {
            accessorKey: 'pengirim',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'hpPengirim',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'penerima',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'alamatPenerima',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'hpPenerima',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
        ],
      },

      {
        header: 'Keterangan', footer: props => props.column.id, columns: [
          {
            accessorKey: 'guna',

            cell: info => <p
              className={ "line-clamp-3" }> { info.getValue() }</p>,
            // header: () => <span>Visits</span>,
            footer: props => props.column.id,
          },
          {
            accessorKey: 'lokasi',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
        ],
      },

      {
        header: 'Travel', footer: props => props.column.id, columns: [
          {
            accessorKey: 'status',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          // {
          //   accessorKey: 'namaPengiriman',
          //   cell       : info => info.getValue(),
          //   footer     : props => props.column.id,
          // },
          {
            accessorKey: 'namaPengiriman',
            header     : 'ekspedisi',
            cell       : info => <p> { info.getValue() }</p>,
            footer     : props => props.column.id,
          }, {
            accessorKey: 'ongkir',
            cell       : info => Rupiah( info.getValue() ),
            footer     : props => props.column.id,
          },
        ],
      },

      {
        header: 'Total', footer: props => props.column.id, columns: [
          {
            accessorKey: 'typePembayaran',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'totalBayar',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'totalPenjualan',
            cell       : info => Rupiah( info.getValue() ),
            footer     : props => props.column.id,
          },
          // {
          //   accessorKey: 'status',
          //   cell       : info => info.getValue(),
          //   footer     : props => props.column.id,
          // },
        ],
      },

      {
        header: 'Hitung', footer: props => props.column.id, columns: [
          {
            accessorKey: 'semuaHargaOrderan',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'semuaHargaItem',
            cell       : info => info.getValue(),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'semuaHargaProduct',
            cell       : info => Rupiah( info.getValue() ),
            footer     : props => props.column.id,
          },
          {
            accessorKey: 'totalHarga',
            cell       : info => Rupiah( info.getValue() ),
            footer     : props => props.column.id,
          },
        ],
      },

      // {
      //   header : 'Info',
      //   footer : props => props.column.id,
      //   columns: [
      //
      //     // {
      //     //   header : 'More Info',
      //     //   columns: [
      //
      //     {
      //       accessorKey: 'ongkir',
      //       header     : () => 'Ongkir',
      //       footer     : props => props.column.id,
      //     },
      //
      //     {
      //       accessorKey: 'visits',
      //       header     : () => <span>Visits</span>,
      //       footer     : props => props.column.id,
      //     },
      //     {
      //       accessorKey: 'status',
      //       header     : 'Status',
      //       footer     : props => props.column.id,
      //     },
      //     {
      //       accessorKey: 'progress',
      //       header     : 'Profile Progress',
      //       footer     : props => props.column.id,
      //     },
      //     // ],
      //     // },
      //   ],
      // },
      //
    ],
    [] )

  const defaultColumn: Partial<ColumnDef<TOrderServer>> = {
    cell: ( { getValue, row: { index }, column: { id }, table } ) => {
      const initialValue = getValue()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [ value, setValue ] = React.useState( initialValue )

      const onBlur = () => table.options.meta?.updateData( index, id, value )

      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect( () => setValue( initialValue ), [ initialValue ] )

      return (
        <input
          value={ value as string }
          onChange={ e => setValue( e.target.value ) }
          onBlur={ onBlur }
        />
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

    //selct box
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

  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle( table.getAllLeafColumns().map( d => d.id ) )
    )
  }

  if( dataOrderan.data.length == 0 ) {
    return <h1>Data Kosong</h1>
  }

  return (
    < >
      <Suspense fallback={ <div>Loading...</div> }>

        <div className="p-2 ">

          {/*----------------Button Random-----------------*/ }
          <div className="flex  flex-wrap gap-2">
            {/*<button onClick={() => rerender()} className="border p-1">*/ }
            {/*  Regenerate*/ }
            {/*</button>*/ }

            {/*<button onClick={ () => randomizeColumns() } className="border p-1">*/ }
            {/*  Shuffle Columns*/ }
            {/*</button>*/ }
          </div>

          {/*------------Table------------*/ }
          <div className="overflow-x-auto border rounded border-black  ">
            <table className="table table-xs      ">
              {/*--------------------------------tHead---------------------------*/ }
              <thead className={ "    " }>
              { table.getHeaderGroups().map( headerGroup => (
                <tr key={ headerGroup.id }
                    className={ "  hover:bg-gray-50" }

                >
                  { headerGroup.headers.map( header => {
                    return (
                      <th
                        className={ " border border-black  hover:bg-gray-50 text-center bg-gray-200" +
                          " text-black" }
                        key={ header.id }
                        colSpan={ header.colSpan }>
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
              <tbody
                className={ " " }
              >
              { table.getRowModel().rows
              // .slice( 0, 10 )
                     .map( ( row, i ) => {
                       return (
                         <tr key={ row.id }
                             className={ ` bg-white hover:bg-slate-200 ${
                               i % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                             }` }
                         >
                           { row.getVisibleCells().map( cell => {
                             return (
                               <td
                                 className={ "border border-black " }
                                 key={ cell.id }>
                                 { flexRender(
                                   cell.column.columnDef.cell,
                                   cell.getContext()
                                 ) }
                               </td>
                             )
                           } ) }
                         </tr>
                       )
                     } ) }
              </tbody>

              {/*--------------------------------tFoot----------*/ }
              <tfoot>
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

              <span className="flex items-center gap-1  p-2">  Max Row
          <select
            className={ "p-1 rounded" }
            value={ table.getState().pagination.pageSize }
            onChange={ e => table.setPageSize( Number( e.target.value ) ) }
          >
            { [ 10, 20, 30, 40, 50 ].map( pageSize => (
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
            <button
              className="border rounded p-2 mb-2"
              onClick={ () => console.info( 'rowSelection', rowSelection ) }
            >
              Console.log()
              Log `rowSelection` state
            </button>


            <button
              className="border rounded p-2 mb-2 bg-red-300"
              onClick={ () =>
                console.info(
                  'table.getSelectedRowModel().flatRows',
                  table.getSelectedRowModel().flatRows
                )
              }
            >
              Log table.getSelectedRowModel().flatRows
            </button>
            <p>   { table.getSelectedRowModel().flatRows.length }</p>
            { table.getSelectedRowModel().flatRows.length > 0 ?
              ( <button
                className="border rounded p-2 mb-2 bg-red-300"
                onClick={ async () => {
                  const arrays: string [] = []
                  const tables            = table.getSelectedRowModel().flatRows
                  tables.map( ( d ) => arrays.push( d.original.id ?? "not found" ) )
                  // console.log( tables.length )
                  if( table.getSelectedRowModel().flatRows.length > 1 ) {
                    // console.log( "test1" )
                    const res = await deleteDataMany( arrays );
                    notifyData( res.msg )
                  }

                  else if( tables.length === 1 ) {
                    // console.log( "test2" )
                    const id  = table.getSelectedRowModel().flatRows[ 0 ].original.id as string
                    const res = await deleteDataOne( id );
                    // console.log(res)
                    notifyData( res.msg )
                    // router.refresh()
                    // history.go();
                  }
                  // router.refresh()
                  history.go();

                } }
              >
                DELETE
              </button> ) : ""
            }
            <button type="button" onClick={ () => {
              // router.refresh()
              history.go();
            } }>Refresh
            </button>
          </div>

          {/*------------Check Visible----------------*/ }
          <div className="inline-block border border-black shadow rounded">

            <button
              onClick={ () => setOpen( !open ) }
              className={ "btn btn-info text-white" }>
              { open ? "Open" : "Close" }
            </button>

            <div className="px-1 border-b border-black ">
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
              { table.getAllLeafColumns().map( column => {
                return (
                  <>
                    <div
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
                  </>
                )
              } ) }
            </div>
          </div>

          {/*------------DEBUG-----*/ }
          <div className="">
            <div>{ table.getRowModel().rows.length } Rows</div>
            <pre>{ JSON.stringify( table.getState().pagination, null, 2 ) }</pre>
            <pre>{ JSON.stringify( sorting, null, 2 ) }</pre>
          </div>

        </div>
      </Suspense>

      {/*<ToastContainer*/ }
      {/*  position="top-right"*/ }
      {/*  autoClose={ 5000 }*/ }
      {/*  hideProgressBar*/ }
      {/*  newestOnTop={ false }*/ }
      {/*  closeOnClick={ false }*/ }
      {/*  rtl={ false }*/ }
      {/*  pauseOnFocusLoss={ false }*/ }
      {/*  draggable*/ }
      {/*  pauseOnHover*/ }
      {/*  theme="light"*/ }
      {/*/>*/ }


      {/*<div>*/ }
      {/*  <button onClick={ () => rerender() }>Force Rerender</button>*/ }
      {/*</div>*/ }


      {/*<div>*/ }
      {/*  <button onClick={ () => refreshData() }>Refresh Data</button>*/ }
      {/*</div>*/ }
    </ >
  )
}

// asli

function Filter( { column, table, }: {
  column: Column<any, any>;
  table: ReactTable<any>
} ) {
  const firstValue = table
  .getPreFilteredRowModel()
    .flatRows[ 0 ]?.getValue( column.id )

  const columnFilterValue = column.getFilterValue()

  return typeof firstValue === 'number' ? (
    <div className="flex space-x-2">
      <input
        type="number"
        value={ ( columnFilterValue as [ number, number ] )?.[ 0 ] ?? '' }
        onChange={ e =>
          column.setFilterValue( ( old: [ number, number ] ) => [
            e.target.value,
            old?.[ 1 ],
          ] )
        }
        placeholder={ `Min` }
        className="w-24 border shadow rounded"
      />
      <input
        type="number"
        value={ ( columnFilterValue as [ number, number ] )?.[ 1 ] ?? '' }
        onChange={ e =>
          column.setFilterValue( ( old: [ number, number ] ) => [
            old?.[ 0 ],
            e.target.value,
          ] )
        }
        placeholder={ `Max` }
        className="w-24 border shadow rounded"
      />
    </div>
  ) : (
           <input
             type="text"
             value={ ( columnFilterValue ?? '' ) as string }
             onChange={ e => column.setFilterValue( e.target.value ) }
             placeholder={ `Search...` }
             className="w-36 border shadow rounded"
           />
         )
}

function useSkipper() {
  const shouldSkipRef = React.useRef( true )
  const shouldSkip    = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback( () => {
    shouldSkipRef.current = false
  }, [] )

  React.useEffect( () => {
    shouldSkipRef.current = true
  } )

  return [ shouldSkip, skip ] as const
}

function IndeterminateCheckbox(
  { indeterminate, className = '', ...rest }:
    {
      indeterminate?: boolean
    } & HTMLProps<HTMLInputElement> ) {
  const ref = React.useRef<HTMLInputElement>( null! )

  React.useEffect( () => {
    if( typeof indeterminate === 'boolean' ) {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ ref, indeterminate ] )

  return (
    <input
      type="checkbox"
      ref={ ref }
      className={ className + ' cursor-pointer' }
      { ...rest }
    />
  )
}

