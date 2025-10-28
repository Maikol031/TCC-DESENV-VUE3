import api from "@/services/AxiosConfig"

export interface IUser {
    name: string
    email: string
    password: string
    document: string
    phone: string
    access_code: string
    address: {
        id?: number
        street?: string
        number?: string
        neighborhood?: string
        city?: string
        state?: string
        zipcode?: string
    }
}
export default class User implements IUser {

    name!: string
    email!: string
    password!: string
    document!: string
    phone!: string
    access_code: string = ""
    address = { zipcode: '', street: '', number: '', neighborhood: '', city: '', state: '' }
    constructor() { }


    async create(body: IUser) {
        await api.post("/api/v1/users", body)
    }



}