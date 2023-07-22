import times from 'lodash.times';
import { faker } from '@faker-js/faker';

export function totalPenjualan( n: number ) {

  return times( n, () => ( faker.datatype.number( { min: 10, max: 1000 } ) ) )
}