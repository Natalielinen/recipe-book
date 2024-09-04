import axios from 'axios';


export const createAxiosInstance = (locale: string) => {
  return axios.create({
    baseURL: `/${locale}${process.env.NEXT_PUBLIC_API_URL}`
  });
};