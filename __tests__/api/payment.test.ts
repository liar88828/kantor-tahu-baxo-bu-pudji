import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {toFetch} from "../../src/hook/toFetch";
import {TPaymentDB} from "../../src/interface/entity/payment.model";
import {examplePayment} from "../../src/assets/ExamplePayment";

const json = structuredClone(examplePayment)

let contextId = '9733a794-e6ab-41dc-ab3c-659c504719e1'

const responseSuccess = {
	"code": expect.any(Number),
	"data": {
		"created_at": expect.any(String),
		"phone": "kosong",
		"id": expect.any(String),
		"img": "kosong",
		"type": "kosong",
		"desc": "kosong",
		"address": "kosong",
		"name": "kosong",
		"accounting": "kosong",
		"updated_at": expect.any(String),
	},
	"msg": expect.any(String),
}

const responseErrorAll = {
	"error": [
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"phone",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"img",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"accounting",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"name",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"address",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"type",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"desc",
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
			"message": "Required",
			"path": [
				"phone",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"img",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"accounting",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"name",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"address",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"type",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"desc",
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
			"message": "Required",
			"path": [
				"phone",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"address",
			],
			"received": "undefined",
		},
		{
			"code": "invalid_type",
			"expected": "string",
			"message": "Required",
			"path": [
				"desc",
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


describe("Test Payment api", () => {

	beforeAll(async () => {

	})
	afterAll(async () => {

	})


	describe("POST Payment", () => {
		it("Payment Can create a post success ", async () => {
			const data = toFetch<TPaymentDB>('POST', "payment", json)
			contextId = await data.then(d => d.data.id)
			// await expect( data ).resolves.toHaveProperty( "data.name", "kosong" )
			it("Payment Can create a post success ", async () => {
				const data = toFetch<TPaymentDB>('POST', "payment", json)
				contextId = await data.then(d => d.data.id)
				// await expect( data ).resolves.toHaveProperty( "data.name", "kosong" )
				await expect(data).resolves.toMatchObject(responseSuccess)
			})

			it("Payment Cannot create partial value post error ", async () => {

				const {desc, address, phone, id, ...ress} = json
				const data = toFetch('POST', "payment", ress)
				await expect(data).resolves.not.toHaveProperty("data.name", "kosong")
				await expect(data).resolves.not.toContain(statusTest("POST", "payment"))
				await expect(data).resolves.toMatchObject(responseErrorPartial)
			})

			it("Payment Cannot create empty post error ", async () => {
				const data = toFetch('POST', "payment", {})
				await expect(data).resolves.not.toHaveProperty("data.name", "kosong")
				await expect(data).resolves.not.toContain(statusTest("POST", "payment"))
				await expect(data).resolves.toMatchObject(responseErrorAll)
			})
		})

		describe("GET Payment", () => {
			it("Payment Can find by all ", async () => {
				const data = toFetch('GET', "payment",)

				// await expect( data ).resolves.toContain( statusTest( "GET" ) )
				await expect(data).resolves.toMatchObject({"msg": expect.any(String)})
				await expect(data).resolves.toMatchObject({"code": 200})
				await expect(data).resolves.toMatchObject({"data": expect.any(Object)})
				await expect(data).resolves.toHaveProperty("data")
				await expect(data).resolves.toHaveProperty("code")
				await expect(data).resolves.toHaveProperty("msg",)
				// await expect(data).resolves.toHaveProperty("data[0].accounting",)
				// await expect(data).resolves.toHaveProperty("data[0].address",)
				// await expect(data).resolves.toHaveProperty("data[0].desc",)
				// await expect(data).resolves.toHaveProperty("data[0].id",)
				// await expect(data).resolves.toHaveProperty("data[0].img",)
				// await expect(data).resolves.toHaveProperty("data[0].name",)
				// await expect(data).resolves.toHaveProperty("data[0].phone",)
				// await expect(data).resolves.toHaveProperty("data[0].type",)
				// await expect(data).resolves.toHaveProperty("data[0].type",)
			})

			it("Payment Can find ID ", async () => {
				const data = toFetch('GET', `payment/${contextId}`,)
				await expect(data).resolves.toMatchObject({"msg": expect.any(String)})
				await expect(data).resolves.toMatchObject({"code": 201})
				await expect(data).resolves.toMatchObject({"data": expect.any(Object)})
				await expect(data).resolves.toHaveProperty("data")
				await expect(data).resolves.toHaveProperty("code")
				await expect(data).resolves.toHaveProperty("msg",)
				await expect(data).resolves.toHaveProperty("data.accounting",)
				await expect(data).resolves.toHaveProperty("data.address",)
				await expect(data).resolves.toHaveProperty("data.desc",)
				await expect(data).resolves.toHaveProperty("data.id",)
				await expect(data).resolves.toHaveProperty("data.img",)
				await expect(data).resolves.toHaveProperty("data.name",)
				await expect(data).resolves.toHaveProperty("data.phone",)
				await expect(data).resolves.toHaveProperty("data.type",)
			})

			it("Payment Cannot find ID ", async () => {
				const data = toFetch('GET', `payment/${12312312}`,)

				await expect(data).resolves.toMatchObject({"msg": expect.any(String)})
				await expect(data).resolves.toMatchObject({"code": 400})
				await expect(data).resolves.toMatchObject({"error": expect.any(Array)})
				await expect(data).resolves.not.toMatchObject({"data": expect.any(Array)})
				await expect(data).resolves.not.toHaveProperty("data")
				await expect(data).resolves.toHaveProperty("code")
				await expect(data).resolves.toHaveProperty("error")
				await expect(data).resolves.toHaveProperty("msg",)
				await expect(data).resolves.not.toHaveProperty("data.accounting",)
				await expect(data).resolves.not.toHaveProperty("data.address",)
				await expect(data).resolves.not.toHaveProperty("data.desc",)
				await expect(data).resolves.not.toHaveProperty("data.id",)
				await expect(data).resolves.not.toHaveProperty("data.img",)
				await expect(data).resolves.not.toHaveProperty("data.name",)
				await expect(data).resolves.not.toHaveProperty("data.phone",)
				await expect(data).resolves.not.toHaveProperty("data.type",)
			})
			it("Payment Cannot find empty ID ", async () => {

				const data = toFetch('GET', `payment/${132423423}`,)

				await expect(data).resolves.toMatchObject({"msg": expect.any(String)})
				await expect(data).resolves.toMatchObject({"code": 400})
				await expect(data).resolves.toMatchObject({"error": expect.any(Array)})
				await expect(data).resolves.not.toMatchObject({"data": expect.any(Array)})
				await expect(data).resolves.not.toHaveProperty("data")
				await expect(data).resolves.toHaveProperty("code")
				await expect(data).resolves.toHaveProperty("error")
				await expect(data).resolves.toHaveProperty("msg",)
				await expect(data).resolves.not.toHaveProperty("data.accounting",)
				await expect(data).resolves.not.toHaveProperty("data.address",)
				await expect(data).resolves.not.toHaveProperty("data.desc",)
				await expect(data).resolves.not.toHaveProperty("data.id",)
				await expect(data).resolves.not.toHaveProperty("data.img",)
				await expect(data).resolves.not.toHaveProperty("data.name",)
				await expect(data).resolves.not.toHaveProperty("data.phone",)
				await expect(data).resolves.not.toHaveProperty("data.type",)
			})
		})

		describe("PUT Payment", () => {
			it("Payment Can edit by ID ", async () => {
				json.name = "update"
				json.id = contextId
				responseSuccess.data.name = json.name
				const data = toFetch('PUT', `payment/${contextId}`, json)
				await expect(data).resolves.toHaveProperty("data.name", "update")
				await expect(data).resolves.toMatchObject(responseSuccess)
			})

			it("Payment Cannot edit by wrong ID ", async () => {
				json.name = "update"
				json.id = contextId
				responseSuccess.data.name = json.name
                const data = toFetch('PUT', `payment/123123`, json)
				await expect(data).resolves.not.toHaveProperty("data.name", "update")
				await expect(data).resolves.toMatchObject(responseErrorID)

			})

			// it("Payment Cannot find empty ID ", async () => {
			//   const data = useFetch('PUT', `payment/${ '' }`, json)
			//   console.log(await data.then(d => d))
			//   await expect( data ).resolves.not.toContain( statusTest( "PUT" ) )
			//   await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )
			// } )
			//
			it("Payment Cannot edit partial value by ID ", async () => {
				json.name = "update"
				json.id = contextId
				const {desc, address, phone, ...ress} = json
				const data = toFetch('PUT', `payment/${contextId}`, ress)
				await expect(data).resolves.not.toHaveProperty("data.name", "update")
				await expect(data).resolves.toMatchObject(responseErrorPartial)
			})

			it("Payment Cannot edit empty value by ID ", async () => {
				const data = toFetch('PUT', `payment/${contextId}`, {})
				await expect(data).resolves.not.toHaveProperty("data.name", "update")
				await expect(data).resolves.toMatchObject(responseErrorAllUpdate)
			})
		})

		describe("DELETE Payment", () => {
			it("Payment Can delete by ID ", async () => {
				const data = toFetch('DELETE', `payment/${contextId}`,)
				// await expect( data ).resolves.toContain( statusTest( "DELETE" ) )
				// await expect( data ).resolves.toMatchObject( successResponse( json, "DELETE" ) )
				await expect(data).resolves.toMatchObject({"msg": expect.any(String)})
				await expect(data).resolves.toMatchObject({"code": 200})
				await expect(data).resolves.toMatchObject({"data": expect.any(Object)})
			})

			it("Cannot delete by wrong ID ", async () => {
                const data = toFetch('DELETE', `payment/salah`,)
				await expect(data).resolves.not.toContain(statusTest("DELETE", "payment"))
				// await expect( data ).resolves.toMatchObject( errorEmptyID( "PUT" ) )

			})

			it("Payment Cannot delete because has deleted ", async () => {
				const data = toFetch('DELETE', `payment/${contextId}`,)
				await expect(data).resolves.not.toContain(statusTest("DELETE", "payment"))
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
			})
		})

	})
})
