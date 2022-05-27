import { defineStore } from "pinia";
import useApi from "src/composables/UseApi";
import { ref } from "vue";

export const globalUser = defineStore("global_user", {
    state: () => ({
        session_id: '',
        username_aux: '',
        password: '',
        user_type: ''
    }),
    getters: {},
    actions: {
        async getUser(user_form) {
            console.log(user_form.username)
            const { login } = useApi()
            this.username_aux = user_form.value.username
            try {
                const resp = await login(user_form)
                this.user_type = resp
                console.log(this.user_type)
                return resp
            } catch (error) {
                console.log(error)
                return 0
            }
        },
    },
});