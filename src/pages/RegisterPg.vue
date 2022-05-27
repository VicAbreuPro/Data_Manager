<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit.prevent="newUser()">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Register Page</p>

      <div class="q-mt-md fixed-center">
        <div class="col q-mt-xl">
          <div class="row q-mt-xl">
            <q-icon class="q-mr-lg q-mt-lg" size="30px" name="token"></q-icon>
            <q-input
              v-model="token"
              type="text"
              label="Acces Token"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>

          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg"  size="30px" name="person"></q-icon>
            <q-input
              v-model="form.username"
              type="text"
              label="Username"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>

          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" size="30px" name="email"></q-icon>
            <q-input
              v-model="form.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>

          <div class="row q-ml-sm">
            <q-icon class="q-ml-lg q-mt-lg" size="30px" name="locker"></q-icon>
            <q-input
              v-model="form.password"
              type="password"
              label="Password"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>
          <q-btn class="full-width q-mt-lg" label="REGISTER" color="primary" type="submit"></q-btn>
          <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" to="/"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
//Import components and composables
import { defineComponent, ref } from "vue";
import useNotify from "src/composables/UseNotify";


//For redirecting after registration
import {useRouter} from 'vue-router';
import useApi from "src/composables/UseApi";

export default {
  name: "RegisterPg",

  setup(){
    const{notifyError, notifySuccess} = useNotify()
    const{verifyUser} = useApi()
    const router = useRouter()
    const token = ref('')
    const aux = ref('')

    // Reactive form for login inputs
    const form = ref({
        token_type: '',
        username: '',
        email: '',
        password: ''
    })

    const newUser = async () =>{

      // Call login method in composable passing our login const parameters
      aux.value = await verifyUser(token.value)

      if(aux.value != 200){
        try {
          console.log("teste")
          form.value.token_type = aux

          notifySuccess("Registration Done!")

          router.push({
            name: 'emailConfimation',
            query: {email: form.value.email}
          })
        } catch (error) {
          notifyError(error)
        }
      }else notifyError("Invalid Token")
    }

    return{
      token,
      form,
      newUser,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  }
};
</script>
