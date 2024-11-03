import { createAxiosInstance } from "./instance";

export const resetPassword = async (locale: string, body: {email: string, password: string}) => {

    const axiosInstance = createAxiosInstance(locale);

    await axiosInstance.post(`/reset-password`, body);

};