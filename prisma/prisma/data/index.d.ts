/**
 * Client
 **/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>

export type List_produkPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "List_produk"
  objects: {
    Orderan: OrderanPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga: number | null
    jumlah: number | null
    keterangan: string
    created_at: Date
    updated_at: Date
    orderanId: string | null
  }, ExtArgs["result"]["list_produk"]>
  composites: {}
}

/**
 * Model List_produk
 *
 */
export type List_produk = runtime.Types.DefaultSelection<List_produkPayload>
export type OrderanPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Orderan"
  objects: {
    list_produk: List_produkPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    keterangan: string
    pesan: Date | null
    kirim: Date | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir: number | null
    no: string
    typePembayaran: string
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
    created_at: Date
    updated_at: Date
  }, ExtArgs["result"]["orderan"]>
  composites: {}
}

/**
 * Model Orderan
 *
 */
export type Orderan = runtime.Types.DefaultSelection<OrderanPayload>
export type produkPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "produk"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga: number | null
    jumlah: number | null
    keterangan: string
    created_at: Date
    updated_at: Date
  }, ExtArgs["result"]["produk"]>
  composites: {}
}

/**
 * Model produk
 *
 */
export type produk = runtime.Types.DefaultSelection<produkPayload>
export type travelPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "travel"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: string
    namaPengiriman: string
    noHpPerusahaan: string
    lokasi: string
    jenis: string
    harga: number
    img: string
    keterangan: string
  }, ExtArgs["result"]["travel"]>
  composites: {}
}

/**
 * Model travel
 *
 */
export type travel = runtime.Types.DefaultSelection<travelPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more List_produks
 * const list_produks = await prisma.list_produk.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [ K: symbol ]: { types: Prisma.TypeMap<ExtArgs>['other'] }

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more List_produks
   * const list_produks = await prisma.list_produk.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor( optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions> );

  $on<V extends U>( eventType: V, callback: ( event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent ) => void ): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use( cb: Prisma.Middleware ): void

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our
   *   [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>( query: TemplateStringsArray | Prisma.Sql, ...values: any[] ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true,
   *   'user@email.com')
   * ```
   *
   * Read more in our
   *   [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>( query: string, ...values: any[] ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our
   *   [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>( query: TemplateStringsArray | Prisma.Sql, ...values: any[] ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1,
   *   'user@email.com')
   * ```
   *
   * Read more in our
   *   [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>( query: string, ...values: any[] ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>( arg: [ ...P ], options?: {
    isolationLevel?: Prisma.TransactionIsolationLevel
  } ): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>( fn: ( prisma: Omit<PrismaClient, runtime.ITXClientDenyList> ) => Promise<R>, options?: {
    maxWait?: number,
    timeout?: number,
    isolationLevel?: Prisma.TransactionIsolationLevel
  } ): Promise<R>

  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

  /**
   * `prisma.list_produk`: Exposes CRUD operations for the **List_produk** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more List_produks
   * const list_produks = await prisma.list_produk.findMany()
   * ```
   */
  get list_produk(): Prisma.List_produkDelegate<ExtArgs>;

  /**
   * `prisma.orderan`: Exposes CRUD operations for the **Orderan** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Orderans
   * const orderans = await prisma.orderan.findMany()
   * ```
   */
  get orderan(): Prisma.OrderanDelegate<ExtArgs>;

  /**
   * `prisma.produk`: Exposes CRUD operations for the **produk** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Produks
   * const produks = await prisma.produk.findMany()
   * ```
   */
  get produk(): Prisma.produkDelegate<ExtArgs>;

  /**
   * `prisma.travel`: Exposes CRUD operations for the **travel** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Travels
   * const travels = await prisma.travel.findMany()
   * ```
   */
  get travel(): Prisma.travelDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue }

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {
  }

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = { readonly [Key in string]?: InputJsonValue | null }

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {
  }

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never

      private constructor()
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never

      private constructor()
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never

      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
      ? U
      : T extends HasInclude
        ? U
        : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends ( ...args: any ) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    ( T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {} )

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
      U extends object ?
        ( Without<T, U> & U ) | ( Without<U, T> & T )
        : U : T

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
      ? False
      : T extends Uint8Array
        ? False
        : T extends BigInt
          ? False
          : T extends object
            ? True
            : False

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? ( k: U ) => void : never
    ) extends ( k: infer I ) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ? | ( K extends keyof O ? { [P in K]: O[P] } & O : O )
      | { [P in keyof O as P extends K ? K : never]-?: O[P] } & O
      : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
   A [[Boolean]]
   */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
   0
   */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [ A1 ] extends [ never ]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
      // based on the brilliant idea of Pierre-Antoine Mills
      // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
      T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends ( infer E )[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${ string }` ? never : T

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  export const ModelName: {
    List_produk: 'List_produk',
    Orderan: 'Orderan',
    produk: 'produk',
    travel: 'travel'
  };

  export type ModelName = ( typeof ModelName )[keyof typeof ModelName]

  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{ extArgs: $Extensions.Args }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'list_produk' | 'orderan' | 'produk' | 'travel'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      List_produk: {
        payload: List_produkPayload<ExtArgs>
        fields: Prisma.List_produkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.List_produkFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.List_produkFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          findFirst: {
            args: Prisma.List_produkFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.List_produkFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          findMany: {
            args: Prisma.List_produkFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>[]
          }
          create: {
            args: Prisma.List_produkCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          createMany: {
            args: Prisma.List_produkCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.List_produkDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          update: {
            args: Prisma.List_produkUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          deleteMany: {
            args: Prisma.List_produkDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.List_produkUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.List_produkUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<List_produkPayload>
          }
          aggregate: {
            args: Prisma.List_produkAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateList_produk>
          }
          groupBy: {
            args: Prisma.List_produkGroupByArgs<ExtArgs>,
            result: $Utils.Optional<List_produkGroupByOutputType>[]
          }
          count: {
            args: Prisma.List_produkCountArgs<ExtArgs>,
            result: $Utils.Optional<List_produkCountAggregateOutputType> | number
          }
        }
      }
      Orderan: {
        payload: OrderanPayload<ExtArgs>
        fields: Prisma.OrderanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderanFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderanFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          findFirst: {
            args: Prisma.OrderanFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderanFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          findMany: {
            args: Prisma.OrderanFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>[]
          }
          create: {
            args: Prisma.OrderanCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          createMany: {
            args: Prisma.OrderanCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.OrderanDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          update: {
            args: Prisma.OrderanUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          deleteMany: {
            args: Prisma.OrderanDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.OrderanUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.OrderanUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<OrderanPayload>
          }
          aggregate: {
            args: Prisma.OrderanAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateOrderan>
          }
          groupBy: {
            args: Prisma.OrderanGroupByArgs<ExtArgs>,
            result: $Utils.Optional<OrderanGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderanCountArgs<ExtArgs>,
            result: $Utils.Optional<OrderanCountAggregateOutputType> | number
          }
        }
      }
      produk: {
        payload: produkPayload<ExtArgs>
        fields: Prisma.produkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.produkFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.produkFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          findFirst: {
            args: Prisma.produkFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.produkFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          findMany: {
            args: Prisma.produkFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>[]
          }
          create: {
            args: Prisma.produkCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          createMany: {
            args: Prisma.produkCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.produkDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          update: {
            args: Prisma.produkUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          deleteMany: {
            args: Prisma.produkDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.produkUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.produkUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<produkPayload>
          }
          aggregate: {
            args: Prisma.ProdukAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateProduk>
          }
          groupBy: {
            args: Prisma.produkGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ProdukGroupByOutputType>[]
          }
          count: {
            args: Prisma.produkCountArgs<ExtArgs>,
            result: $Utils.Optional<ProdukCountAggregateOutputType> | number
          }
        }
      }
      travel: {
        payload: travelPayload<ExtArgs>
        fields: Prisma.travelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.travelFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.travelFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          findFirst: {
            args: Prisma.travelFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.travelFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          findMany: {
            args: Prisma.travelFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>[]
          }
          create: {
            args: Prisma.travelCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          createMany: {
            args: Prisma.travelCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.travelDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          update: {
            args: Prisma.travelUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          deleteMany: {
            args: Prisma.travelDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.travelUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.travelUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<travelPayload>
          }
          aggregate: {
            args: Prisma.TravelAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTravel>
          }
          groupBy: {
            args: Prisma.travelGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TravelGroupByOutputType>[]
          }
          count: {
            args: Prisma.travelCountArgs<ExtArgs>,
            result: $Utils.Optional<TravelCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [ query: string, ...values: any[] ],
          result: any
        }
        $executeRaw: {
          args: [ query: TemplateStringsArray | Prisma.Sql, ...values: any[] ],
          result: any
        }
        $queryRawUnsafe: {
          args: [ query: string, ...values: any[] ],
          result: any
        }
        $queryRaw: {
          args: [ query: TemplateStringsArray | Prisma.Sql, ...values: any[] ],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our
     *   [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */

  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: ( params: MiddlewareParams ) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel( log: Array<LogLevel | LogDefinition> ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */

  /**
   * Count Type OrderanCountOutputType
   */


  export type OrderanCountOutputType = {
    list_produk: number
  }

  export type OrderanCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    list_produk?: boolean | OrderanCountOutputTypeCountList_produkArgs
  }

  // Custom InputTypes

  /**
   * OrderanCountOutputType without action
   */
  export type OrderanCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderanCountOutputType
     */
    select?: OrderanCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderanCountOutputType without action
   */
  export type OrderanCountOutputTypeCountList_produkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: List_produkWhereInput
  }

  /**
   * Models
   */

  /**
   * Model List_produk
   */


  export type AggregateList_produk = {
    _count: List_produkCountAggregateOutputType | null
    _avg: List_produkAvgAggregateOutputType | null
    _sum: List_produkSumAggregateOutputType | null
    _min: List_produkMinAggregateOutputType | null
    _max: List_produkMaxAggregateOutputType | null
  }

  export type List_produkAvgAggregateOutputType = {
    harga: number | null
    jumlah: number | null
  }

  export type List_produkSumAggregateOutputType = {
    harga: number | null
    jumlah: number | null
  }

  export type List_produkMinAggregateOutputType = {
    id: string | null
    nama: string | null
    lokasi: string | null
    jenis: string | null
    img: string | null
    harga: number | null
    jumlah: number | null
    keterangan: string | null
    created_at: Date | null
    updated_at: Date | null
    orderanId: string | null
  }

  export type List_produkMaxAggregateOutputType = {
    id: string | null
    nama: string | null
    lokasi: string | null
    jenis: string | null
    img: string | null
    harga: number | null
    jumlah: number | null
    keterangan: string | null
    created_at: Date | null
    updated_at: Date | null
    orderanId: string | null
  }

  export type List_produkCountAggregateOutputType = {
    id: number
    nama: number
    lokasi: number
    jenis: number
    img: number
    harga: number
    jumlah: number
    keterangan: number
    created_at: number
    updated_at: number
    orderanId: number
    _all: number
  }

  export type List_produkAvgAggregateInputType = {
    harga?: true
    jumlah?: true
  }

  export type List_produkSumAggregateInputType = {
    harga?: true
    jumlah?: true
  }

  export type List_produkMinAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
    orderanId?: true
  }

  export type List_produkMaxAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
    orderanId?: true
  }

  export type List_produkCountAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
    orderanId?: true
    _all?: true
  }

  export type List_produkAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which List_produk to aggregate.
     */
    where?: List_produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of List_produks to fetch.
     */
    orderBy?: List_produkOrderByWithRelationInput | List_produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: List_produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` List_produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` List_produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned List_produks
     **/
    _count?: true | List_produkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: List_produkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: List_produkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: List_produkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: List_produkMaxAggregateInputType
  }

  export type GetList_produkAggregateType<T extends List_produkAggregateArgs> = {
    [P in keyof T & keyof AggregateList_produk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateList_produk[P]>
      : GetScalarType<T[P], AggregateList_produk[P]>
  }

  export type List_produkGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: List_produkWhereInput
    orderBy?: List_produkOrderByWithAggregationInput | List_produkOrderByWithAggregationInput[]
    by: List_produkScalarFieldEnum[] | List_produkScalarFieldEnum
    having?: List_produkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: List_produkCountAggregateInputType | true
    _avg?: List_produkAvgAggregateInputType
    _sum?: List_produkSumAggregateInputType
    _min?: List_produkMinAggregateInputType
    _max?: List_produkMaxAggregateInputType
  }

  export type List_produkGroupByOutputType = {
    id: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga: number | null
    jumlah: number | null
    keterangan: string
    created_at: Date
    updated_at: Date
    orderanId: string | null
    _count: List_produkCountAggregateOutputType | null
    _avg: List_produkAvgAggregateOutputType | null
    _sum: List_produkSumAggregateOutputType | null
    _min: List_produkMinAggregateOutputType | null
    _max: List_produkMaxAggregateOutputType | null
  }

  type GetList_produkGroupByPayload<T extends List_produkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<List_produkGroupByOutputType, T['by']> &
      {
        [P in ( ( keyof T ) & ( keyof List_produkGroupByOutputType ) )]: P extends '_count'
        ? T[P] extends boolean
          ? number
          : GetScalarType<T[P], List_produkGroupByOutputType[P]>
        : GetScalarType<T[P], List_produkGroupByOutputType[P]>
      }
    >
  >

  export type List_produkSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    jenis?: boolean
    img?: boolean
    harga?: boolean
    jumlah?: boolean
    keterangan?: boolean
    created_at?: boolean
    updated_at?: boolean
    orderanId?: boolean
    Orderan?: boolean | List_produk$OrderanArgs<ExtArgs>
  }, ExtArgs["result"]["list_produk"]>

  export type List_produkSelectScalar = {
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    jenis?: boolean
    img?: boolean
    harga?: boolean
    jumlah?: boolean
    keterangan?: boolean
    created_at?: boolean
    updated_at?: boolean
    orderanId?: boolean
  }

  export type List_produkInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    Orderan?: boolean | List_produk$OrderanArgs<ExtArgs>
  }

  type List_produkGetPayload<S extends boolean | null | undefined | List_produkArgs> = $Types.GetResult<List_produkPayload, S>

  type List_produkCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    Omit<List_produkFindManyArgs, 'select' | 'include'> & {
    select?: List_produkCountAggregateInputType | true
  }

  export interface List_produkDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [ K: symbol ]: { types: Prisma.TypeMap<ExtArgs>['model']['List_produk'], meta: { name: 'List_produk' } }
    /**
     * Find zero or one List_produk that matches the filter.
     * @param {List_produkFindUniqueArgs} args - Arguments to find a List_produk
     * @example
     * // Get one List_produk
     * const list_produk = await prisma.list_produk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends List_produkFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkFindUniqueArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one List_produk that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {List_produkFindUniqueOrThrowArgs} args - Arguments to find a List_produk
     * @example
     * // Get one List_produk
     * const list_produk = await prisma.list_produk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends List_produkFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first List_produk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkFindFirstArgs} args - Arguments to find a List_produk
     * @example
     * // Get one List_produk
     * const list_produk = await prisma.list_produk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends List_produkFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkFindFirstArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first List_produk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkFindFirstOrThrowArgs} args - Arguments to find a List_produk
     * @example
     * // Get one List_produk
     * const list_produk = await prisma.list_produk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends List_produkFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more List_produks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all List_produks
     * const list_produks = await prisma.list_produk.findMany()
     *
     * // Get first 10 List_produks
     * const list_produks = await prisma.list_produk.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const list_produkWithIdOnly = await prisma.list_produk.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends List_produkFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a List_produk.
     * @param {List_produkCreateArgs} args - Arguments to create a List_produk.
     * @example
     * // Create one List_produk
     * const List_produk = await prisma.list_produk.create({
     *   data: {
     *     // ... data to create a List_produk
     *   }
     * })
     *
     **/
    create<T extends List_produkCreateArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkCreateArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many List_produks.
     *     @param {List_produkCreateManyArgs} args - Arguments to create many List_produks.
     *     @example
     *     // Create many List_produks
     *     const list_produk = await prisma.list_produk.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends List_produkCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a List_produk.
     * @param {List_produkDeleteArgs} args - Arguments to delete one List_produk.
     * @example
     * // Delete one List_produk
     * const List_produk = await prisma.list_produk.delete({
     *   where: {
     *     // ... filter to delete one List_produk
     *   }
     * })
     *
     **/
    delete<T extends List_produkDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkDeleteArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one List_produk.
     * @param {List_produkUpdateArgs} args - Arguments to update one List_produk.
     * @example
     * // Update one List_produk
     * const list_produk = await prisma.list_produk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends List_produkUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkUpdateArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more List_produks.
     * @param {List_produkDeleteManyArgs} args - Arguments to filter List_produks to delete.
     * @example
     * // Delete a few List_produks
     * const { count } = await prisma.list_produk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends List_produkDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, List_produkDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more List_produks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many List_produks
     * const list_produk = await prisma.list_produk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends List_produkUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one List_produk.
     * @param {List_produkUpsertArgs} args - Arguments to update or create a List_produk.
     * @example
     * // Update or create a List_produk
     * const list_produk = await prisma.list_produk.upsert({
     *   create: {
     *     // ... data to create a List_produk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the List_produk we want to update
     *   }
     * })
     **/
    upsert<T extends List_produkUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, List_produkUpsertArgs<ExtArgs>>
    ): Prisma__List_produkClient<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of List_produks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkCountArgs} args - Arguments to filter List_produks to count.
     * @example
     * // Count the number of List_produks
     * const count = await prisma.list_produk.count({
     *   where: {
     *     // ... the filter for the List_produks we want to count
     *   }
     * })
     **/
    count<T extends List_produkCountArgs>(
      args?: Subset<T, List_produkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], List_produkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a List_produk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends List_produkAggregateArgs>( args: Subset<T, List_produkAggregateArgs> ): Prisma.PrismaPromise<GetList_produkAggregateType<T>>

    /**
     * Group by List_produk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {List_produkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends List_produkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: List_produkGroupByArgs['orderBy'] }
        : { orderBy?: List_produkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
                ? `Error: Field "${ P }" used in "having" needs to be provided in "by".`
                : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
    >( args: SubsetIntersection<T, List_produkGroupByArgs, OrderByArg> & InputErrors ): {} extends InputErrors ? GetList_produkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the List_produk model
     */
    readonly fields: List_produkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for List_produk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__List_produkClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;

    private readonly _queryType;

    private readonly _rootField;

    private readonly _clientMethod;

    private readonly _args;

    private readonly _dataPath;

    private readonly _errorFormat;

    private readonly _measurePerformance?;

    private _isList;

    private _callsite;

    private _requestPromise?;

    readonly [ Symbol.toStringTag ]: 'PrismaPromise';

    constructor( _dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean );

    Orderan<T extends List_produk$OrderanArgs<ExtArgs> = {}>( args?: Subset<T, List_produk$OrderanArgs<ExtArgs>> ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>( onfulfilled?: ( ( value: T ) => TResult1 | PromiseLike<TResult1> ) | undefined | null, onrejected?: ( ( reason: any ) => TResult2 | PromiseLike<TResult2> ) | undefined | null ): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>( onrejected?: ( ( reason: any ) => TResult | PromiseLike<TResult> ) | undefined | null ): Promise<T | TResult>;

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally( onfinally?: ( () => void ) | undefined | null ): Promise<T>;
  }

  /**
   * Fields of the List_produk model
   */
  interface List_produkFieldRefs {
    readonly id: FieldRef<"List_produk", 'String'>
    readonly nama: FieldRef<"List_produk", 'String'>
    readonly lokasi: FieldRef<"List_produk", 'String'>
    readonly jenis: FieldRef<"List_produk", 'String'>
    readonly img: FieldRef<"List_produk", 'String'>
    readonly harga: FieldRef<"List_produk", 'Int'>
    readonly jumlah: FieldRef<"List_produk", 'Int'>
    readonly keterangan: FieldRef<"List_produk", 'String'>
    readonly created_at: FieldRef<"List_produk", 'DateTime'>
    readonly updated_at: FieldRef<"List_produk", 'DateTime'>
    readonly orderanId: FieldRef<"List_produk", 'String'>
  }

  // Custom InputTypes

  /**
   * List_produk findUnique
   */
  export type List_produkFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter, which List_produk to fetch.
     */
    where: List_produkWhereUniqueInput
  }

  /**
   * List_produk findUniqueOrThrow
   */
  export type List_produkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter, which List_produk to fetch.
     */
    where: List_produkWhereUniqueInput
  }

  /**
   * List_produk findFirst
   */
  export type List_produkFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter, which List_produk to fetch.
     */
    where?: List_produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of List_produks to fetch.
     */
    orderBy?: List_produkOrderByWithRelationInput | List_produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for List_produks.
     */
    cursor?: List_produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` List_produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` List_produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of List_produks.
     */
    distinct?: List_produkScalarFieldEnum | List_produkScalarFieldEnum[]
  }

  /**
   * List_produk findFirstOrThrow
   */
  export type List_produkFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter, which List_produk to fetch.
     */
    where?: List_produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of List_produks to fetch.
     */
    orderBy?: List_produkOrderByWithRelationInput | List_produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for List_produks.
     */
    cursor?: List_produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` List_produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` List_produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of List_produks.
     */
    distinct?: List_produkScalarFieldEnum | List_produkScalarFieldEnum[]
  }

  /**
   * List_produk findMany
   */
  export type List_produkFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter, which List_produks to fetch.
     */
    where?: List_produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of List_produks to fetch.
     */
    orderBy?: List_produkOrderByWithRelationInput | List_produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing List_produks.
     */
    cursor?: List_produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` List_produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` List_produks.
     */
    skip?: number
    distinct?: List_produkScalarFieldEnum | List_produkScalarFieldEnum[]
  }

  /**
   * List_produk create
   */
  export type List_produkCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * The data needed to create a List_produk.
     */
    data: XOR<List_produkCreateInput, List_produkUncheckedCreateInput>
  }

  /**
   * List_produk createMany
   */
  export type List_produkCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many List_produks.
     */
    data: List_produkCreateManyInput | List_produkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * List_produk update
   */
  export type List_produkUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * The data needed to update a List_produk.
     */
    data: XOR<List_produkUpdateInput, List_produkUncheckedUpdateInput>
    /**
     * Choose, which List_produk to update.
     */
    where: List_produkWhereUniqueInput
  }

  /**
   * List_produk updateMany
   */
  export type List_produkUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update List_produks.
     */
    data: XOR<List_produkUpdateManyMutationInput, List_produkUncheckedUpdateManyInput>
    /**
     * Filter which List_produks to update
     */
    where?: List_produkWhereInput
  }

  /**
   * List_produk upsert
   */
  export type List_produkUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * The filter to search for the List_produk to update in case it exists.
     */
    where: List_produkWhereUniqueInput
    /**
     * In case the List_produk found by the `where` argument doesn't exist, create a new List_produk with this data.
     */
    create: XOR<List_produkCreateInput, List_produkUncheckedCreateInput>
    /**
     * In case the List_produk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<List_produkUpdateInput, List_produkUncheckedUpdateInput>
  }

  /**
   * List_produk delete
   */
  export type List_produkDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    /**
     * Filter which List_produk to delete.
     */
    where: List_produkWhereUniqueInput
  }

  /**
   * List_produk deleteMany
   */
  export type List_produkDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which List_produks to delete
     */
    where?: List_produkWhereInput
  }

  /**
   * List_produk.Orderan
   */
  export type List_produk$OrderanArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    where?: OrderanWhereInput
  }

  /**
   * List_produk without action
   */
  export type List_produkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
  }

  /**
   * Model Orderan
   */


  export type AggregateOrderan = {
    _count: OrderanCountAggregateOutputType | null
    _avg: OrderanAvgAggregateOutputType | null
    _sum: OrderanSumAggregateOutputType | null
    _min: OrderanMinAggregateOutputType | null
    _max: OrderanMaxAggregateOutputType | null
  }

  export type OrderanAvgAggregateOutputType = {
    ongkir: number | null
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
  }

  export type OrderanSumAggregateOutputType = {
    ongkir: number | null
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
  }

  export type OrderanMinAggregateOutputType = {
    id: string | null
    keterangan: string | null
    pesan: Date | null
    kirim: Date | null
    pengirim: string | null
    hpPengirim: string | null
    penerima: string | null
    alamatPenerima: string | null
    hpPenerima: string | null
    namaPengiriman: string | null
    ekspedisi: string | null
    ongkir: number | null
    no: string | null
    typePembayaran: string | null
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrderanMaxAggregateOutputType = {
    id: string | null
    keterangan: string | null
    pesan: Date | null
    kirim: Date | null
    pengirim: string | null
    hpPengirim: string | null
    penerima: string | null
    alamatPenerima: string | null
    hpPenerima: string | null
    namaPengiriman: string | null
    ekspedisi: string | null
    ongkir: number | null
    no: string | null
    typePembayaran: string | null
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type OrderanCountAggregateOutputType = {
    id: number
    keterangan: number
    pesan: number
    kirim: number
    pengirim: number
    hpPengirim: number
    penerima: number
    alamatPenerima: number
    hpPenerima: number
    namaPengiriman: number
    ekspedisi: number
    ongkir: number
    no: number
    typePembayaran: number
    total: number
    totalBayar: number
    totalPenjualan: number
    created_at: number
    updated_at: number
    _all: number
  }

  export type OrderanAvgAggregateInputType = {
    ongkir?: true
    total?: true
    totalBayar?: true
    totalPenjualan?: true
  }

  export type OrderanSumAggregateInputType = {
    ongkir?: true
    total?: true
    totalBayar?: true
    totalPenjualan?: true
  }

  export type OrderanMinAggregateInputType = {
    id?: true
    keterangan?: true
    pesan?: true
    kirim?: true
    pengirim?: true
    hpPengirim?: true
    penerima?: true
    alamatPenerima?: true
    hpPenerima?: true
    namaPengiriman?: true
    ekspedisi?: true
    ongkir?: true
    no?: true
    typePembayaran?: true
    total?: true
    totalBayar?: true
    totalPenjualan?: true
    created_at?: true
    updated_at?: true
  }

  export type OrderanMaxAggregateInputType = {
    id?: true
    keterangan?: true
    pesan?: true
    kirim?: true
    pengirim?: true
    hpPengirim?: true
    penerima?: true
    alamatPenerima?: true
    hpPenerima?: true
    namaPengiriman?: true
    ekspedisi?: true
    ongkir?: true
    no?: true
    typePembayaran?: true
    total?: true
    totalBayar?: true
    totalPenjualan?: true
    created_at?: true
    updated_at?: true
  }

  export type OrderanCountAggregateInputType = {
    id?: true
    keterangan?: true
    pesan?: true
    kirim?: true
    pengirim?: true
    hpPengirim?: true
    penerima?: true
    alamatPenerima?: true
    hpPenerima?: true
    namaPengiriman?: true
    ekspedisi?: true
    ongkir?: true
    no?: true
    typePembayaran?: true
    total?: true
    totalBayar?: true
    totalPenjualan?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type OrderanAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orderan to aggregate.
     */
    where?: OrderanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orderans to fetch.
     */
    orderBy?: OrderanOrderByWithRelationInput | OrderanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: OrderanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orderans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orderans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Orderans
     **/
    _count?: true | OrderanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: OrderanAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: OrderanSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: OrderanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: OrderanMaxAggregateInputType
  }

  export type GetOrderanAggregateType<T extends OrderanAggregateArgs> = {
    [P in keyof T & keyof AggregateOrderan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderan[P]>
      : GetScalarType<T[P], AggregateOrderan[P]>
  }

  export type OrderanGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: OrderanWhereInput
    orderBy?: OrderanOrderByWithAggregationInput | OrderanOrderByWithAggregationInput[]
    by: OrderanScalarFieldEnum[] | OrderanScalarFieldEnum
    having?: OrderanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderanCountAggregateInputType | true
    _avg?: OrderanAvgAggregateInputType
    _sum?: OrderanSumAggregateInputType
    _min?: OrderanMinAggregateInputType
    _max?: OrderanMaxAggregateInputType
  }

  export type OrderanGroupByOutputType = {
    id: string
    keterangan: string
    pesan: Date | null
    kirim: Date | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir: number | null
    no: string
    typePembayaran: string
    total: number | null
    totalBayar: number | null
    totalPenjualan: number | null
    created_at: Date
    updated_at: Date
    _count: OrderanCountAggregateOutputType | null
    _avg: OrderanAvgAggregateOutputType | null
    _sum: OrderanSumAggregateOutputType | null
    _min: OrderanMinAggregateOutputType | null
    _max: OrderanMaxAggregateOutputType | null
  }

  type GetOrderanGroupByPayload<T extends OrderanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderanGroupByOutputType, T['by']> &
      {
        [P in ( ( keyof T ) & ( keyof OrderanGroupByOutputType ) )]: P extends '_count'
        ? T[P] extends boolean
          ? number
          : GetScalarType<T[P], OrderanGroupByOutputType[P]>
        : GetScalarType<T[P], OrderanGroupByOutputType[P]>
      }
    >
  >

  export type OrderanSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    keterangan?: boolean
    pesan?: boolean
    kirim?: boolean
    pengirim?: boolean
    hpPengirim?: boolean
    penerima?: boolean
    alamatPenerima?: boolean
    hpPenerima?: boolean
    namaPengiriman?: boolean
    ekspedisi?: boolean
    ongkir?: boolean
    no?: boolean
    typePembayaran?: boolean
    total?: boolean
    totalBayar?: boolean
    totalPenjualan?: boolean
    created_at?: boolean
    updated_at?: boolean
    list_produk?: boolean | Orderan$list_produkArgs<ExtArgs>
    _count?: boolean | OrderanCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["orderan"]>

  export type OrderanSelectScalar = {
    id?: boolean
    keterangan?: boolean
    pesan?: boolean
    kirim?: boolean
    pengirim?: boolean
    hpPengirim?: boolean
    penerima?: boolean
    alamatPenerima?: boolean
    hpPenerima?: boolean
    namaPengiriman?: boolean
    ekspedisi?: boolean
    ongkir?: boolean
    no?: boolean
    typePembayaran?: boolean
    total?: boolean
    totalBayar?: boolean
    totalPenjualan?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type OrderanInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    list_produk?: boolean | Orderan$list_produkArgs<ExtArgs>
    _count?: boolean | OrderanCountOutputTypeArgs<ExtArgs>
  }

  type OrderanGetPayload<S extends boolean | null | undefined | OrderanArgs> = $Types.GetResult<OrderanPayload, S>

  type OrderanCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    Omit<OrderanFindManyArgs, 'select' | 'include'> & {
    select?: OrderanCountAggregateInputType | true
  }

  export interface OrderanDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [ K: symbol ]: { types: Prisma.TypeMap<ExtArgs>['model']['Orderan'], meta: { name: 'Orderan' } }
    /**
     * Find zero or one Orderan that matches the filter.
     * @param {OrderanFindUniqueArgs} args - Arguments to find a Orderan
     * @example
     * // Get one Orderan
     * const orderan = await prisma.orderan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends OrderanFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanFindUniqueArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Orderan that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {OrderanFindUniqueOrThrowArgs} args - Arguments to find a Orderan
     * @example
     * // Get one Orderan
     * const orderan = await prisma.orderan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends OrderanFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Orderan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanFindFirstArgs} args - Arguments to find a Orderan
     * @example
     * // Get one Orderan
     * const orderan = await prisma.orderan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends OrderanFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanFindFirstArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Orderan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanFindFirstOrThrowArgs} args - Arguments to find a Orderan
     * @example
     * // Get one Orderan
     * const orderan = await prisma.orderan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends OrderanFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Orderans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orderans
     * const orderans = await prisma.orderan.findMany()
     *
     * // Get first 10 Orderans
     * const orderans = await prisma.orderan.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const orderanWithIdOnly = await prisma.orderan.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends OrderanFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Orderan.
     * @param {OrderanCreateArgs} args - Arguments to create a Orderan.
     * @example
     * // Create one Orderan
     * const Orderan = await prisma.orderan.create({
     *   data: {
     *     // ... data to create a Orderan
     *   }
     * })
     *
     **/
    create<T extends OrderanCreateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanCreateArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Orderans.
     *     @param {OrderanCreateManyArgs} args - Arguments to create many Orderans.
     *     @example
     *     // Create many Orderans
     *     const orderan = await prisma.orderan.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends OrderanCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Orderan.
     * @param {OrderanDeleteArgs} args - Arguments to delete one Orderan.
     * @example
     * // Delete one Orderan
     * const Orderan = await prisma.orderan.delete({
     *   where: {
     *     // ... filter to delete one Orderan
     *   }
     * })
     *
     **/
    delete<T extends OrderanDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanDeleteArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Orderan.
     * @param {OrderanUpdateArgs} args - Arguments to update one Orderan.
     * @example
     * // Update one Orderan
     * const orderan = await prisma.orderan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends OrderanUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanUpdateArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Orderans.
     * @param {OrderanDeleteManyArgs} args - Arguments to filter Orderans to delete.
     * @example
     * // Delete a few Orderans
     * const { count } = await prisma.orderan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends OrderanDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, OrderanDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orderans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orderans
     * const orderan = await prisma.orderan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends OrderanUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Orderan.
     * @param {OrderanUpsertArgs} args - Arguments to update or create a Orderan.
     * @example
     * // Update or create a Orderan
     * const orderan = await prisma.orderan.upsert({
     *   create: {
     *     // ... data to create a Orderan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Orderan we want to update
     *   }
     * })
     **/
    upsert<T extends OrderanUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, OrderanUpsertArgs<ExtArgs>>
    ): Prisma__OrderanClient<$Types.GetResult<OrderanPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Orderans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanCountArgs} args - Arguments to filter Orderans to count.
     * @example
     * // Count the number of Orderans
     * const count = await prisma.orderan.count({
     *   where: {
     *     // ... the filter for the Orderans we want to count
     *   }
     * })
     **/
    count<T extends OrderanCountArgs>(
      args?: Subset<T, OrderanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Orderan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends OrderanAggregateArgs>( args: Subset<T, OrderanAggregateArgs> ): Prisma.PrismaPromise<GetOrderanAggregateType<T>>

    /**
     * Group by Orderan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends OrderanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderanGroupByArgs['orderBy'] }
        : { orderBy?: OrderanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
                ? `Error: Field "${ P }" used in "having" needs to be provided in "by".`
                : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
    >( args: SubsetIntersection<T, OrderanGroupByArgs, OrderByArg> & InputErrors ): {} extends InputErrors ? GetOrderanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the Orderan model
     */
    readonly fields: OrderanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Orderan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OrderanClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;

    private readonly _queryType;

    private readonly _rootField;

    private readonly _clientMethod;

    private readonly _args;

    private readonly _dataPath;

    private readonly _errorFormat;

    private readonly _measurePerformance?;

    private _isList;

    private _callsite;

    private _requestPromise?;

    readonly [ Symbol.toStringTag ]: 'PrismaPromise';

    constructor( _dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean );

    list_produk<T extends Orderan$list_produkArgs<ExtArgs> = {}>( args?: Subset<T, Orderan$list_produkArgs<ExtArgs>> ): Prisma.PrismaPromise<$Types.GetResult<List_produkPayload<ExtArgs>, T, 'findMany'> | Null>;

    private get _document();

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>( onfulfilled?: ( ( value: T ) => TResult1 | PromiseLike<TResult1> ) | undefined | null, onrejected?: ( ( reason: any ) => TResult2 | PromiseLike<TResult2> ) | undefined | null ): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>( onrejected?: ( ( reason: any ) => TResult | PromiseLike<TResult> ) | undefined | null ): Promise<T | TResult>;

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally( onfinally?: ( () => void ) | undefined | null ): Promise<T>;
  }

  /**
   * Fields of the Orderan model
   */
  interface OrderanFieldRefs {
    readonly id: FieldRef<"Orderan", 'String'>
    readonly keterangan: FieldRef<"Orderan", 'String'>
    readonly pesan: FieldRef<"Orderan", 'DateTime'>
    readonly kirim: FieldRef<"Orderan", 'DateTime'>
    readonly pengirim: FieldRef<"Orderan", 'String'>
    readonly hpPengirim: FieldRef<"Orderan", 'String'>
    readonly penerima: FieldRef<"Orderan", 'String'>
    readonly alamatPenerima: FieldRef<"Orderan", 'String'>
    readonly hpPenerima: FieldRef<"Orderan", 'String'>
    readonly namaPengiriman: FieldRef<"Orderan", 'String'>
    readonly ekspedisi: FieldRef<"Orderan", 'String'>
    readonly ongkir: FieldRef<"Orderan", 'Int'>
    readonly no: FieldRef<"Orderan", 'String'>
    readonly typePembayaran: FieldRef<"Orderan", 'String'>
    readonly total: FieldRef<"Orderan", 'Int'>
    readonly totalBayar: FieldRef<"Orderan", 'Int'>
    readonly totalPenjualan: FieldRef<"Orderan", 'Int'>
    readonly created_at: FieldRef<"Orderan", 'DateTime'>
    readonly updated_at: FieldRef<"Orderan", 'DateTime'>
  }

  // Custom InputTypes

  /**
   * Orderan findUnique
   */
  export type OrderanFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter, which Orderan to fetch.
     */
    where: OrderanWhereUniqueInput
  }

  /**
   * Orderan findUniqueOrThrow
   */
  export type OrderanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter, which Orderan to fetch.
     */
    where: OrderanWhereUniqueInput
  }

  /**
   * Orderan findFirst
   */
  export type OrderanFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter, which Orderan to fetch.
     */
    where?: OrderanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orderans to fetch.
     */
    orderBy?: OrderanOrderByWithRelationInput | OrderanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orderans.
     */
    cursor?: OrderanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orderans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orderans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orderans.
     */
    distinct?: OrderanScalarFieldEnum | OrderanScalarFieldEnum[]
  }

  /**
   * Orderan findFirstOrThrow
   */
  export type OrderanFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter, which Orderan to fetch.
     */
    where?: OrderanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orderans to fetch.
     */
    orderBy?: OrderanOrderByWithRelationInput | OrderanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Orderans.
     */
    cursor?: OrderanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orderans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orderans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Orderans.
     */
    distinct?: OrderanScalarFieldEnum | OrderanScalarFieldEnum[]
  }

  /**
   * Orderan findMany
   */
  export type OrderanFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter, which Orderans to fetch.
     */
    where?: OrderanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Orderans to fetch.
     */
    orderBy?: OrderanOrderByWithRelationInput | OrderanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Orderans.
     */
    cursor?: OrderanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Orderans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Orderans.
     */
    skip?: number
    distinct?: OrderanScalarFieldEnum | OrderanScalarFieldEnum[]
  }

  /**
   * Orderan create
   */
  export type OrderanCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * The data needed to create a Orderan.
     */
    data: XOR<OrderanCreateInput, OrderanUncheckedCreateInput>
  }

  /**
   * Orderan createMany
   */
  export type OrderanCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orderans.
     */
    data: OrderanCreateManyInput | OrderanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Orderan update
   */
  export type OrderanUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * The data needed to update a Orderan.
     */
    data: XOR<OrderanUpdateInput, OrderanUncheckedUpdateInput>
    /**
     * Choose, which Orderan to update.
     */
    where: OrderanWhereUniqueInput
  }

  /**
   * Orderan updateMany
   */
  export type OrderanUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orderans.
     */
    data: XOR<OrderanUpdateManyMutationInput, OrderanUncheckedUpdateManyInput>
    /**
     * Filter which Orderans to update
     */
    where?: OrderanWhereInput
  }

  /**
   * Orderan upsert
   */
  export type OrderanUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * The filter to search for the Orderan to update in case it exists.
     */
    where: OrderanWhereUniqueInput
    /**
     * In case the Orderan found by the `where` argument doesn't exist, create a new Orderan with this data.
     */
    create: XOR<OrderanCreateInput, OrderanUncheckedCreateInput>
    /**
     * In case the Orderan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderanUpdateInput, OrderanUncheckedUpdateInput>
  }

  /**
   * Orderan delete
   */
  export type OrderanDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
    /**
     * Filter which Orderan to delete.
     */
    where: OrderanWhereUniqueInput
  }

  /**
   * Orderan deleteMany
   */
  export type OrderanDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orderans to delete
     */
    where?: OrderanWhereInput
  }

  /**
   * Orderan.list_produk
   */
  export type Orderan$list_produkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the List_produk
     */
    select?: List_produkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: List_produkInclude<ExtArgs> | null
    where?: List_produkWhereInput
    orderBy?: List_produkOrderByWithRelationInput | List_produkOrderByWithRelationInput[]
    cursor?: List_produkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: List_produkScalarFieldEnum | List_produkScalarFieldEnum[]
  }

  /**
   * Orderan without action
   */
  export type OrderanArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Orderan
     */
    select?: OrderanSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: OrderanInclude<ExtArgs> | null
  }

  /**
   * Model produk
   */


  export type AggregateProduk = {
    _count: ProdukCountAggregateOutputType | null
    _avg: ProdukAvgAggregateOutputType | null
    _sum: ProdukSumAggregateOutputType | null
    _min: ProdukMinAggregateOutputType | null
    _max: ProdukMaxAggregateOutputType | null
  }

  export type ProdukAvgAggregateOutputType = {
    harga: number | null
    jumlah: number | null
  }

  export type ProdukSumAggregateOutputType = {
    harga: number | null
    jumlah: number | null
  }

  export type ProdukMinAggregateOutputType = {
    id: string | null
    nama: string | null
    lokasi: string | null
    jenis: string | null
    img: string | null
    harga: number | null
    jumlah: number | null
    keterangan: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProdukMaxAggregateOutputType = {
    id: string | null
    nama: string | null
    lokasi: string | null
    jenis: string | null
    img: string | null
    harga: number | null
    jumlah: number | null
    keterangan: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ProdukCountAggregateOutputType = {
    id: number
    nama: number
    lokasi: number
    jenis: number
    img: number
    harga: number
    jumlah: number
    keterangan: number
    created_at: number
    updated_at: number
    _all: number
  }

  export type ProdukAvgAggregateInputType = {
    harga?: true
    jumlah?: true
  }

  export type ProdukSumAggregateInputType = {
    harga?: true
    jumlah?: true
  }

  export type ProdukMinAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
  }

  export type ProdukMaxAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
  }

  export type ProdukCountAggregateInputType = {
    id?: true
    nama?: true
    lokasi?: true
    jenis?: true
    img?: true
    harga?: true
    jumlah?: true
    keterangan?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ProdukAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which produk to aggregate.
     */
    where?: produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produks to fetch.
     */
    orderBy?: produkOrderByWithRelationInput | produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned produks
     **/
    _count?: true | ProdukCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ProdukAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ProdukSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ProdukMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ProdukMaxAggregateInputType
  }

  export type GetProdukAggregateType<T extends ProdukAggregateArgs> = {
    [P in keyof T & keyof AggregateProduk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduk[P]>
      : GetScalarType<T[P], AggregateProduk[P]>
  }

  export type produkGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: produkWhereInput
    orderBy?: produkOrderByWithAggregationInput | produkOrderByWithAggregationInput[]
    by: ProdukScalarFieldEnum[] | ProdukScalarFieldEnum
    having?: produkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProdukCountAggregateInputType | true
    _avg?: ProdukAvgAggregateInputType
    _sum?: ProdukSumAggregateInputType
    _min?: ProdukMinAggregateInputType
    _max?: ProdukMaxAggregateInputType
  }

  export type ProdukGroupByOutputType = {
    id: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga: number | null
    jumlah: number | null
    keterangan: string
    created_at: Date
    updated_at: Date
    _count: ProdukCountAggregateOutputType | null
    _avg: ProdukAvgAggregateOutputType | null
    _sum: ProdukSumAggregateOutputType | null
    _min: ProdukMinAggregateOutputType | null
    _max: ProdukMaxAggregateOutputType | null
  }

  type GetProdukGroupByPayload<T extends produkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProdukGroupByOutputType, T['by']> &
      {
        [P in ( ( keyof T ) & ( keyof ProdukGroupByOutputType ) )]: P extends '_count'
        ? T[P] extends boolean
          ? number
          : GetScalarType<T[P], ProdukGroupByOutputType[P]>
        : GetScalarType<T[P], ProdukGroupByOutputType[P]>
      }
    >
  >

  export type produkSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    jenis?: boolean
    img?: boolean
    harga?: boolean
    jumlah?: boolean
    keterangan?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["produk"]>

  export type produkSelectScalar = {
    id?: boolean
    nama?: boolean
    lokasi?: boolean
    jenis?: boolean
    img?: boolean
    harga?: boolean
    jumlah?: boolean
    keterangan?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  type produkGetPayload<S extends boolean | null | undefined | produkArgs> = $Types.GetResult<produkPayload, S>

  type produkCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    Omit<produkFindManyArgs, 'select' | 'include'> & {
    select?: ProdukCountAggregateInputType | true
  }

  export interface produkDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [ K: symbol ]: { types: Prisma.TypeMap<ExtArgs>['model']['produk'], meta: { name: 'produk' } }
    /**
     * Find zero or one Produk that matches the filter.
     * @param {produkFindUniqueArgs} args - Arguments to find a Produk
     * @example
     * // Get one Produk
     * const produk = await prisma.produk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends produkFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, produkFindUniqueArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Produk that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {produkFindUniqueOrThrowArgs} args - Arguments to find a Produk
     * @example
     * // Get one Produk
     * const produk = await prisma.produk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends produkFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, produkFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Produk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkFindFirstArgs} args - Arguments to find a Produk
     * @example
     * // Get one Produk
     * const produk = await prisma.produk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends produkFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, produkFindFirstArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Produk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkFindFirstOrThrowArgs} args - Arguments to find a Produk
     * @example
     * // Get one Produk
     * const produk = await prisma.produk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends produkFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, produkFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Produks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Produks
     * const produks = await prisma.produk.findMany()
     *
     * // Get first 10 Produks
     * const produks = await prisma.produk.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const produkWithIdOnly = await prisma.produk.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends produkFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, produkFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<produkPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Produk.
     * @param {produkCreateArgs} args - Arguments to create a Produk.
     * @example
     * // Create one Produk
     * const Produk = await prisma.produk.create({
     *   data: {
     *     // ... data to create a Produk
     *   }
     * })
     *
     **/
    create<T extends produkCreateArgs<ExtArgs>>(
      args: SelectSubset<T, produkCreateArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Produks.
     *     @param {produkCreateManyArgs} args - Arguments to create many Produks.
     *     @example
     *     // Create many Produks
     *     const produk = await prisma.produk.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends produkCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, produkCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Produk.
     * @param {produkDeleteArgs} args - Arguments to delete one Produk.
     * @example
     * // Delete one Produk
     * const Produk = await prisma.produk.delete({
     *   where: {
     *     // ... filter to delete one Produk
     *   }
     * })
     *
     **/
    delete<T extends produkDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, produkDeleteArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Produk.
     * @param {produkUpdateArgs} args - Arguments to update one Produk.
     * @example
     * // Update one Produk
     * const produk = await prisma.produk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends produkUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, produkUpdateArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Produks.
     * @param {produkDeleteManyArgs} args - Arguments to filter Produks to delete.
     * @example
     * // Delete a few Produks
     * const { count } = await prisma.produk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends produkDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, produkDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Produks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Produks
     * const produk = await prisma.produk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends produkUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, produkUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Produk.
     * @param {produkUpsertArgs} args - Arguments to update or create a Produk.
     * @example
     * // Update or create a Produk
     * const produk = await prisma.produk.upsert({
     *   create: {
     *     // ... data to create a Produk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Produk we want to update
     *   }
     * })
     **/
    upsert<T extends produkUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, produkUpsertArgs<ExtArgs>>
    ): Prisma__produkClient<$Types.GetResult<produkPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Produks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkCountArgs} args - Arguments to filter Produks to count.
     * @example
     * // Count the number of Produks
     * const count = await prisma.produk.count({
     *   where: {
     *     // ... the filter for the Produks we want to count
     *   }
     * })
     **/
    count<T extends produkCountArgs>(
      args?: Subset<T, produkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProdukCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Produk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProdukAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ProdukAggregateArgs>( args: Subset<T, ProdukAggregateArgs> ): Prisma.PrismaPromise<GetProdukAggregateType<T>>

    /**
     * Group by Produk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {produkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends produkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: produkGroupByArgs['orderBy'] }
        : { orderBy?: produkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
                ? `Error: Field "${ P }" used in "having" needs to be provided in "by".`
                : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
    >( args: SubsetIntersection<T, produkGroupByArgs, OrderByArg> & InputErrors ): {} extends InputErrors ? GetProdukGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the produk model
     */
    readonly fields: produkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for produk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__produkClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;

    private readonly _queryType;

    private readonly _rootField;

    private readonly _clientMethod;

    private readonly _args;

    private readonly _dataPath;

    private readonly _errorFormat;

    private readonly _measurePerformance?;

    private _isList;

    private _callsite;

    private _requestPromise?;

    readonly [ Symbol.toStringTag ]: 'PrismaPromise';

    constructor( _dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean );

    private get _document();

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>( onfulfilled?: ( ( value: T ) => TResult1 | PromiseLike<TResult1> ) | undefined | null, onrejected?: ( ( reason: any ) => TResult2 | PromiseLike<TResult2> ) | undefined | null ): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>( onrejected?: ( ( reason: any ) => TResult | PromiseLike<TResult> ) | undefined | null ): Promise<T | TResult>;

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally( onfinally?: ( () => void ) | undefined | null ): Promise<T>;
  }

  /**
   * Fields of the produk model
   */
  interface produkFieldRefs {
    readonly id: FieldRef<"produk", 'String'>
    readonly nama: FieldRef<"produk", 'String'>
    readonly lokasi: FieldRef<"produk", 'String'>
    readonly jenis: FieldRef<"produk", 'String'>
    readonly img: FieldRef<"produk", 'String'>
    readonly harga: FieldRef<"produk", 'Int'>
    readonly jumlah: FieldRef<"produk", 'Int'>
    readonly keterangan: FieldRef<"produk", 'String'>
    readonly created_at: FieldRef<"produk", 'DateTime'>
    readonly updated_at: FieldRef<"produk", 'DateTime'>
  }

  // Custom InputTypes

  /**
   * produk findUnique
   */
  export type produkFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter, which produk to fetch.
     */
    where: produkWhereUniqueInput
  }

  /**
   * produk findUniqueOrThrow
   */
  export type produkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter, which produk to fetch.
     */
    where: produkWhereUniqueInput
  }

  /**
   * produk findFirst
   */
  export type produkFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter, which produk to fetch.
     */
    where?: produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produks to fetch.
     */
    orderBy?: produkOrderByWithRelationInput | produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for produks.
     */
    cursor?: produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of produks.
     */
    distinct?: ProdukScalarFieldEnum | ProdukScalarFieldEnum[]
  }

  /**
   * produk findFirstOrThrow
   */
  export type produkFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter, which produk to fetch.
     */
    where?: produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produks to fetch.
     */
    orderBy?: produkOrderByWithRelationInput | produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for produks.
     */
    cursor?: produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of produks.
     */
    distinct?: ProdukScalarFieldEnum | ProdukScalarFieldEnum[]
  }

  /**
   * produk findMany
   */
  export type produkFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter, which produks to fetch.
     */
    where?: produkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of produks to fetch.
     */
    orderBy?: produkOrderByWithRelationInput | produkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing produks.
     */
    cursor?: produkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` produks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` produks.
     */
    skip?: number
    distinct?: ProdukScalarFieldEnum | ProdukScalarFieldEnum[]
  }

  /**
   * produk create
   */
  export type produkCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * The data needed to create a produk.
     */
    data: XOR<produkCreateInput, produkUncheckedCreateInput>
  }

  /**
   * produk createMany
   */
  export type produkCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many produks.
     */
    data: produkCreateManyInput | produkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * produk update
   */
  export type produkUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * The data needed to update a produk.
     */
    data: XOR<produkUpdateInput, produkUncheckedUpdateInput>
    /**
     * Choose, which produk to update.
     */
    where: produkWhereUniqueInput
  }

  /**
   * produk updateMany
   */
  export type produkUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update produks.
     */
    data: XOR<produkUpdateManyMutationInput, produkUncheckedUpdateManyInput>
    /**
     * Filter which produks to update
     */
    where?: produkWhereInput
  }

  /**
   * produk upsert
   */
  export type produkUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * The filter to search for the produk to update in case it exists.
     */
    where: produkWhereUniqueInput
    /**
     * In case the produk found by the `where` argument doesn't exist, create a new produk with this data.
     */
    create: XOR<produkCreateInput, produkUncheckedCreateInput>
    /**
     * In case the produk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<produkUpdateInput, produkUncheckedUpdateInput>
  }

  /**
   * produk delete
   */
  export type produkDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
    /**
     * Filter which produk to delete.
     */
    where: produkWhereUniqueInput
  }

  /**
   * produk deleteMany
   */
  export type produkDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which produks to delete
     */
    where?: produkWhereInput
  }

  /**
   * produk without action
   */
  export type produkArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the produk
     */
    select?: produkSelect<ExtArgs> | null
  }

  /**
   * Model travel
   */


  export type AggregateTravel = {
    _count: TravelCountAggregateOutputType | null
    _avg: TravelAvgAggregateOutputType | null
    _sum: TravelSumAggregateOutputType | null
    _min: TravelMinAggregateOutputType | null
    _max: TravelMaxAggregateOutputType | null
  }

  export type TravelAvgAggregateOutputType = {
    harga: number | null
  }

  export type TravelSumAggregateOutputType = {
    harga: number | null
  }

  export type TravelMinAggregateOutputType = {
    id: string | null
    namaPengiriman: string | null
    noHpPerusahaan: string | null
    lokasi: string | null
    jenis: string | null
    harga: number | null
    img: string | null
    keterangan: string | null
  }

  export type TravelMaxAggregateOutputType = {
    id: string | null
    namaPengiriman: string | null
    noHpPerusahaan: string | null
    lokasi: string | null
    jenis: string | null
    harga: number | null
    img: string | null
    keterangan: string | null
  }

  export type TravelCountAggregateOutputType = {
    id: number
    namaPengiriman: number
    noHpPerusahaan: number
    lokasi: number
    jenis: number
    harga: number
    img: number
    keterangan: number
    _all: number
  }

  export type TravelAvgAggregateInputType = {
    harga?: true
  }

  export type TravelSumAggregateInputType = {
    harga?: true
  }

  export type TravelMinAggregateInputType = {
    id?: true
    namaPengiriman?: true
    noHpPerusahaan?: true
    lokasi?: true
    jenis?: true
    harga?: true
    img?: true
    keterangan?: true
  }

  export type TravelMaxAggregateInputType = {
    id?: true
    namaPengiriman?: true
    noHpPerusahaan?: true
    lokasi?: true
    jenis?: true
    harga?: true
    img?: true
    keterangan?: true
  }

  export type TravelCountAggregateInputType = {
    id?: true
    namaPengiriman?: true
    noHpPerusahaan?: true
    lokasi?: true
    jenis?: true
    harga?: true
    img?: true
    keterangan?: true
    _all?: true
  }

  export type TravelAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which travel to aggregate.
     */
    where?: travelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of travels to fetch.
     */
    orderBy?: travelOrderByWithRelationInput | travelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: travelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` travels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` travels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned travels
     **/
    _count?: true | TravelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: TravelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: TravelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: TravelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: TravelMaxAggregateInputType
  }

  export type GetTravelAggregateType<T extends TravelAggregateArgs> = {
    [P in keyof T & keyof AggregateTravel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTravel[P]>
      : GetScalarType<T[P], AggregateTravel[P]>
  }

  export type travelGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: travelWhereInput
    orderBy?: travelOrderByWithAggregationInput | travelOrderByWithAggregationInput[]
    by: TravelScalarFieldEnum[] | TravelScalarFieldEnum
    having?: travelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TravelCountAggregateInputType | true
    _avg?: TravelAvgAggregateInputType
    _sum?: TravelSumAggregateInputType
    _min?: TravelMinAggregateInputType
    _max?: TravelMaxAggregateInputType
  }

  export type TravelGroupByOutputType = {
    id: string
    namaPengiriman: string
    noHpPerusahaan: string
    lokasi: string
    jenis: string
    harga: number
    img: string
    keterangan: string
    _count: TravelCountAggregateOutputType | null
    _avg: TravelAvgAggregateOutputType | null
    _sum: TravelSumAggregateOutputType | null
    _min: TravelMinAggregateOutputType | null
    _max: TravelMaxAggregateOutputType | null
  }

  type GetTravelGroupByPayload<T extends travelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TravelGroupByOutputType, T['by']> &
      {
        [P in ( ( keyof T ) & ( keyof TravelGroupByOutputType ) )]: P extends '_count'
        ? T[P] extends boolean
          ? number
          : GetScalarType<T[P], TravelGroupByOutputType[P]>
        : GetScalarType<T[P], TravelGroupByOutputType[P]>
      }
    >
  >

  export type travelSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    namaPengiriman?: boolean
    noHpPerusahaan?: boolean
    lokasi?: boolean
    jenis?: boolean
    harga?: boolean
    img?: boolean
    keterangan?: boolean
  }, ExtArgs["result"]["travel"]>

  export type travelSelectScalar = {
    id?: boolean
    namaPengiriman?: boolean
    noHpPerusahaan?: boolean
    lokasi?: boolean
    jenis?: boolean
    harga?: boolean
    img?: boolean
    keterangan?: boolean
  }

  type travelGetPayload<S extends boolean | null | undefined | travelArgs> = $Types.GetResult<travelPayload, S>

  type travelCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    Omit<travelFindManyArgs, 'select' | 'include'> & {
    select?: TravelCountAggregateInputType | true
  }

  export interface travelDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [ K: symbol ]: { types: Prisma.TypeMap<ExtArgs>['model']['travel'], meta: { name: 'travel' } }
    /**
     * Find zero or one Travel that matches the filter.
     * @param {travelFindUniqueArgs} args - Arguments to find a Travel
     * @example
     * // Get one Travel
     * const travel = await prisma.travel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<T extends travelFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, travelFindUniqueArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Travel that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {travelFindUniqueOrThrowArgs} args - Arguments to find a Travel
     * @example
     * // Get one Travel
     * const travel = await prisma.travel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends travelFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, travelFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Travel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelFindFirstArgs} args - Arguments to find a Travel
     * @example
     * // Get one Travel
     * const travel = await prisma.travel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<T extends travelFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, travelFindFirstArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Travel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelFindFirstOrThrowArgs} args - Arguments to find a Travel
     * @example
     * // Get one Travel
     * const travel = await prisma.travel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends travelFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, travelFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Travels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Travels
     * const travels = await prisma.travel.findMany()
     *
     * // Get first 10 Travels
     * const travels = await prisma.travel.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const travelWithIdOnly = await prisma.travel.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends travelFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, travelFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<travelPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Travel.
     * @param {travelCreateArgs} args - Arguments to create a Travel.
     * @example
     * // Create one Travel
     * const Travel = await prisma.travel.create({
     *   data: {
     *     // ... data to create a Travel
     *   }
     * })
     *
     **/
    create<T extends travelCreateArgs<ExtArgs>>(
      args: SelectSubset<T, travelCreateArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Travels.
     *     @param {travelCreateManyArgs} args - Arguments to create many Travels.
     *     @example
     *     // Create many Travels
     *     const travel = await prisma.travel.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends travelCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, travelCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Travel.
     * @param {travelDeleteArgs} args - Arguments to delete one Travel.
     * @example
     * // Delete one Travel
     * const Travel = await prisma.travel.delete({
     *   where: {
     *     // ... filter to delete one Travel
     *   }
     * })
     *
     **/
    delete<T extends travelDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, travelDeleteArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Travel.
     * @param {travelUpdateArgs} args - Arguments to update one Travel.
     * @example
     * // Update one Travel
     * const travel = await prisma.travel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends travelUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, travelUpdateArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Travels.
     * @param {travelDeleteManyArgs} args - Arguments to filter Travels to delete.
     * @example
     * // Delete a few Travels
     * const { count } = await prisma.travel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends travelDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, travelDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Travels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Travels
     * const travel = await prisma.travel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends travelUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, travelUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Travel.
     * @param {travelUpsertArgs} args - Arguments to update or create a Travel.
     * @example
     * // Update or create a Travel
     * const travel = await prisma.travel.upsert({
     *   create: {
     *     // ... data to create a Travel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Travel we want to update
     *   }
     * })
     **/
    upsert<T extends travelUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, travelUpsertArgs<ExtArgs>>
    ): Prisma__travelClient<$Types.GetResult<travelPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Travels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelCountArgs} args - Arguments to filter Travels to count.
     * @example
     * // Count the number of Travels
     * const count = await prisma.travel.count({
     *   where: {
     *     // ... the filter for the Travels we want to count
     *   }
     * })
     **/
    count<T extends travelCountArgs>(
      args?: Subset<T, travelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TravelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Travel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TravelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends TravelAggregateArgs>( args: Subset<T, TravelAggregateArgs> ): Prisma.PrismaPromise<GetTravelAggregateType<T>>

    /**
     * Group by Travel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {travelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends travelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: travelGroupByArgs['orderBy'] }
        : { orderBy?: travelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
                ? `Error: Field "${ P }" used in "having" needs to be provided in "by".`
                : [
                  Error,
                  'Field ',
                  P,
                  ` in "having" needs to be provided in "by"`,
                ]
          }[HavingFields]
          : 'take' extends Keys<T>
            ? 'orderBy' extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : 'skip' extends Keys<T>
              ? 'orderBy' extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                  }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                  [P in OrderFields]: P extends ByFields
                    ? never
                    : `Error: Field "${ P }" in "orderBy" needs to be provided in "by"`
                }[OrderFields]
    >( args: SubsetIntersection<T, travelGroupByArgs, OrderByArg> & InputErrors ): {} extends InputErrors ? GetTravelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
    /**
     * Fields of the travel model
     */
    readonly fields: travelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for travel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__travelClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;

    private readonly _queryType;

    private readonly _rootField;

    private readonly _clientMethod;

    private readonly _args;

    private readonly _dataPath;

    private readonly _errorFormat;

    private readonly _measurePerformance?;

    private _isList;

    private _callsite;

    private _requestPromise?;

    readonly [ Symbol.toStringTag ]: 'PrismaPromise';

    constructor( _dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean );

    private get _document();

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>( onfulfilled?: ( ( value: T ) => TResult1 | PromiseLike<TResult1> ) | undefined | null, onrejected?: ( ( reason: any ) => TResult2 | PromiseLike<TResult2> ) | undefined | null ): Promise<TResult1 | TResult2>;

    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>( onrejected?: ( ( reason: any ) => TResult | PromiseLike<TResult> ) | undefined | null ): Promise<T | TResult>;

    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally( onfinally?: ( () => void ) | undefined | null ): Promise<T>;
  }

  /**
   * Fields of the travel model
   */
  interface travelFieldRefs {
    readonly id: FieldRef<"travel", 'String'>
    readonly namaPengiriman: FieldRef<"travel", 'String'>
    readonly noHpPerusahaan: FieldRef<"travel", 'String'>
    readonly lokasi: FieldRef<"travel", 'String'>
    readonly jenis: FieldRef<"travel", 'String'>
    readonly harga: FieldRef<"travel", 'Int'>
    readonly img: FieldRef<"travel", 'String'>
    readonly keterangan: FieldRef<"travel", 'String'>
  }

  // Custom InputTypes

  /**
   * travel findUnique
   */
  export type travelFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter, which travel to fetch.
     */
    where: travelWhereUniqueInput
  }

  /**
   * travel findUniqueOrThrow
   */
  export type travelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter, which travel to fetch.
     */
    where: travelWhereUniqueInput
  }

  /**
   * travel findFirst
   */
  export type travelFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter, which travel to fetch.
     */
    where?: travelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of travels to fetch.
     */
    orderBy?: travelOrderByWithRelationInput | travelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for travels.
     */
    cursor?: travelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` travels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` travels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of travels.
     */
    distinct?: TravelScalarFieldEnum | TravelScalarFieldEnum[]
  }

  /**
   * travel findFirstOrThrow
   */
  export type travelFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter, which travel to fetch.
     */
    where?: travelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of travels to fetch.
     */
    orderBy?: travelOrderByWithRelationInput | travelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for travels.
     */
    cursor?: travelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` travels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` travels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of travels.
     */
    distinct?: TravelScalarFieldEnum | TravelScalarFieldEnum[]
  }

  /**
   * travel findMany
   */
  export type travelFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter, which travels to fetch.
     */
    where?: travelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of travels to fetch.
     */
    orderBy?: travelOrderByWithRelationInput | travelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing travels.
     */
    cursor?: travelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` travels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` travels.
     */
    skip?: number
    distinct?: TravelScalarFieldEnum | TravelScalarFieldEnum[]
  }

  /**
   * travel create
   */
  export type travelCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * The data needed to create a travel.
     */
    data: XOR<travelCreateInput, travelUncheckedCreateInput>
  }

  /**
   * travel createMany
   */
  export type travelCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many travels.
     */
    data: travelCreateManyInput | travelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * travel update
   */
  export type travelUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * The data needed to update a travel.
     */
    data: XOR<travelUpdateInput, travelUncheckedUpdateInput>
    /**
     * Choose, which travel to update.
     */
    where: travelWhereUniqueInput
  }

  /**
   * travel updateMany
   */
  export type travelUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update travels.
     */
    data: XOR<travelUpdateManyMutationInput, travelUncheckedUpdateManyInput>
    /**
     * Filter which travels to update
     */
    where?: travelWhereInput
  }

  /**
   * travel upsert
   */
  export type travelUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * The filter to search for the travel to update in case it exists.
     */
    where: travelWhereUniqueInput
    /**
     * In case the travel found by the `where` argument doesn't exist, create a new travel with this data.
     */
    create: XOR<travelCreateInput, travelUncheckedCreateInput>
    /**
     * In case the travel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<travelUpdateInput, travelUncheckedUpdateInput>
  }

  /**
   * travel delete
   */
  export type travelDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
    /**
     * Filter which travel to delete.
     */
    where: travelWhereUniqueInput
  }

  /**
   * travel deleteMany
   */
  export type travelDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which travels to delete
     */
    where?: travelWhereInput
  }

  /**
   * travel without action
   */
  export type travelArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the travel
     */
    select?: travelSelect<ExtArgs> | null
  }

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = ( typeof TransactionIsolationLevel )[keyof typeof TransactionIsolationLevel]

  export const List_produkScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    lokasi: 'lokasi',
    jenis: 'jenis',
    img: 'img',
    harga: 'harga',
    jumlah: 'jumlah',
    keterangan: 'keterangan',
    created_at: 'created_at',
    updated_at: 'updated_at',
    orderanId: 'orderanId'
  };

  export type List_produkScalarFieldEnum = ( typeof List_produkScalarFieldEnum )[keyof typeof List_produkScalarFieldEnum]

  export const OrderanScalarFieldEnum: {
    id: 'id',
    keterangan: 'keterangan',
    pesan: 'pesan',
    kirim: 'kirim',
    pengirim: 'pengirim',
    hpPengirim: 'hpPengirim',
    penerima: 'penerima',
    alamatPenerima: 'alamatPenerima',
    hpPenerima: 'hpPenerima',
    namaPengiriman: 'namaPengiriman',
    ekspedisi: 'ekspedisi',
    ongkir: 'ongkir',
    no: 'no',
    typePembayaran: 'typePembayaran',
    total: 'total',
    totalBayar: 'totalBayar',
    totalPenjualan: 'totalPenjualan',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type OrderanScalarFieldEnum = ( typeof OrderanScalarFieldEnum )[keyof typeof OrderanScalarFieldEnum]

  export const ProdukScalarFieldEnum: {
    id: 'id',
    nama: 'nama',
    lokasi: 'lokasi',
    jenis: 'jenis',
    img: 'img',
    harga: 'harga',
    jumlah: 'jumlah',
    keterangan: 'keterangan',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ProdukScalarFieldEnum = ( typeof ProdukScalarFieldEnum )[keyof typeof ProdukScalarFieldEnum]

  export const TravelScalarFieldEnum: {
    id: 'id',
    namaPengiriman: 'namaPengiriman',
    noHpPerusahaan: 'noHpPerusahaan',
    lokasi: 'lokasi',
    jenis: 'jenis',
    harga: 'harga',
    img: 'img',
    keterangan: 'keterangan'
  };

  export type TravelScalarFieldEnum = ( typeof TravelScalarFieldEnum )[keyof typeof TravelScalarFieldEnum]

  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = ( typeof SortOrder )[keyof typeof SortOrder]

  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = ( typeof NullsOrder )[keyof typeof NullsOrder]

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>

  /**
   * Deep Input Types
   */


  export type List_produkWhereInput = {
    AND?: List_produkWhereInput | List_produkWhereInput[]
    OR?: List_produkWhereInput[]
    NOT?: List_produkWhereInput | List_produkWhereInput[]
    id?: StringFilter<"List_produk"> | string
    nama?: StringFilter<"List_produk"> | string
    lokasi?: StringFilter<"List_produk"> | string
    jenis?: StringFilter<"List_produk"> | string
    img?: StringFilter<"List_produk"> | string
    harga?: IntNullableFilter<"List_produk"> | number | null
    jumlah?: IntNullableFilter<"List_produk"> | number | null
    keterangan?: StringFilter<"List_produk"> | string
    created_at?: DateTimeFilter<"List_produk"> | Date | string
    updated_at?: DateTimeFilter<"List_produk"> | Date | string
    orderanId?: StringNullableFilter<"List_produk"> | string | null
    Orderan?: XOR<OrderanNullableRelationFilter, OrderanWhereInput> | null
  }

  export type List_produkOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrderInput | SortOrder
    jumlah?: SortOrderInput | SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    orderanId?: SortOrderInput | SortOrder
    Orderan?: OrderanOrderByWithRelationInput
  }

  export type List_produkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: List_produkWhereInput | List_produkWhereInput[]
    OR?: List_produkWhereInput[]
    NOT?: List_produkWhereInput | List_produkWhereInput[]
    nama?: StringFilter<"List_produk"> | string
    lokasi?: StringFilter<"List_produk"> | string
    jenis?: StringFilter<"List_produk"> | string
    img?: StringFilter<"List_produk"> | string
    harga?: IntNullableFilter<"List_produk"> | number | null
    jumlah?: IntNullableFilter<"List_produk"> | number | null
    keterangan?: StringFilter<"List_produk"> | string
    created_at?: DateTimeFilter<"List_produk"> | Date | string
    updated_at?: DateTimeFilter<"List_produk"> | Date | string
    orderanId?: StringNullableFilter<"List_produk"> | string | null
    Orderan?: XOR<OrderanNullableRelationFilter, OrderanWhereInput> | null
  }, "id">

  export type List_produkOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrderInput | SortOrder
    jumlah?: SortOrderInput | SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    orderanId?: SortOrderInput | SortOrder
    _count?: List_produkCountOrderByAggregateInput
    _avg?: List_produkAvgOrderByAggregateInput
    _max?: List_produkMaxOrderByAggregateInput
    _min?: List_produkMinOrderByAggregateInput
    _sum?: List_produkSumOrderByAggregateInput
  }

  export type List_produkScalarWhereWithAggregatesInput = {
    AND?: List_produkScalarWhereWithAggregatesInput | List_produkScalarWhereWithAggregatesInput[]
    OR?: List_produkScalarWhereWithAggregatesInput[]
    NOT?: List_produkScalarWhereWithAggregatesInput | List_produkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"List_produk"> | string
    nama?: StringWithAggregatesFilter<"List_produk"> | string
    lokasi?: StringWithAggregatesFilter<"List_produk"> | string
    jenis?: StringWithAggregatesFilter<"List_produk"> | string
    img?: StringWithAggregatesFilter<"List_produk"> | string
    harga?: IntNullableWithAggregatesFilter<"List_produk"> | number | null
    jumlah?: IntNullableWithAggregatesFilter<"List_produk"> | number | null
    keterangan?: StringWithAggregatesFilter<"List_produk"> | string
    created_at?: DateTimeWithAggregatesFilter<"List_produk"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"List_produk"> | Date | string
    orderanId?: StringNullableWithAggregatesFilter<"List_produk"> | string | null
  }

  export type OrderanWhereInput = {
    AND?: OrderanWhereInput | OrderanWhereInput[]
    OR?: OrderanWhereInput[]
    NOT?: OrderanWhereInput | OrderanWhereInput[]
    id?: StringFilter<"Orderan"> | string
    keterangan?: StringFilter<"Orderan"> | string
    pesan?: DateTimeNullableFilter<"Orderan"> | Date | string | null
    kirim?: DateTimeNullableFilter<"Orderan"> | Date | string | null
    pengirim?: StringFilter<"Orderan"> | string
    hpPengirim?: StringFilter<"Orderan"> | string
    penerima?: StringFilter<"Orderan"> | string
    alamatPenerima?: StringFilter<"Orderan"> | string
    hpPenerima?: StringFilter<"Orderan"> | string
    namaPengiriman?: StringFilter<"Orderan"> | string
    ekspedisi?: StringFilter<"Orderan"> | string
    ongkir?: IntNullableFilter<"Orderan"> | number | null
    no?: StringFilter<"Orderan"> | string
    typePembayaran?: StringFilter<"Orderan"> | string
    total?: IntNullableFilter<"Orderan"> | number | null
    totalBayar?: IntNullableFilter<"Orderan"> | number | null
    totalPenjualan?: IntNullableFilter<"Orderan"> | number | null
    created_at?: DateTimeFilter<"Orderan"> | Date | string
    updated_at?: DateTimeFilter<"Orderan"> | Date | string
    list_produk?: List_produkListRelationFilter
  }

  export type OrderanOrderByWithRelationInput = {
    id?: SortOrder
    keterangan?: SortOrder
    pesan?: SortOrderInput | SortOrder
    kirim?: SortOrderInput | SortOrder
    pengirim?: SortOrder
    hpPengirim?: SortOrder
    penerima?: SortOrder
    alamatPenerima?: SortOrder
    hpPenerima?: SortOrder
    namaPengiriman?: SortOrder
    ekspedisi?: SortOrder
    ongkir?: SortOrderInput | SortOrder
    no?: SortOrder
    typePembayaran?: SortOrder
    total?: SortOrderInput | SortOrder
    totalBayar?: SortOrderInput | SortOrder
    totalPenjualan?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    list_produk?: List_produkOrderByRelationAggregateInput
  }

  export type OrderanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderanWhereInput | OrderanWhereInput[]
    OR?: OrderanWhereInput[]
    NOT?: OrderanWhereInput | OrderanWhereInput[]
    keterangan?: StringFilter<"Orderan"> | string
    pesan?: DateTimeNullableFilter<"Orderan"> | Date | string | null
    kirim?: DateTimeNullableFilter<"Orderan"> | Date | string | null
    pengirim?: StringFilter<"Orderan"> | string
    hpPengirim?: StringFilter<"Orderan"> | string
    penerima?: StringFilter<"Orderan"> | string
    alamatPenerima?: StringFilter<"Orderan"> | string
    hpPenerima?: StringFilter<"Orderan"> | string
    namaPengiriman?: StringFilter<"Orderan"> | string
    ekspedisi?: StringFilter<"Orderan"> | string
    ongkir?: IntNullableFilter<"Orderan"> | number | null
    no?: StringFilter<"Orderan"> | string
    typePembayaran?: StringFilter<"Orderan"> | string
    total?: IntNullableFilter<"Orderan"> | number | null
    totalBayar?: IntNullableFilter<"Orderan"> | number | null
    totalPenjualan?: IntNullableFilter<"Orderan"> | number | null
    created_at?: DateTimeFilter<"Orderan"> | Date | string
    updated_at?: DateTimeFilter<"Orderan"> | Date | string
    list_produk?: List_produkListRelationFilter
  }, "id">

  export type OrderanOrderByWithAggregationInput = {
    id?: SortOrder
    keterangan?: SortOrder
    pesan?: SortOrderInput | SortOrder
    kirim?: SortOrderInput | SortOrder
    pengirim?: SortOrder
    hpPengirim?: SortOrder
    penerima?: SortOrder
    alamatPenerima?: SortOrder
    hpPenerima?: SortOrder
    namaPengiriman?: SortOrder
    ekspedisi?: SortOrder
    ongkir?: SortOrderInput | SortOrder
    no?: SortOrder
    typePembayaran?: SortOrder
    total?: SortOrderInput | SortOrder
    totalBayar?: SortOrderInput | SortOrder
    totalPenjualan?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: OrderanCountOrderByAggregateInput
    _avg?: OrderanAvgOrderByAggregateInput
    _max?: OrderanMaxOrderByAggregateInput
    _min?: OrderanMinOrderByAggregateInput
    _sum?: OrderanSumOrderByAggregateInput
  }

  export type OrderanScalarWhereWithAggregatesInput = {
    AND?: OrderanScalarWhereWithAggregatesInput | OrderanScalarWhereWithAggregatesInput[]
    OR?: OrderanScalarWhereWithAggregatesInput[]
    NOT?: OrderanScalarWhereWithAggregatesInput | OrderanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Orderan"> | string
    keterangan?: StringWithAggregatesFilter<"Orderan"> | string
    pesan?: DateTimeNullableWithAggregatesFilter<"Orderan"> | Date | string | null
    kirim?: DateTimeNullableWithAggregatesFilter<"Orderan"> | Date | string | null
    pengirim?: StringWithAggregatesFilter<"Orderan"> | string
    hpPengirim?: StringWithAggregatesFilter<"Orderan"> | string
    penerima?: StringWithAggregatesFilter<"Orderan"> | string
    alamatPenerima?: StringWithAggregatesFilter<"Orderan"> | string
    hpPenerima?: StringWithAggregatesFilter<"Orderan"> | string
    namaPengiriman?: StringWithAggregatesFilter<"Orderan"> | string
    ekspedisi?: StringWithAggregatesFilter<"Orderan"> | string
    ongkir?: IntNullableWithAggregatesFilter<"Orderan"> | number | null
    no?: StringWithAggregatesFilter<"Orderan"> | string
    typePembayaran?: StringWithAggregatesFilter<"Orderan"> | string
    total?: IntNullableWithAggregatesFilter<"Orderan"> | number | null
    totalBayar?: IntNullableWithAggregatesFilter<"Orderan"> | number | null
    totalPenjualan?: IntNullableWithAggregatesFilter<"Orderan"> | number | null
    created_at?: DateTimeWithAggregatesFilter<"Orderan"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Orderan"> | Date | string
  }

  export type produkWhereInput = {
    AND?: produkWhereInput | produkWhereInput[]
    OR?: produkWhereInput[]
    NOT?: produkWhereInput | produkWhereInput[]
    id?: StringFilter<"produk"> | string
    nama?: StringFilter<"produk"> | string
    lokasi?: StringFilter<"produk"> | string
    jenis?: StringFilter<"produk"> | string
    img?: StringFilter<"produk"> | string
    harga?: IntNullableFilter<"produk"> | number | null
    jumlah?: IntNullableFilter<"produk"> | number | null
    keterangan?: StringFilter<"produk"> | string
    created_at?: DateTimeFilter<"produk"> | Date | string
    updated_at?: DateTimeFilter<"produk"> | Date | string
  }

  export type produkOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrderInput | SortOrder
    jumlah?: SortOrderInput | SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type produkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: produkWhereInput | produkWhereInput[]
    OR?: produkWhereInput[]
    NOT?: produkWhereInput | produkWhereInput[]
    nama?: StringFilter<"produk"> | string
    lokasi?: StringFilter<"produk"> | string
    jenis?: StringFilter<"produk"> | string
    img?: StringFilter<"produk"> | string
    harga?: IntNullableFilter<"produk"> | number | null
    jumlah?: IntNullableFilter<"produk"> | number | null
    keterangan?: StringFilter<"produk"> | string
    created_at?: DateTimeFilter<"produk"> | Date | string
    updated_at?: DateTimeFilter<"produk"> | Date | string
  }, "id">

  export type produkOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrderInput | SortOrder
    jumlah?: SortOrderInput | SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: produkCountOrderByAggregateInput
    _avg?: produkAvgOrderByAggregateInput
    _max?: produkMaxOrderByAggregateInput
    _min?: produkMinOrderByAggregateInput
    _sum?: produkSumOrderByAggregateInput
  }

  export type produkScalarWhereWithAggregatesInput = {
    AND?: produkScalarWhereWithAggregatesInput | produkScalarWhereWithAggregatesInput[]
    OR?: produkScalarWhereWithAggregatesInput[]
    NOT?: produkScalarWhereWithAggregatesInput | produkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"produk"> | string
    nama?: StringWithAggregatesFilter<"produk"> | string
    lokasi?: StringWithAggregatesFilter<"produk"> | string
    jenis?: StringWithAggregatesFilter<"produk"> | string
    img?: StringWithAggregatesFilter<"produk"> | string
    harga?: IntNullableWithAggregatesFilter<"produk"> | number | null
    jumlah?: IntNullableWithAggregatesFilter<"produk"> | number | null
    keterangan?: StringWithAggregatesFilter<"produk"> | string
    created_at?: DateTimeWithAggregatesFilter<"produk"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"produk"> | Date | string
  }

  export type travelWhereInput = {
    AND?: travelWhereInput | travelWhereInput[]
    OR?: travelWhereInput[]
    NOT?: travelWhereInput | travelWhereInput[]
    id?: StringFilter<"travel"> | string
    namaPengiriman?: StringFilter<"travel"> | string
    noHpPerusahaan?: StringFilter<"travel"> | string
    lokasi?: StringFilter<"travel"> | string
    jenis?: StringFilter<"travel"> | string
    harga?: IntFilter<"travel"> | number
    img?: StringFilter<"travel"> | string
    keterangan?: StringFilter<"travel"> | string
  }

  export type travelOrderByWithRelationInput = {
    id?: SortOrder
    namaPengiriman?: SortOrder
    noHpPerusahaan?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    harga?: SortOrder
    img?: SortOrder
    keterangan?: SortOrder
  }

  export type travelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: travelWhereInput | travelWhereInput[]
    OR?: travelWhereInput[]
    NOT?: travelWhereInput | travelWhereInput[]
    namaPengiriman?: StringFilter<"travel"> | string
    noHpPerusahaan?: StringFilter<"travel"> | string
    lokasi?: StringFilter<"travel"> | string
    jenis?: StringFilter<"travel"> | string
    harga?: IntFilter<"travel"> | number
    img?: StringFilter<"travel"> | string
    keterangan?: StringFilter<"travel"> | string
  }, "id">

  export type travelOrderByWithAggregationInput = {
    id?: SortOrder
    namaPengiriman?: SortOrder
    noHpPerusahaan?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    harga?: SortOrder
    img?: SortOrder
    keterangan?: SortOrder
    _count?: travelCountOrderByAggregateInput
    _avg?: travelAvgOrderByAggregateInput
    _max?: travelMaxOrderByAggregateInput
    _min?: travelMinOrderByAggregateInput
    _sum?: travelSumOrderByAggregateInput
  }

  export type travelScalarWhereWithAggregatesInput = {
    AND?: travelScalarWhereWithAggregatesInput | travelScalarWhereWithAggregatesInput[]
    OR?: travelScalarWhereWithAggregatesInput[]
    NOT?: travelScalarWhereWithAggregatesInput | travelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"travel"> | string
    namaPengiriman?: StringWithAggregatesFilter<"travel"> | string
    noHpPerusahaan?: StringWithAggregatesFilter<"travel"> | string
    lokasi?: StringWithAggregatesFilter<"travel"> | string
    jenis?: StringWithAggregatesFilter<"travel"> | string
    harga?: IntWithAggregatesFilter<"travel"> | number
    img?: StringWithAggregatesFilter<"travel"> | string
    keterangan?: StringWithAggregatesFilter<"travel"> | string
  }

  export type List_produkCreateInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
    Orderan?: OrderanCreateNestedOneWithoutList_produkInput
  }

  export type List_produkUncheckedCreateInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
    orderanId?: string | null
  }

  export type List_produkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    Orderan?: OrderanUpdateOneWithoutList_produkNestedInput
  }

  export type List_produkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orderanId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type List_produkCreateManyInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
    orderanId?: string | null
  }

  export type List_produkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_produkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    orderanId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OrderanCreateInput = {
    id?: string
    keterangan: string
    pesan?: Date | string | null
    kirim?: Date | string | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir?: number | null
    no: string
    typePembayaran: string
    total?: number | null
    totalBayar?: number | null
    totalPenjualan?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    list_produk?: List_produkCreateNestedManyWithoutOrderanInput
  }

  export type OrderanUncheckedCreateInput = {
    id?: string
    keterangan: string
    pesan?: Date | string | null
    kirim?: Date | string | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir?: number | null
    no: string
    typePembayaran: string
    total?: number | null
    totalBayar?: number | null
    totalPenjualan?: number | null
    created_at?: Date | string
    updated_at?: Date | string
    list_produk?: List_produkUncheckedCreateNestedManyWithoutOrderanInput
  }

  export type OrderanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    list_produk?: List_produkUpdateManyWithoutOrderanNestedInput
  }

  export type OrderanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    list_produk?: List_produkUncheckedUpdateManyWithoutOrderanNestedInput
  }

  export type OrderanCreateManyInput = {
    id?: string
    keterangan: string
    pesan?: Date | string | null
    kirim?: Date | string | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir?: number | null
    no: string
    typePembayaran: string
    total?: number | null
    totalBayar?: number | null
    totalPenjualan?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrderanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type produkCreateInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type produkUncheckedCreateInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type produkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type produkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type produkCreateManyInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type produkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type produkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type travelCreateInput = {
    id?: string
    namaPengiriman: string
    noHpPerusahaan: string
    lokasi: string
    jenis: string
    harga: number
    img: string
    keterangan: string
  }

  export type travelUncheckedCreateInput = {
    id?: string
    namaPengiriman: string
    noHpPerusahaan: string
    lokasi: string
    jenis: string
    harga: number
    img: string
    keterangan: string
  }

  export type travelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    noHpPerusahaan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    harga?: IntFieldUpdateOperationsInput | number
    img?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
  }

  export type travelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    noHpPerusahaan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    harga?: IntFieldUpdateOperationsInput | number
    img?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
  }

  export type travelCreateManyInput = {
    id?: string
    namaPengiriman: string
    noHpPerusahaan: string
    lokasi: string
    jenis: string
    harga: number
    img: string
    keterangan: string
  }

  export type travelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    noHpPerusahaan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    harga?: IntFieldUpdateOperationsInput | number
    img?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
  }

  export type travelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    noHpPerusahaan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    harga?: IntFieldUpdateOperationsInput | number
    img?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type OrderanNullableRelationFilter = {
    is?: OrderanWhereInput | null
    isNot?: OrderanWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type List_produkCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    orderanId?: SortOrder
  }

  export type List_produkAvgOrderByAggregateInput = {
    harga?: SortOrder
    jumlah?: SortOrder
  }

  export type List_produkMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    orderanId?: SortOrder
  }

  export type List_produkMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    orderanId?: SortOrder
  }

  export type List_produkSumOrderByAggregateInput = {
    harga?: SortOrder
    jumlah?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type List_produkListRelationFilter = {
    every?: List_produkWhereInput
    some?: List_produkWhereInput
    none?: List_produkWhereInput
  }

  export type List_produkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderanCountOrderByAggregateInput = {
    id?: SortOrder
    keterangan?: SortOrder
    pesan?: SortOrder
    kirim?: SortOrder
    pengirim?: SortOrder
    hpPengirim?: SortOrder
    penerima?: SortOrder
    alamatPenerima?: SortOrder
    hpPenerima?: SortOrder
    namaPengiriman?: SortOrder
    ekspedisi?: SortOrder
    ongkir?: SortOrder
    no?: SortOrder
    typePembayaran?: SortOrder
    total?: SortOrder
    totalBayar?: SortOrder
    totalPenjualan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrderanAvgOrderByAggregateInput = {
    ongkir?: SortOrder
    total?: SortOrder
    totalBayar?: SortOrder
    totalPenjualan?: SortOrder
  }

  export type OrderanMaxOrderByAggregateInput = {
    id?: SortOrder
    keterangan?: SortOrder
    pesan?: SortOrder
    kirim?: SortOrder
    pengirim?: SortOrder
    hpPengirim?: SortOrder
    penerima?: SortOrder
    alamatPenerima?: SortOrder
    hpPenerima?: SortOrder
    namaPengiriman?: SortOrder
    ekspedisi?: SortOrder
    ongkir?: SortOrder
    no?: SortOrder
    typePembayaran?: SortOrder
    total?: SortOrder
    totalBayar?: SortOrder
    totalPenjualan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrderanMinOrderByAggregateInput = {
    id?: SortOrder
    keterangan?: SortOrder
    pesan?: SortOrder
    kirim?: SortOrder
    pengirim?: SortOrder
    hpPengirim?: SortOrder
    penerima?: SortOrder
    alamatPenerima?: SortOrder
    hpPenerima?: SortOrder
    namaPengiriman?: SortOrder
    ekspedisi?: SortOrder
    ongkir?: SortOrder
    no?: SortOrder
    typePembayaran?: SortOrder
    total?: SortOrder
    totalBayar?: SortOrder
    totalPenjualan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type OrderanSumOrderByAggregateInput = {
    ongkir?: SortOrder
    total?: SortOrder
    totalBayar?: SortOrder
    totalPenjualan?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type produkCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type produkAvgOrderByAggregateInput = {
    harga?: SortOrder
    jumlah?: SortOrder
  }

  export type produkMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type produkMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    img?: SortOrder
    harga?: SortOrder
    jumlah?: SortOrder
    keterangan?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type produkSumOrderByAggregateInput = {
    harga?: SortOrder
    jumlah?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type travelCountOrderByAggregateInput = {
    id?: SortOrder
    namaPengiriman?: SortOrder
    noHpPerusahaan?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    harga?: SortOrder
    img?: SortOrder
    keterangan?: SortOrder
  }

  export type travelAvgOrderByAggregateInput = {
    harga?: SortOrder
  }

  export type travelMaxOrderByAggregateInput = {
    id?: SortOrder
    namaPengiriman?: SortOrder
    noHpPerusahaan?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    harga?: SortOrder
    img?: SortOrder
    keterangan?: SortOrder
  }

  export type travelMinOrderByAggregateInput = {
    id?: SortOrder
    namaPengiriman?: SortOrder
    noHpPerusahaan?: SortOrder
    lokasi?: SortOrder
    jenis?: SortOrder
    harga?: SortOrder
    img?: SortOrder
    keterangan?: SortOrder
  }

  export type travelSumOrderByAggregateInput = {
    harga?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type OrderanCreateNestedOneWithoutList_produkInput = {
    create?: XOR<OrderanCreateWithoutList_produkInput, OrderanUncheckedCreateWithoutList_produkInput>
    connectOrCreate?: OrderanCreateOrConnectWithoutList_produkInput
    connect?: OrderanWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type OrderanUpdateOneWithoutList_produkNestedInput = {
    create?: XOR<OrderanCreateWithoutList_produkInput, OrderanUncheckedCreateWithoutList_produkInput>
    connectOrCreate?: OrderanCreateOrConnectWithoutList_produkInput
    upsert?: OrderanUpsertWithoutList_produkInput
    disconnect?: OrderanWhereInput | boolean
    delete?: OrderanWhereInput | boolean
    connect?: OrderanWhereUniqueInput
    update?: XOR<XOR<OrderanUpdateToOneWithWhereWithoutList_produkInput, OrderanUpdateWithoutList_produkInput>, OrderanUncheckedUpdateWithoutList_produkInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type List_produkCreateNestedManyWithoutOrderanInput = {
    create?: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput> | List_produkCreateWithoutOrderanInput[] | List_produkUncheckedCreateWithoutOrderanInput[]
    connectOrCreate?: List_produkCreateOrConnectWithoutOrderanInput | List_produkCreateOrConnectWithoutOrderanInput[]
    createMany?: List_produkCreateManyOrderanInputEnvelope
    connect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
  }

  export type List_produkUncheckedCreateNestedManyWithoutOrderanInput = {
    create?: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput> | List_produkCreateWithoutOrderanInput[] | List_produkUncheckedCreateWithoutOrderanInput[]
    connectOrCreate?: List_produkCreateOrConnectWithoutOrderanInput | List_produkCreateOrConnectWithoutOrderanInput[]
    createMany?: List_produkCreateManyOrderanInputEnvelope
    connect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type List_produkUpdateManyWithoutOrderanNestedInput = {
    create?: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput> | List_produkCreateWithoutOrderanInput[] | List_produkUncheckedCreateWithoutOrderanInput[]
    connectOrCreate?: List_produkCreateOrConnectWithoutOrderanInput | List_produkCreateOrConnectWithoutOrderanInput[]
    upsert?: List_produkUpsertWithWhereUniqueWithoutOrderanInput | List_produkUpsertWithWhereUniqueWithoutOrderanInput[]
    createMany?: List_produkCreateManyOrderanInputEnvelope
    set?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    disconnect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    delete?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    connect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    update?: List_produkUpdateWithWhereUniqueWithoutOrderanInput | List_produkUpdateWithWhereUniqueWithoutOrderanInput[]
    updateMany?: List_produkUpdateManyWithWhereWithoutOrderanInput | List_produkUpdateManyWithWhereWithoutOrderanInput[]
    deleteMany?: List_produkScalarWhereInput | List_produkScalarWhereInput[]
  }

  export type List_produkUncheckedUpdateManyWithoutOrderanNestedInput = {
    create?: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput> | List_produkCreateWithoutOrderanInput[] | List_produkUncheckedCreateWithoutOrderanInput[]
    connectOrCreate?: List_produkCreateOrConnectWithoutOrderanInput | List_produkCreateOrConnectWithoutOrderanInput[]
    upsert?: List_produkUpsertWithWhereUniqueWithoutOrderanInput | List_produkUpsertWithWhereUniqueWithoutOrderanInput[]
    createMany?: List_produkCreateManyOrderanInputEnvelope
    set?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    disconnect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    delete?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    connect?: List_produkWhereUniqueInput | List_produkWhereUniqueInput[]
    update?: List_produkUpdateWithWhereUniqueWithoutOrderanInput | List_produkUpdateWithWhereUniqueWithoutOrderanInput[]
    updateMany?: List_produkUpdateManyWithWhereWithoutOrderanInput | List_produkUpdateManyWithWhereWithoutOrderanInput[]
    deleteMany?: List_produkScalarWhereInput | List_produkScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type OrderanCreateWithoutList_produkInput = {
    id?: string
    keterangan: string
    pesan?: Date | string | null
    kirim?: Date | string | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir?: number | null
    no: string
    typePembayaran: string
    total?: number | null
    totalBayar?: number | null
    totalPenjualan?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrderanUncheckedCreateWithoutList_produkInput = {
    id?: string
    keterangan: string
    pesan?: Date | string | null
    kirim?: Date | string | null
    pengirim: string
    hpPengirim: string
    penerima: string
    alamatPenerima: string
    hpPenerima: string
    namaPengiriman: string
    ekspedisi: string
    ongkir?: number | null
    no: string
    typePembayaran: string
    total?: number | null
    totalBayar?: number | null
    totalPenjualan?: number | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type OrderanCreateOrConnectWithoutList_produkInput = {
    where: OrderanWhereUniqueInput
    create: XOR<OrderanCreateWithoutList_produkInput, OrderanUncheckedCreateWithoutList_produkInput>
  }

  export type OrderanUpsertWithoutList_produkInput = {
    update: XOR<OrderanUpdateWithoutList_produkInput, OrderanUncheckedUpdateWithoutList_produkInput>
    create: XOR<OrderanCreateWithoutList_produkInput, OrderanUncheckedCreateWithoutList_produkInput>
    where?: OrderanWhereInput
  }

  export type OrderanUpdateToOneWithWhereWithoutList_produkInput = {
    where?: OrderanWhereInput
    data: XOR<OrderanUpdateWithoutList_produkInput, OrderanUncheckedUpdateWithoutList_produkInput>
  }

  export type OrderanUpdateWithoutList_produkInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderanUncheckedUpdateWithoutList_produkInput = {
    id?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    pesan?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    kirim?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pengirim?: StringFieldUpdateOperationsInput | string
    hpPengirim?: StringFieldUpdateOperationsInput | string
    penerima?: StringFieldUpdateOperationsInput | string
    alamatPenerima?: StringFieldUpdateOperationsInput | string
    hpPenerima?: StringFieldUpdateOperationsInput | string
    namaPengiriman?: StringFieldUpdateOperationsInput | string
    ekspedisi?: StringFieldUpdateOperationsInput | string
    ongkir?: NullableIntFieldUpdateOperationsInput | number | null
    no?: StringFieldUpdateOperationsInput | string
    typePembayaran?: StringFieldUpdateOperationsInput | string
    total?: NullableIntFieldUpdateOperationsInput | number | null
    totalBayar?: NullableIntFieldUpdateOperationsInput | number | null
    totalPenjualan?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_produkCreateWithoutOrderanInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type List_produkUncheckedCreateWithoutOrderanInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type List_produkCreateOrConnectWithoutOrderanInput = {
    where: List_produkWhereUniqueInput
    create: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput>
  }

  export type List_produkCreateManyOrderanInputEnvelope = {
    data: List_produkCreateManyOrderanInput | List_produkCreateManyOrderanInput[]
    skipDuplicates?: boolean
  }

  export type List_produkUpsertWithWhereUniqueWithoutOrderanInput = {
    where: List_produkWhereUniqueInput
    update: XOR<List_produkUpdateWithoutOrderanInput, List_produkUncheckedUpdateWithoutOrderanInput>
    create: XOR<List_produkCreateWithoutOrderanInput, List_produkUncheckedCreateWithoutOrderanInput>
  }

  export type List_produkUpdateWithWhereUniqueWithoutOrderanInput = {
    where: List_produkWhereUniqueInput
    data: XOR<List_produkUpdateWithoutOrderanInput, List_produkUncheckedUpdateWithoutOrderanInput>
  }

  export type List_produkUpdateManyWithWhereWithoutOrderanInput = {
    where: List_produkScalarWhereInput
    data: XOR<List_produkUpdateManyMutationInput, List_produkUncheckedUpdateManyWithoutOrderanInput>
  }

  export type List_produkScalarWhereInput = {
    AND?: List_produkScalarWhereInput | List_produkScalarWhereInput[]
    OR?: List_produkScalarWhereInput[]
    NOT?: List_produkScalarWhereInput | List_produkScalarWhereInput[]
    id?: StringFilter<"List_produk"> | string
    nama?: StringFilter<"List_produk"> | string
    lokasi?: StringFilter<"List_produk"> | string
    jenis?: StringFilter<"List_produk"> | string
    img?: StringFilter<"List_produk"> | string
    harga?: IntNullableFilter<"List_produk"> | number | null
    jumlah?: IntNullableFilter<"List_produk"> | number | null
    keterangan?: StringFilter<"List_produk"> | string
    created_at?: DateTimeFilter<"List_produk"> | Date | string
    updated_at?: DateTimeFilter<"List_produk"> | Date | string
    orderanId?: StringNullableFilter<"List_produk"> | string | null
  }

  export type List_produkCreateManyOrderanInput = {
    id?: string
    nama: string
    lokasi: string
    jenis: string
    img: string
    harga?: number | null
    jumlah?: number | null
    keterangan: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type List_produkUpdateWithoutOrderanInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_produkUncheckedUpdateWithoutOrderanInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type List_produkUncheckedUpdateManyWithoutOrderanInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    jenis?: StringFieldUpdateOperationsInput | string
    img?: StringFieldUpdateOperationsInput | string
    harga?: NullableIntFieldUpdateOperationsInput | number | null
    jumlah?: NullableIntFieldUpdateOperationsInput | number | null
    keterangan?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}