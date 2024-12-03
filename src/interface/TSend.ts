import { TMethod } from "@/interface/Utils";

export type TSend = {
  method: TMethod;
  id: string;
  value: string;
  option: string;
  pathname: string
};