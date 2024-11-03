import { User } from "@prisma/client";
import { createAxiosInstance } from "./instance";

export const verifyToken = async (locale: string, body: {token: string}): Promise<User> => {

    const axiosInstance = createAxiosInstance(locale);

   const { data } = await axiosInstance.post<User>(`/verify-token`, body);

   return data;

};