"use client"
import React, { useState } from 'react';

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

const SearchInput: React.FC<{ setSearchQuery: ( query: string ) => void }> = ( {
  setSearchQuery,
} ) => {
  const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    setSearchQuery( event.target.value );
  };

  return <input type="text" onChange={ handleChange }/>;
};

const ItemList: React.FC<{ items: Item[]; addToCart: ( item: Item ) => void }> = ( {
  items,
  addToCart,
} ) => {
  return (
    <ul className={ "flex gap-3" }>
      { items.map( ( item ) => (
        <li key={ item.id }>
          { item.name } - ${ item.price }
          <button className={ "bg-blue-500 p-2" }

                  onClick={ () => addToCart( item ) }>Add to Cart
          </button>
        </li>
      ) ) }
    </ul>
  );
};

const Cart: React.FC<{ cart: Item[]; removeItem: ( item: Item ) => void }> = ( { cart, removeItem } ) => {

  const handleRemove = ( item: Item ) => {
    removeItem( item );
  }

  return (
    <ul className={ "bg-white  " }>
      { cart.map( ( item ) => (
        <li key={ item.id }
            className={ "flex gap-3 border border-black m-2 bg-blue-400" }
        >{ item.name }
          <button onClick={ () => handleRemove( item ) }>Remove</button>
        </li>
      ) ) }
    </ul>
  );
};

const App: React.FC = () => {
  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ cart, setCart ] = useState<Item[]>( [] );

  const filteredItems = items.filter( ( item ) =>
    item.name.toLowerCase().includes( searchQuery.toLowerCase() )
  );

  const addToCart = ( item: Item ) => {
    const isItemExist = cart.some( ( cartItem ) => cartItem.id === item.id );

    if( isItemExist ) {
      // Item already exists in the cart
      alert( `Item "${ item.name }" is already in the cart.` );
      return;
    }

    setCart( ( prevCart ) => [ ...prevCart, item ] );
  };
  const removeItem = ( item: Item ) => {
    setCart( ( prevCart ) => {
      const updatedCart = prevCart.filter( ( cartItem ) => cartItem.id !== item.id );
      if( prevCart.length !== updatedCart.length ) {
        // Item was removed from the cart
        alert( `Item "${ item.name }" was successfully removed from the cart.` );
      }
      return updatedCart;
    } );
  };

  return (
    <div className={ "bg-white p-2 m-2 flex gap-3" }>
      <h1>Product Search</h1>
      <SearchInput setSearchQuery={ setSearchQuery }/>
      <ItemList items={ filteredItems } addToCart={ addToCart }/>
      <h2>Cart</h2>
      <Cart cart={ cart } removeItem={ removeItem }/>

    </div>
  );
};

export default App;