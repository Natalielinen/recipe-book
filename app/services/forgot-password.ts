import { axiosInstance } from "./instance";

export const forgotPassword = async (body: {email: string}) => {


    await axiosInstance.post<{email: string}>(`/forgot-password`, body);

};