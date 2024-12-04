//
// // Shopping cart implementation
// import { ChartItem } from 'chart.js';
//
// class ShoppingCartImpl<T extends Product> implements ShoppingCart<T> {
//   items: ChartItem<T>[] = [];
//
//   addItem( item: CartItem<T> ): void {
//     const existingItem = this.items.find( ( i ) => i.product.id ===
//       item.product.id );
//
//     if( existingItem ) {
//       existingItem.quantity += item.quantity;
//     }
//     else {
//       this.items.push( item );
//     }
//   }
//
//   removeItem( id: number ): void {
//     this.items = this.items.filter( ( item ) => item.product.id !== id );
//   }
//
//   getTotal(): number {
//     return this.items.reduce( ( total, item ) => total + item.product.price *
//       item.quantity, 0 );
//   }
// }
//
// // Example usage
// const product1: Product = { id: 1, name: "Product 1", price: 10 };
// const product2: Product = { id: 2, name: "Product 2", price: 15 };
//
// const cartItem1: CartItem<Product> = { product: product1, quantity: 2 };
// const cartItem2: CartItem<Product> = { product: product2, quantity: 1 };
//
// const cart = new ShoppingCartImpl<Product>();
// cart.addItem( cartItem1 );
// cart.addItem( cartItem2 );
//
// console.info( "Shopping Cart Items:", cart.items );
// console.info( "Total:", cart.getTotal() );
//
//
