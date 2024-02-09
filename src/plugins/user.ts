import {defineStore} from "pinia";
import axiosInstance from "@/app/providers/axios.ts";
import type {ICourse} from "@/pages/admin/courses/CourseList.vue";

export interface IUser {
    id: number,
    age: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    login: string,
    middleName: string,
    appRole: IRole,
    avatar: string,
    subjects: ICourse[],
    // city: ICity,
    // school: ISchool,
    iin: string,
    // subgroups?: IGroup[],
    isActive: boolean

}

export interface IRole {
    id: number,
    name: string
}

export interface ILoginPayload {
    email: string,
    password: string
}


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as IUser | null
    }),
    actions: {
        async GET_USER() {
            try {
                const {data} = await axiosInstance.get('me')
                this.user = data
            } catch (e) {
                console.error(e)
            }

        },
        async LOGIN_USER(payload: ILoginPayload) {
            const {email, password} = payload
            try {
                const {data} = await axiosInstance.post("login", {email, password})
                if(data?.accessToken && data?.refreshToken) {
                    this.user = data?.user
                    window.localStorage.setItem("@access-token", data?.accessToken)
                    window.localStorage.setItem("@refresh-token", data?.refreshToken)

                }

            } catch (e) {
                console.error(e)
            }

        },
        async LOGOUT_USER() {
            window.localStorage.removeItem("@access-token")
            window.localStorage.removeItem("@refresh-token")
            this.user = null
        }

    }
})