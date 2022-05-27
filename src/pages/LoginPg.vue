<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit.prevent="newLogin">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Login Page</p>
      <div class="q-mt-xl">
        <div class="flex-center q-mt-xl" style="width: 300px">
          <div class="col justify-center">
            <div class="row">
              <q-icon class="q-mr-lg q-mt-lg" name="person"></q-icon>
              <q-input
                v-model="form.username"
                style="width: 260px"
                type="text"
                label="User"
                lazy-rules
                :rules="nameRules">
                </q-input>
            </div>
            <div class="row">
              <q-icon class="q-ml-md q-mt-lg" name="locker"></q-icon>
              <q-input
                v-model="form.password"
                style="width: 260px"
                class="q-ml-sm"
                type="password"
                label="Password"
                lazy-rules
                :rules="nameRules">
              </q-input>
            </div>
            <q-btn class="full-width q-mt-lg" label="LOGIN" color="primary" type="submit"></q-btn>
            <q-btn class="full-width q-mt-md" label="REGISTER" color="primary" to="registerPg" ></q-btn>
          </div>
          <div>
            <q-btn class="full-width q-mt-sm" flat color="primary" label="Forgot My Password" to="resetPass" />
          </div>
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import {onMounted, ref } from "vue";
import {useRouter} from 'vue-router';
import useApi from "src/composables/UseApi";
import useNotify from "src/composables/UseNotify";
import {globalUser} from "src/stores/user_store";

export default({
  name: "LoginPage",
  setup(){
    const user = globalUser()
    const {notifyError, notifySuccess} = useNotify()

    const router = useRouter()

    // Prevent user to back to login page and need to logged in again
    onMounted(() =>{

    })

    // Reactive form for login inputs
    const form = ref({
      username: '',
      password: '',
      user_type: 'string'
    })

    const newLogin = async () =>{
      console.log(form.value.username)
      try{
        const user_type = await user.getUser(form);
        if(user_type == 'admin' || user_type == 'dev' || user_type == 'common' || user_type == 'manager'){
          notifySuccess('Loggin Success!')
          router.replace({name: 'homePg'})
        }else{
          notifyError('Invalid Credentials!')
        }
      }catch(error){
        notifyError('Loggin Failed! ' + error)
      }
    }

    //Input type rule
    return{
      form,
      newLogin,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
});
</script>

