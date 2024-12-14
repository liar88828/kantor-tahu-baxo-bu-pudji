import { Employees } from "@prisma/client";

export type TEmployeeDB = Employees
export type TEmployeeSearch = Pick<TEmployeeDB, 'name'>