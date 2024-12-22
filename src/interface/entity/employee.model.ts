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



