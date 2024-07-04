import { AxiosError } from "axios";
import { axiosPrivate } from "./axios"

const LOGIN_URL = "/register";

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  github: string;
  username: string;
}

// interface SignupResponse {
//   id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   github: string;
//   username: string;
//   token: string; // Assuming the response includes a token
// }
export interface SignupError {
  message: string;
}


export async function  signup (user: SignupRequest): Promise<any> {
  try {
    const response = await axiosPrivate.post<any>(
      LOGIN_URL,
      {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        github: user.github,
        username: user.username,
      }
    );
    return response.data; 
  } catch (error) {
    const err = error as AxiosError<any, any>;
    throw new Error(err?.response?.data.error || "Failed to sign up"); 
  }
}
