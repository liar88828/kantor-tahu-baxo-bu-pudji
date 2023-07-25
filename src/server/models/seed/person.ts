import { TPerson } from '@/entity/person';
import { factoryPerson } from '@/server/models/factory/person';
import { range } from '@/lib/utils/range';

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
