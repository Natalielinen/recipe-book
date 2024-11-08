import { axiosInstance } from "./instance";

export const resetPassword = async ( body: {email: string, password: string}) => {

    await axiosInstance.post(`/reset-password`, body);

};