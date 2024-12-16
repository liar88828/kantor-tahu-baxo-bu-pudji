import { Certifications, Employees, Languages, Projects, Skills } from "@prisma/client";

export type TEmployeeDB = Employees & {
	skills: Skills[];
	languages: Languages[];
	certifications: Certifications[];
	projects: Projects[];
	createdAt: Date;
	updatedAt: Date;
};

export type TEmployeeSearch = Pick<TEmployeeDB, 'name'|'status'>
export type EmployeeCreate = Omit<Employees, 'updatedAt' | 'createdAt' | 'id' | 'managerId'> & {
	skills: Pick<Skills, 'text'>[];
	languages: Pick<Languages, 'text'>[];
	certifications: Pick<Certifications, 'text'>[];
	projects: Pick<Projects, 'text'>[];
};


