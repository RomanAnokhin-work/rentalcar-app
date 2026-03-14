import { instance } from "./api";

export async function getCars() {
    const {data} = await instance.get('/cars');
    console.log("Cars data:", data);

    return data;
    
}