export function globalQueryClient() {
  const fetchMap = new Map<string, Promise<any>>()

  function queryClient<QueryResult>(
    name: string,
    query: () => Promise<QueryResult>
  ): Promise<QueryResult> {
    if( !fetchMap.has( name ) ) fetchMap.set( name, query() )
    if( !fetchMap.get( name ) ) throw new Error()
    // console.error( fetchMap.get( name ) )
    return fetchMap.get( name )!
  }

  return queryClient;
}
