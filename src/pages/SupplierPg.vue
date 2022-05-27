<template>
  <q-page padding>
      <div class="row justify-center">
        <q-icon name="manage_accounts" size="75px"></q-icon>
      </div>
      <div class="row q-mt-xl justify-center">
      <q-btn label="ADD NEW USER" class="currency" color="green" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="VIEW USERS" @click="toggle_table()" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="USER PERMISSION" @click="persistent = true" />
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add User</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <User_form
              @submit.prevent="add_User(s_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div class="q-mt-md" v-if="users_table">
      <q-table
        dense
        title="Users"
        :rows="user_list"
        :columns="columns"
        :rows-per-page-options="[50, 75, 100, 150, 200]"
        class="col fixed-header">
      </q-table>
    </div>
    <div class="q-mt-xl row justify-center">
      <q-card
        class="user_card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6 row justify-center">Total Users</div>
          <div class="row justify-center text-h5">{{total_users}}</div>

        </q-card-section>
      </q-card>
      <q-card
        class="user_card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6 row justify-center">Total Admins</div>
          <div class="row justify-center text-h5">{{total_admin}}</div>
        </q-card-section>
      </q-card>
      <q-card
        class="user_card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6 row justify-center">Last User Entry</div>
          <div class="row justify-center text-h5">{{last_user}}</div>
        </q-card-section>
      </q-card>
    </div>
        <div class="q-mt-md">
      <q-card
        class="my-card home-card-right text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6 row justify-center">User permissions -> Granted Access</div>
        </q-card-section>
        <div>
          <q-card-section class="row justify-center">
            <div class=" currency text-h6">Dev-> Full Config</div>
            <div class="text-h6 q-ml-md">Admin-> Manage Users/Full Read</div>
            <div class="text-h6 q-ml-md">Manager-> Full Read</div>
        </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from "src/composables/UseNotify"
import User_form from 'src/components/User_form.vue'
import {globalUser} from "src/stores/user_store";

const columns = [
  {
    name: 'username',
    label: 'Username',
    align: 'center',
    field: 'Username',
    sortable: true
  },
  { name: 'User type', align: 'center', label: 'User Type', field: 'User_type'},

]

export default defineComponent({
  name: 'supplierPg',
  components:{
    User_form
  },
  setup() {

    const{get_users, addUser, total_u, total_adm, last_u} = useApi()
    const {notifyError, notifySuccess} = useNotify()
    const user_list = ref([])
    const users_table = ref(false)
    const total_users = ref('')
    const total_admin = ref('')
    const last_user = ref('')


    const map_stats = async() =>{
      try{
        total_users.value = await total_u()
        total_admin.value = await total_adm()
        last_user.value = await last_u()
      }catch(error){
        notifyError(error)
      }
    }

    const map_users = async (validation) =>{
      try {
        user_list.value = await get_users()
        if(user_list.value != null){
          if(validation == 0) notifySuccess("Users Loaded")
        }
      } catch (error) {
        notifyError("Error in load data!")
      }
    }
    const add_User = async (sup_aux) =>{
      try {
        console.log(sup_aux)
        await addUser(sup_aux)
        user_list.value = await get_users()
        total_users.value = await total_u()
        total_admin.value = await total_adm()
        last_user.value = await last_u()
        notifySuccess("User Added!")
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(() =>{
      map_users(0),
      map_stats()
    })
    return{
      total_users,
      total_admin,
      last_user,
      users_table,
      toggle_table() {
        map_users(1),
        users_table.value = !users_table.value;
      },
      persistent_add: ref(false),
      s_form_aux: ref([]),
      columns,
      user_list,
      add_User
    }
  },
  methods:{
    get_form(data){
      this.s_form_aux = data
    }
  }
})
</script>

<style lang="sass">
  .fixed-header
    height: 700px
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background-color: #1c1c1c
    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0
    &.q-table--loading thead tr:last-child th
      top: 48px
</style>
