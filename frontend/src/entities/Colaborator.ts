import type { AlertFunction } from "@/composables/useAlert"
import api from "@/services/AxiosConfig"

export interface IColaborator {
    id?: number
    name: string,
    email: string
    phone: string
    document: string
    organization_id: number,
    access_code?: string
    created_at: string
    updated_at: string
}


export default class Colaborator implements IColaborator {
    id?: number | undefined
    name!: string
    email!: string
    phone!: string
    document!: string
    organization_id!: number
    access_code?: string
    created_at!: string
    updated_at!: string
    private showAlert?: AlertFunction;
    constructor(
        showAlert?: AlertFunction
    ) { 
         this.showAlert = showAlert;
    }

    async getList(pointId: number) {
       return await api.get(`/api/v1/points/${pointId}/users`)
    }

    async getAllUsers() {
       return await api.get(`/api/v1/users`)
    }


    async addPoint(pointId: number, users: any) {
        try {
            await api.post(`/api/v1/points/${pointId}/users`, users)
            this.showAlert?.('success', 'Registro criado com sucesso!')
        }catch(error){
            this.showAlert?.('error', 'Erro ao criar registro. Contate o Sporte!')
        }
    }

    async delete(pointId: number, userId: number) {
        try {
            await api.delete(`/api/v1/points/${pointId}/users/${userId}`)
            this.showAlert?.('success', 'Registro excluído com sucesso!')
        }catch(error) {
            this.showAlert?.('error', 'Erro ao excluir registro. Contate o Sporte!')
        }
    }




}