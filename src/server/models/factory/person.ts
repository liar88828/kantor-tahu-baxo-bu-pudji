import { faker }   from '@faker-js/faker'
import { TPerson } from '@/entity/client/person';

export const factoryPerson: TPerson = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  age: faker.datatype.number( 40 ),
  visits: faker.datatype.number( 1000 ),
  progress: faker.datatype.number( 100 ),
  status: faker.helpers.shuffle<TPerson['status']>( [
    'relationship',
    'complicated',
    'single',
  ] )[ 0 ]!,
}

