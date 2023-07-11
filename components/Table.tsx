"use client";
import { Radio, Table, Pagination, useAsyncList, useCollator, NextUIProvider, Container, Grid } from "@nextui-org/react";
import { Person } from "./data";
import React from "react";




export function Tables ()
{
  const collator = useCollator( { numeric: true } );

  async function load () { return { items: Person, }; }

  async function sort ( { items, sortDescriptor } )
  {
    return {
      items: items.sort( ( a, b ) =>
      {
        let first = a[ sortDescriptor.column ];
        let second = b[ sortDescriptor.column ];
        let cmp = collator.compare( first, second );
        if ( sortDescriptor.direction === "descending" ) { cmp *= -1; }
        return cmp;
      } ),
    };
  }
  const list = useAsyncList( { load, sort } );

  const [ selectedColor, setSelectedColor ] = React.useState<string>( "primary" );
  const colors = [ "primary", "secondary", "success", "warning", "error" ];
  const capitalize = ( str ) =>
  {
    const lower = str.toLowerCase();
    return str.charAt( 0 ).toUpperCase() + lower.slice( 1 );
  };
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "status",
      label: "Status",
    },
  ];

  return (
    <div className=" p-5">
      <NextUIProvider>
        <Container lg gap={ 2 } css={ { mt: '$10' } }>
          <Table
            aria-label="Example pagination collection table"
            sortDescriptor={ list.sortDescriptor }
            onSortChange={ list.sort }
            css={ { height: "calc($space$14 * 10)", minWidth: "100%", } }
            shadow={ false }
            color={ selectedColor }
            bordered
            onSelectionChange={ ( e ) => console.log( e ) }
            selectionMode="multiple"
          >
            <Table.Header>
              <Table.Column key="index" allowsSorting >
                No.
              </Table.Column>
              <Table.Column key="nama" allowsSorting>
                Nama
              </Table.Column>
              <Table.Column key="alamat" allowsSorting>Alamat</Table.Column>
              <Table.Column key="pengirim" allowsSorting>Pengirim</Table.Column>
              <Table.Column key="produk" allowsSorting>Produk</Table.Column>
              <Table.Column key="harga" allowsSorting>Harga</Table.Column>
              <Table.Column key="jumlah" allowsSorting>Jumlah</Table.Column>
            </Table.Header>

            <Table.Body
              items={ list.items }
              loadingState={ list.loadingState }
            >
              { ( item ) => (
                <Table.Row key={ item.nama }>
                  { ( columnKey, ) => (
                    <Table.Cell>
                      { item[ columnKey ] }
                    </Table.Cell>
                  ) }
                </Table.Row>
              ) }

              {/* { Person.map( ( p, i ) => (



            <Table.Row key={ p.id }>
              <Table.Cell>{ i }</Table.Cell>
              <Table.Cell>{ p.nama }</Table.Cell>
              <Table.Cell>{ p.alamat }</Table.Cell>
              <Table.Cell>{ p.pengirim }</Table.Cell>
              <Table.Cell>{ p.produk }</Table.Cell>
              <Table.Cell>{ p.jumlah }</Table.Cell>
            </Table.Row>
          ) ) } */}

              {/* <Table.Row key="1">
            <Table.Cell>Tony Reichert</Table.Cell>
            <Table.Cell>CEO</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>Active</Table.Cell>
            <Table.Cell>Active</Table.Cell>
          </Table.Row> */}
            </Table.Body>

            <Table.Pagination
              shadow
              noMargin
              color={ selectedColor }
              align="center"
              rowsPerPage={ 10 }
              onPageChange={ ( page ) => console.log( { page } ) }
            />
          </Table>
          <Grid xs={ 12 }>
            <Radio.Group
              size="sm"
              orientation="horizontal"
              value={ selectedColor }
              onChange={ setSelectedColor }
            >
              { colors.map( ( color ) => (
                <Radio key={ color }
                  value={ color }
                  color={ selectedColor }>
                  { capitalize( color ) }
                </Radio>
              ) ) }
            </Radio.Group>
          </Grid>
        </Container>
      </NextUIProvider>

    </div >
  );
}
