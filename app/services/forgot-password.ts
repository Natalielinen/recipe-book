import { axiosInstance } from "./instance";

export const forgotPassword = async (body: {email: string}) => {


    await axiosInstance.post(`/forgot-password`, body);

};