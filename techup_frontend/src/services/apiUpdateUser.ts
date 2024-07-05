import { AxiosError } from "axios";
import { axiosUpdateUser} from "./axios"

export interface UpdateUserRequest {
  formData: FormData;
  userData: {
    firstName: string;
    lastName: string;
    access: string;
    id: string;
  };
  password?: string;
}

export interface SignupError {
  message: string;
}

export async function  apiUpdateUser ({formData, userData, password }: UpdateUserRequest): Promise<any> {
  const {firstName, lastName, id, access} = userData;
  if (!formData) {
    formData = new FormData();
  }
  formData?.append("first_name", firstName);
  formData?.append("last_name", lastName)
  if (password) formData?.append("password", password);
  try {
    const response = await axiosUpdateUser.put<any>(
      `/users/${id}`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${access}`
        }
      }
    );
    return response.data; 
  } catch (error) {
    const err = error as AxiosError<any, any>;
    throw new Error(err?.response?.data.error || "Failed to Update User"); 
  }
}
