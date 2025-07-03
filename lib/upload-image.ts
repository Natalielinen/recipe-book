import axios from "axios";

const API_KEY = "13b2d0d834fc27d79d6830d6bdb88bbf";
async function uploadImage(formData: FormData): Promise<any> {
    return await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData);
}

export const onLoadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const formData = new FormData();
    //@ts-ignore
    formData.append("image", file);

    if (!file) return;

    try {
        return await uploadImage(formData)

    } catch (error) {
        console.error("Ошибка загрузки:", error);
    }
}