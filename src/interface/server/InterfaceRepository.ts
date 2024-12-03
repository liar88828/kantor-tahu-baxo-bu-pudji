interface InterfaceRepository {
	
	setOne(d: any, id?: string): any;
	
	setMany(data: any[] | any, method?: string): any[];
	
	paginate(data: { row: number, skip: number }): Promise<any>;
	
	search(search: string): Promise<any>;
	
	findAll(): Promise<any>;
	
	
	findById(id: string): Promise<any>;
	
	createOne(data: any,): Promise<any>;
	
	updateOne(data: any, id: string): Promise<any>;
	
	deleteOne(id: string): Promise<any>;
	
}