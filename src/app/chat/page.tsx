"use client"
import React, { useState } from 'react';
import { StyleInputForm } from '@/app/style/form';

// Sample data source
interface Item {
  id: number;
  name: string;
  price: number;
}

const items: Item[] = [
  { id: 1, name: 'Item 1', price: 10 },
  { id: 2, name: 'Item 2', price: 20 },
  { id: 3, name: 'Item 3', price: 30 },
];

const App: React.FC = () => {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ cart, setCart ] = useState<Item[]>( [] );
  const [ filteredItems, setFilteredItems ] = useState<Item[]>( items );

  const addToCart = ( item: Item ) => {
    const isItemInCart = cart.some( ( cartItem ) => cartItem.id === item.id );

    if( isItemInCart ) {
      // Item already exists in the cart

      alert( `Item "${ item.name }" is already in the cart.` );
      setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
      return;
    }

    setCart( ( prevCart ) => [ ...prevCart, item ] );
    setFilteredItems( ( prevItems ) => prevItems.filter( ( listItem ) => listItem.id !== item.id ) );
  };
  const removeFromCart = ( item: Item ) => {
    setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
    setFilteredItems( ( prevItems ) => [ ...prevItems, item ] );
  };

  const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const query = event.target.value;
    setSearchQuery( query );

    const filtered = items.filter( ( item ) => {
      const lowerCaseQuery = query.toLowerCase();
      const lowerCaseName = item.name.toLowerCase();
      const priceString = item.price.toString();

      // Check if the item name or price string includes the search query
      return (
        lowerCaseName.includes( lowerCaseQuery ) ||
        priceString.includes( lowerCaseQuery )
      );
    } );

    setFilteredItems( filtered );
  };

  // const handleRemove = ( item: Item ) => {
  //   removeItem( item );
  // };

  const removeItem = ( item: Item ) => {
    setCart( ( prevCart ) => prevCart.filter( ( cartItem ) => cartItem.id !== item.id ) );
  };

  return (
    <div>
      <h1>Product Search</h1>
      <input
        className={ StyleInputForm( false ) }
        type="text"
        value={ searchQuery }
        onChange={ handleSearchChange }/>
      <ul className={ "bg-red-500 p-2" }>
        { filteredItems.map( ( item ) => (
          <li className={ "bg-blue-400 m-2 p-2 flex flex-col gap-2" }
              key={ item.id }>

            { item.name } - ${ item.price }

            <button
              className={ "bg-green-200 p-2" }
              onClick={ () => addToCart( item ) }>Add to Cart
            </button>
          </li>
        ) ) }
      </ul>
      <h2>Cart</h2>
      <ul>
        { cart.map( ( item ) => (
          <li
            className={ "bg-blue-400 p-2 " }
            key={ item.id }>
            { item.name }
            <button
              className={ "bg-red-500 p-2" }
              onClick={ () => removeFromCart( item ) }>Remove
            </button>
          </li>
        ) ) }
      </ul>
    </div>
  );
};

export default App;
