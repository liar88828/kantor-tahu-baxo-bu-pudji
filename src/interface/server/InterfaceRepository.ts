interface InterfaceRepository<T> {

	findAll(search?: any,
					page?: number,
					pageSize?: number
	): Promise<any>;
	
	findById(id: string): Promise<any>;
	
	createOne(data: T,): Promise<any>;
	
	updateOne(data: T | any, id: string): Promise<any>;
	
	deleteOne(id: string): Promise<any>;
	
}