type TMode = "development" | "production";
const mode: TMode = "development"
// const mode = "production"

export const config = {
// @ts-ignore
  url: mode === 'production' ? process.env.NEXT_PUBLIC_BASE_URL : "http://localhost:3000"
}
export const debugs = false
// export const _test_ = true // turn of at test
export const _test_ = false || process.env.TEST