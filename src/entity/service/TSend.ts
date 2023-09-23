import { TMethod } from '@/entity/Utils';

export type TSend = {
  method: TMethod;
  id: string;
  value: string;
  option: string;
  pathname: string
};