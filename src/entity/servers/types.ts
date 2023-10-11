type TOrderProductOnly = Omit<TOrderServer, "semuaProduct">

export type TypeProperty<T, K extends keyof T> = T[K];
export type TOptional = TypeProperty<TOrderServer, "ongkir" | "penerima">

const exampleOnly: TOptional     = "asdas"
const exampleOptional: TOptional = "sdasd"

interface typeObject {
  name: string,
  age: number,
}

const namea: TypeProperty<typeObject, "name"> = "brian";
const age: TypeProperty<typeObject, "age">    = 20;