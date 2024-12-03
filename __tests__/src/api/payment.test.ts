import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { statusTest } from '../../../src/app/utils/test/statusTest';
import { useFetch } from "../../../src/hook/useFetch";
import { TPaymentDB } from "../../../src/entity/Bank.model";
import { exampleBank } from "../../../src/app/utils/ress/ErrorData";

let contextId = ''

const responseSuccess = {
  "code": expect.any(Number),
  "data": {
    "created_at": expect.any(String),
    "hp": "kosong",
    "id": expect.any(String),
    "img": "kosong",
    "jenis": "kosong",
    "keterangan": "kosong",
    "lokasi": "kosong",
    "nama": "kosong",
    "no": "kosong",
    "updated_at": expect.any(String),
  },
  "msg": expect.any(String),
}

const responseErrorAll = {
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Hp is required",
      "path": [
        "hp",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Hp is required",
      "path": [
        "img",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "No is required",
      "path": [
        "no",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "nama is required",
      "path": [
        "nama",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Lokasi is required",
      "path": [
        "lokasi",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Jenis is required",
      "path": [
        "jenis",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Keterangan is required",
      "path": [
        "keterangan",
      ],
      "received": "undefined",
    },
  ],
  "msg": "Error on POST",
}
const responseErrorAllUpdate = {
  'msg': expect.any(String),
  'code': 400,
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "ID is required",
      "path": ["id",],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Hp is required",
      "path": [
        "hp",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Hp is required",
      "path": [
        "img",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "No is required",
      "path": [
        "no",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "nama is required",
      "path": [
        "nama",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Lokasi is required",
      "path": [
        "lokasi",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Jenis is required",
      "path": [
        "jenis",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Keterangan is required",
      "path": [
        "keterangan",
      ],
      "received": "undefined",
    },
  ],
}

const responseErrorPartial = {
  "code": 400,
  "error": [
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Hp is required",
      "path": [
        "hp",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Lokasi is required",
      "path": [
        "lokasi",
      ],
      "received": "undefined",
    },
    {
      "code": "invalid_type",
      "expected": "string",
      "message": "Keterangan is required",
      "path": [
        "keterangan",
      ],
      "received": "undefined",
    },
  ],
  "msg": expect.any(String),
}

const responseErrorID = {
  "code": 400,
  "error":
    [
      {
        "code": "invalid_string",
        "message": "Invalid uuid",
        "path": [],
        "validation": "uuid",
      },
    ],
  "msg": expect.any(String),
}
const json = structuredClone( exampleBank )

describe("Test Payment api", () => {
  
  beforeAll(async () => {
  
  })
  afterAll(async () => {
  
  })
  describe("POST Payment", () => {
    it("Payment Can create a post success ", async (ctx) => {
      const data = useFetch<{ data: TPaymentDB }>('POST', "payment", json)
      const responseData = await data.then(d => d.data.id)
      // console.log(responseData)
      contextId = responseData
      await expect( data ).resolves.toHaveProperty( "data.nama", "kosong" )
      await expect(data).resolves.toMatchObject(responseSuccess)
      // ctx.id = await data.then(d => d.id)
    } )
    
    it("Payment Cannot create partial value post error ", async () => {
      
      const { keterangan, lokasi, hp, id, ...ress } = json
      const data = useFetch('POST', "payment", ress)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect(data).resolves.toMatchObject(responseErrorPartial)
    } )
    
    it("Payment Cannot create empty post error ", async () => {
      const data = useFetch('POST', "payment", {})
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "kosong" )
      await expect( data ).resolves.not.toContain( statusTest( "POST" ) )
      await expect(data).resolves.toMatchObject(responseErrorAll)
    } )
  } )
  
  describe("GET Payment", () => {
    it("Payment Can find by all ", async () => {
      const data = useFetch('GET', "payment",)
      
      // await expect( data ).resolves.toContain( statusTest( "GET" ) )
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 200 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Array) })
      await expect(data).resolves.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect( data ).resolves.toHaveProperty( "data[0].jenis", )
      await expect( data ).resolves.toHaveProperty( "data[0].lokasi", )
      await expect( data ).resolves.toHaveProperty( "data[0].keterangan", )
      await expect( data ).resolves.toHaveProperty( "data[0].id", )
      await expect( data ).resolves.toHaveProperty( "data[0].no", )
      await expect( data ).resolves.toHaveProperty( "data[0].hp", )
      await expect( data ).resolves.toHaveProperty( "data[0].img", )
      await expect( data ).resolves.toHaveProperty( "data[0].nama", )
    } )
    
    it("Payment Can find ID ", async () => {
      console.log(contextId)
      const data = useFetch('GET', `payment/${ contextId }`,)
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 201 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
      await expect(data).resolves.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect(data).resolves.toHaveProperty("data.jenis",)
      await expect(data).resolves.toHaveProperty("data.lokasi",)
      await expect(data).resolves.toHaveProperty("data.keterangan",)
      await expect(data).resolves.toHaveProperty("data.id",)
      await expect(data).resolves.toHaveProperty("data.no",)
      await expect(data).resolves.toHaveProperty("data.hp",)
      await expect(data).resolves.toHaveProperty("data.img",)
      await expect(data).resolves.toHaveProperty("data.nama",)
    } )
    
    it("Payment Cannot find ID ", async () => {
      const data = useFetch('GET', `payment/${ 12312312 }`,)
      
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 400 })
      await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
      await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
      await expect(data).resolves.not.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("error")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect(data).resolves.not.toHaveProperty("data.jenis",)
      await expect(data).resolves.not.toHaveProperty("data.lokasi",)
      await expect(data).resolves.not.toHaveProperty("data.keterangan",)
      await expect(data).resolves.not.toHaveProperty("data.id",)
      await expect(data).resolves.not.toHaveProperty("data.no",)
      await expect(data).resolves.not.toHaveProperty("data.hp",)
      await expect(data).resolves.not.toHaveProperty("data.img",)
      await expect(data).resolves.not.toHaveProperty("data.nama",)
    } )
    it("Payment Cannot find empty ID ", async () => {
      
      const data = useFetch('GET', `payment/${ 132423423 }`,)
      
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 400 })
      await expect(data).resolves.toMatchObject({ "error": expect.any(Array) })
      await expect(data).resolves.not.toMatchObject({ "data": expect.any(Array) })
      await expect(data).resolves.not.toHaveProperty("data")
      await expect(data).resolves.toHaveProperty("code")
      await expect(data).resolves.toHaveProperty("error")
      await expect(data).resolves.toHaveProperty("msg",)
      await expect(data).resolves.not.toHaveProperty("data.jenis",)
      await expect(data).resolves.not.toHaveProperty("data.lokasi",)
      await expect(data).resolves.not.toHaveProperty("data.keterangan",)
      await expect(data).resolves.not.toHaveProperty("data.id",)
      await expect(data).resolves.not.toHaveProperty("data.no",)
      await expect(data).resolves.not.toHaveProperty("data.hp",)
      await expect(data).resolves.not.toHaveProperty("data.img",)
      await expect(data).resolves.not.toHaveProperty("data.nama",)
    } )
  } )
  
  describe("PUT Payment", () => {
    it("Payment Can edit by ID ", async () => {
      json.nama  = "update"
      json.id = contextId
      responseSuccess.data.nama = json.nama
      const data = useFetch('PUT', `payment/${ contextId }`, json)
      
      await expect( data ).resolves.toHaveProperty( "data.nama", "update" )
      
      await expect(data).resolves.toMatchObject(responseSuccess)
    } )
    
    it("Payment Cannot edit by wrong ID ", async () => {
      json.nama  = "update"
      json.id = contextId
      responseSuccess.data.nama = json.nama
      const data = useFetch('PUT', `payment/${ '123123' }`, json)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect(data).resolves.toMatchObject(responseErrorID)

    } )
    
    // it("Payment Cannot find empty ID ", async () => {
    //   const data = useFetch('PUT', `payment/${ '' }`, json)
    //   console.log(await data.then(d => d))
    //   await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
    //   await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
    // } )
    //
    it("Payment Cannot edit partial value by ID ", async () => {
      json.nama = "update"
      json.id = contextId
      const { keterangan, lokasi, hp, ...ress } = json
      const data = useFetch('PUT', `payment/${ contextId }`, ress)
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect(data).resolves.toMatchObject(responseErrorPartial)
    } )
    
    it("Payment Cannot edit empty value by ID ", async () => {
      
      const data = useFetch('PUT', `payment/${ contextId }`, {})
      await expect( data ).resolves.not.toHaveProperty( "data.nama", "update" )
      await expect(data).resolves.toMatchObject(responseErrorAllUpdate)
    } )
  } )
  
  describe("DELETE Payment", () => {
    it("Payment Can delete by ID ", async () => {
      const data = useFetch('DELETE', `payment/${ contextId }`,)
      // await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
      // await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
      await expect(data).resolves.toMatchObject({ "msg": expect.any(String) })
      await expect(data).resolves.toMatchObject({ "code": 200 })
      await expect(data).resolves.toMatchObject({ "data": expect.any(Object) })
    } )

    it( "Cannot delete by wrong ID ", async () => {
      const data = useFetch('DELETE', `payment/${ 'salah' }`,)
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      // await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )

    } )
    
    it("Payment Cannot delete because has deleted ", async () => {
      const data = useFetch('DELETE', `payment/${ contextId }`,)
      await expect( data ).resolves.not.toContain( statusTest( "DELETE" ) )
      await expect(data).resolves.toMatchObject({
        "code": 500,
        "error": {
          "clientVersion": "5.22.0",
          "code": "P2025",
          "meta": {
            "cause": "Record to delete does not exist.",
            "modelName": "Payments",
          },
          "name": "PrismaClientKnownRequestError",
        },
        "msg": "Error on DELETE",
      })
    } )
  } )
  
})
