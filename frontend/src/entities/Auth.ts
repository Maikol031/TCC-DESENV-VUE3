import api from "@/services/AxiosConfig";
import type { AlertFunction } from '@/composables/useAlert'
import type { Router } from "vue-router";

export interface IAuth {
    email: string;
    password: string;
}

export default class Auth implements IAuth {
    email!: string;
    password!: string;
    private showAlert?: AlertFunction;
    private router?: Router;

    constructor(showAlert?: AlertFunction, router?: Router) {
        this.showAlert = showAlert;
        this.router = router;
    }

    async login(credentials: IAuth) {
        try {
            const response = await api.post('/api/v1/auth/login', credentials)

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', response.data.roles[0])

            this.showAlert?.('success', 'Login realizado com sucesso!')

            this.router?.push({ name: 'home' })
        }
        catch (error: any) {
            console.error(error)
            if (error.response?.data?.message === 'Invalid credentials') {
                this.showAlert?.('error', 'Credenciais inválidas!')
            } else {
                this.showAlert?.('error', 'Erro ao realizar login!')
            }
        }
    }

    async inviteUser(email: string) {
        await api.post('/api/v1/users/invite', { email }, {headers: {
            Authorization: 'Bearer' + ' ' + localStorage.getItem("token")
        }})
    }

    logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        this.router?.push({ name: 'login' })
    }

}