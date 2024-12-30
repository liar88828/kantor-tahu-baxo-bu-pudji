import { Certifications, Employees, Languages, Projects, Skills } from "@prisma/client";

export type TEmployeeDB = Employees & {
    skills: Skills[];
    languages: Languages[];
    certifications: Certifications[];
    projects: Projects[];
    createdAt: Date;
    updatedAt: Date;
};

export type TEmployeeSearch = Pick<TEmployeeDB, 'name' | 'status'> & { page?: number };
export type EmployeeCreate =
    Omit<Employees, 'updatedAt' | 'createdAt' | 'id' | 'managerId' | 'photoKtp' | 'photo3x4'>
    & {
    skills: Pick<Skills, 'text'>[];
    languages: Pick<Languages, 'text'>[];
    certifications: Pick<Certifications, 'text'>[];
    projects: Pick<Projects, 'text'>[];
};

export interface EmployeeCVProps {
    employee: TEmployeeDB;
}

export const ktp = 'https://dummyimage.com/400x300/000/ffffff.jpg';
export const i3x4 = 'https://dummyimage.com/300x400/000/ffffff.jpg';

export enum EMPLOYEE_KEY {
    employees = "employees",
}
