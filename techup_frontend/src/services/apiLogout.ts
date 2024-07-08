import { axiosSimple } from "./axios"

const LOGIN_URL = "/logout";

export async function logout () {
  return axiosSimple.get(
    LOGIN_URL,
  )
}
