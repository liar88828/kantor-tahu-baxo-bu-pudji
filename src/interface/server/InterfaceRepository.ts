interface InterfaceRepository<T> {
	
	setOne(d: T, id?: string): any;
	
	setMany(data: T[] | any, method?: string): any[];
	
	findAll(search?: any,
					page?: number,
					pageSize?: number
	): Promise<any>;
	
	findById(id: string): Promise<any>;
	
	createOne(data: T,): Promise<any>;
	
	updateOne(data: T | any, id: string): Promise<any>;
	
	deleteOne(id: string): Promise<any>;
	
}