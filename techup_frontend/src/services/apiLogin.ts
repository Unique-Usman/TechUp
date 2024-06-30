import { axiosPrivate } from "./axios"

const LOGIN_URL = "/login";

export async function login (email: string, password: string) {
  return axiosPrivate.post(
    LOGIN_URL,
    JSON.stringify({ email, password}),
  )
}
