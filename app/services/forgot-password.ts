import { createAxiosInstance } from "./instance";

export const forgotPassword = async (locale: string, body: {email: string}) => {

    const axiosInstance = createAxiosInstance(locale);

    await axiosInstance.post<{email: string}>(`/forgot-password`, body);

};