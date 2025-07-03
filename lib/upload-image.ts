import axios from "axios";
async function uploadImage(formData: FormData): Promise<any> {
    return await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_URL}`, formData);
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
};