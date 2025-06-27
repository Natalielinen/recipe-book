import axios from "axios";

const API_KEY = "13b2d0d834fc27d79d6830d6bdb88bbf";
export async function uploadImage(formData: FormData): Promise<any> {
    return await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
}