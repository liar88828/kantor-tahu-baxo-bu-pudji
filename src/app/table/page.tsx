"use client"
import React, { HTMLProps } from 'react'

import {
  Column,
  ColumnDef,
  ColumnOrderState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as ReactTable,
  useReactTable,
} from '@tanstack/react-table'

import { makeData, Person } from '../../../lib/facker'
import { RowData } from '@tanstack/table-core';
import { faker } from '@faker-js/faker';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: ( rowIndex: number, columnId: string, value: unknown ) => void
  }
}

//-------------------------Main Table
export default function Table() {
  const rerender = React.useReducer( () => ( {} ), {} )[ 1 ]

  // sorting
  const [ sorting, setSorting ] = React.useState<SortingState>( [] )

  // visibility
  const [ columnVisibility, setColumnVisibility ] = React.useState( {} )
  const [ columnOrder, setColumnOrder ] = React.useState<ColumnOrderState>( [] )

  //check box
  const [ rowSelection, setRowSelection ] = React.useState( {} )

  const [ globalFilter, setGlobalFilter ] = React.useState( '' )
  const [ data, setData ] = React.useState( () => makeData( 100 ) )
  const [ autoResetPageIndex, skipAutoResetPageIndex ] = useSkipper()

  const columns = React.useMemo<ColumnDef<Person>[]>( () => [

      {
        id: 'select', header: ( { table } ) => (
          <IndeterminateCheckbox
            { ...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            } }
          />
        ),
        cell: ( { row } ) => ( <div className="px-1">
            <IndeterminateCheckbox
              { ...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              } }
            />
          </div>
        ),
      },

      {
        header: 'Name', footer: props => props.column.id, columns: [
          {
            accessorKey: 'firstName', cell: info => info.getValue(),
            footer: props => props.column.id,
          },
          {
            accessorFn: row => row.lastName,
            id: 'lastName',
            cell: info => info.getValue(),
            header: () => <span>Last Name</span>,
            footer: props => props.column.id,
          },
        ],
      },
      {
        header: 'Info',
        footer: props => props.column.id,
        columns: [
          {
            accessorKey: 'age',
            header: () => 'Age',
            footer: props => props.column.id,
          },
          {
            header: 'More Info',
            columns: [
              {
                accessorKey: 'visits',
                header: () => <span>Visits</span>,
                footer: props => props.column.id,
              },
              {
                accessorKey: 'status',
                header: 'Status',
                footer: props => props.column.id,
              },
              {
                accessorKey: 'progress',
                header: 'Profile Progress',
                footer: props => props.column.id,
              },
            ],
          },
        ],
      },
    ],
    [] )

  // const refreshData = () => setData( () => makeData( 100 ) )



  return (
    <>
      <Tables
        { ...{
          data, columns, autoResetPageIndex, skipAutoResetPageIndex, setData,
          // -------sorting
          sorting, setSorting,
          // -------row
          rowSelection, setRowSelection,
          // -------visibility
          columnOrder, setColumnOrder,
          columnVisibility, setColumnVisibility,

        } }
      />
      <hr/>
      <div>
        <button onClick={ () => rerender() }>Force Rerender</button>
      </div>
      {/*<div>*/ }
      {/*  <button onClick={ () => refreshData() }>Refresh Data</button>*/ }
      {/*</div>*/ }
    </>
  )
}

function Tables(
  {
    data
    , columns
    , columnVisibility
    , columnOrder
    , setColumnOrder
    , setColumnVisibility
    , rowSelection, setRowSelection
    , autoResetPageIndex, skipAutoResetPageIndex, setData, sorting, setSorting
  }:
    {
      data: Person[],
      columns: ColumnDef<Person>[],
      autoResetPageIndex: any,
      skipAutoResetPageIndex: any,
      setData: any,
      sorting: any,
      setSorting: any,
      columnVisibility: any,
      columnOrder: any,
      setColumnOrder: any,
      setColumnVisibility: any,
      rowSelection: any,
      setRowSelection: any
    }
) {

  // Give our default column cell renderer editing superpowers!
  const defaultColumn: Partial<ColumnDef<Person>> = {
    cell: ( { getValue, row: { index }, column: { id }, table } ) => {
      const initialValue = getValue()
      // We need to keep and update the state of the cell normally
      const [ value, setValue ] = React.useState( initialValue )

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateData( index, id, value )
      }

      // If the initialValue is changed external, sync it up with our state
      React.useEffect( () => {
        setValue( initialValue )
      }, [ initialValue ] )

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
    onColumnOrderChange: setColumnOrder,

    // Pipeline
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    autoResetPageIndex,
    // debug
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,

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

  return (
    <div className="p-2">


      <div className="inline-block border border-black shadow rounded">
        <div className="px-1 border-b border-black">
          <label>
            <input
              { ...{
                type: 'checkbox',
                checked: table.getIsAllColumnsVisible(),
                onChange: table.getToggleAllColumnsVisibilityHandler(),
              } }
            />{ ' ' }
            Toggle All
          </label>
        </div>
        { table.getAllLeafColumns().map( column => {
          return (
            <div key={ column.id } className="px-1">
              <label>
                <input
                  { ...{
                    type: 'checkbox',
                    checked: column.getIsVisible(),
                    onChange: column.getToggleVisibilityHandler(),
                  } }
                />{ ' ' }
                { column.id }
              </label>
            </div>
          )
        } ) }
      </div>

      <div className="h-2"/>

      <div className="flex flex-wrap gap-2">
        {/*<button onClick={() => rerender()} className="border p-1">*/ }
        {/*  Regenerate*/ }
        {/*</button>*/ }
        <button onClick={ () => randomizeColumns() } className="border p-1">
          Shuffle Columns
        </button>
      </div>


      <table>
        <thead>
        { table.getHeaderGroups().map( headerGroup => (
          <tr key={ headerGroup.id }>
            { headerGroup.headers.map( header => {
              return (
                <th key={ header.id } colSpan={ header.colSpan }>
                  { header.isPlaceholder ? null : (
                    <div
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
        <tbody>
        { table.getRowModel()
        .rows.slice( 0, 10 )
        .map( row => {
          return (
            <tr key={ row.id }>
              { row.getVisibleCells().map( cell => {
                return (
                  <td key={ cell.id }>
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


        <tfoot>
        <tr>
          <td className="p-1">
            <IndeterminateCheckbox
              { ...{
                checked: table.getIsAllPageRowsSelected(),
                indeterminate: table.getIsSomePageRowsSelected(),
                onChange: table.getToggleAllPageRowsSelectedHandler(),
              } }
            />
          </td>
          <td colSpan={ 20 }>Page Rows ({ table.getRowModel().rows.length })</td>
        </tr>
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
      </div>

      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={ () => console.info( 'rowSelection', rowSelection ) }
        >
          Log `rowSelection` state
        </button>
      </div>
      <div>
        <button
          className="border rounded p-2 mb-2"
          onClick={ () =>
            console.info(
              'table.getSelectedRowModel().flatRows',
              table.getSelectedRowModel().flatRows
            )
          }
        >
          Log table.getSelectedRowModel().flatRows
        </button>

      </div>


      <div>{ table.getRowModel().rows.length } Rows</div>
      <pre>{ JSON.stringify( table.getState().pagination, null, 2 ) }</pre>
      <pre>{ JSON.stringify( sorting, null, 2 ) }</pre>

    </div>

  )
}

// asli

function Filter(
  { column, table, }:
    {
      column: Column<any, any>; table: ReactTable<any>
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

export function useSkipper() {
  const shouldSkipRef = React.useRef( true )
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback( () => {
    shouldSkipRef.current = false
  }, [] )

  React.useEffect( () => {
    shouldSkipRef.current = true
  } )

  return [ shouldSkip, skip ] as const
}

function IndeterminateCheckbox( {
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement> ) {
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

