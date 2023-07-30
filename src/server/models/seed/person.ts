import { TPerson }       from '@/entity/client/person';
import { factoryPerson } from '@/server/models/factory/person';
import { range }         from '@/lib/utils/range';

export function makeData( ...lens: number[] ) {
  const makeDataLevel = ( depth = 0 ): TPerson[] => {
    const len = lens[ depth ]!
    return range( len ).map( ( d ): TPerson => {
      return {
        ...factoryPerson,
        subRows: lens[ depth + 1 ] ? makeDataLevel( depth + 1 ) : undefined,
      }
    } )
  }

  return makeDataLevel()
}

const factoryPersonSeed: TPerson[] = Array
.from( { length: 20 } )
.map( () => factoryPerson )

let factoryPersonSeed2: TPerson[] = []
for( let i = 0; i < 10; i++ ) {
  factoryPersonSeed.push( factoryPerson )
}
console.log( factoryPersonSeed2 )