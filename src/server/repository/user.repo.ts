import {prisma} from "@/config/prisma";
import {ResponseAll} from "@/interface/server/param";
import { Users } from "@prisma/client";
import { TUserCreate, UserSearch } from "@/interface/entity/user.model";


export default class UserRepository implements InterfaceRepository<TUserCreate> {
	paginate(data: { row: number; skip: number; }): Promise<any> {
		throw new Error('Method not implemented.');
	}

	search(search: string): Promise<any> {
		throw new Error('Method not implemented.');
	}

	async findAll(searchQuery: UserSearch, page: number = 1, pageSize: number = 10): Promise<ResponseAll<Users>> {

		const skip = (page - 1) * pageSize;
		const take = pageSize;
		const data = await prisma.users.findMany({
			where: {
				AND: [
					{
						...(searchQuery.name ? {name: {contains: searchQuery.name,}} : {}),
					}
				],
			},
			skip,
			take,
		});
		return {data, page, pageSize};

	}

	async findById(id: string): Promise<any> {
		return prisma.users.findUnique({where: {id}});
	}

	async createOne(data: TUserCreate): Promise<any> {
		return prisma.users.create({data: {...data}});
	}

	async updateOne(data: TUserCreate, id: string): Promise<any> {
		return prisma.users.update({data: {...data}, where: {id}});
	}

	async deleteOne(id: string): Promise<any> {
		return prisma.users.delete({where: {id}});
	}

	setOne(d: (TUserCreate) & { id?: string }) {
		return {

		}
	}

	setMany(data: TUserCreate[]): any[] {
		return data.map((d) => (this.setOne(d)))
	}

	async updateMany(data: TUserCreate[], id: string) {
		return prisma.users.updateMany({
			where: {id: id},
			data: this.setMany(data)
		})
	}
}

