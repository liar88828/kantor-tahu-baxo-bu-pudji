import times from 'lodash.times';
import { factoryDashboard } from '@/server/models/factory/chart';

export function seedDashboard( n: number ): number[] {
  return times( n, () => ( factoryDashboard ) )
}
