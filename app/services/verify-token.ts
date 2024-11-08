import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

export const verifyToken = async ( body: {token: string}): Promise<User> => {

   const { data } = await axiosInstance.post<User>(`/verify-token`, body);

   return data;

};