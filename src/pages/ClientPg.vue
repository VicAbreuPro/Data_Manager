<template>
  <q-page padding>
    <div class="row">
      <q-btn  v-if="user.user_type == 'admin' || user.user_type == 'manager' || user.user_type == 'dev'" label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn  v-if="user.user_type == 'admin' || user.user_type == 'manager' || user.user_type == 'dev'" class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE CLIENT" @click="persistent_add_aux = true" />
      <div class="row q-ml-auto" style="height: 30px" >
        <label class="q-ml-xl q-pl-xl q-mt-sm" style="font-size: 20px" dense>Search Client</label>
        <q-input
            filled
            class="q-ml-lg"
            style="width: 300px"
            v-model="input"
            dense
            @input="isTyping = true"
            type="text"
            label="Name"
            required>
        </q-input>
        <q-select
            filled
            style="width: 300px"
            class="q-ml-md"
            dense
            v-model="input_type"
            :options="items"
            :rules="nameRules"
            label="Item"
            required>
        </q-select>
      </div>
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add client</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Cli_form
              @submit.prevent="addClient(cli_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
        <q-dialog v-model="persistent_add_aux" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Update client</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Cli_form_update
              @submit.prevent="updateClient(cli_form_aux_up)"
              @emit_form_up="get_form_update"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div id="divTable" class="row q-mt-md">
      <q-table
        title="Clients"
        :rows="clientList"
        :columns="columns"
        :rows-per-page-options="[50, 75, 100, 150, 200]"
        dense
        row-key="Id"
        class="col fixed-header"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="remove_client(props.row.id)" :icon="'remove'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted} from "vue"
import useApi from "src/composables/UseApi"
import useNotify from "src/composables/UseNotify"
import {useRouter} from 'vue-router';
import {globalUser} from "src/stores/user_store";
import Cli_form_update from "../components/Cli_form_update.vue"
import Cli_form from "../components/Cli_form.vue";

const columns = [
  {
    name: 'id',
    label: 'Client ID',
    align: 'center',
    field: 'id',
    sortable: true
  },
  { name: 'name', align: 'center', label: 'Client Name', field: 'name'},
  { name: 'location', align: 'center', label: 'Location', field: 'location'},
  { name: 'date',  align: 'center', label: 'Register Date', field: 'date'},
]

export default defineComponent({
  name:'ClientPg',
  components:{
    Cli_form,
    Cli_form_update,
},

  data(){
    return{
      input: '',
      input_type: '',
    }
  },

  setup(){
    const {notifyError, notifySuccess} = useNotify()
    const {getClientList, postClient, upClient, del_client} = useApi()
    const clientList = ref([])
    const router = useRouter()
    const user = globalUser()

    const mapClients = async (validation, type, value) =>{
      try {
        clientList.value = await getClientList(validation, type, value)
        if(clientList.value != null) notifySuccess("Clients Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }
    const addClient = async (cli_aux) =>{
      try {
        await postClient(cli_aux)
        clientList.value = await getClientList(0, 'default', 'default')
        notifySuccess("Client Added!")
      } catch (error) {
        console.log(error)
      }
    }
    const updateClient = async(cli_aux) =>{
      try {
        console.log(cli_aux)
        await upClient(cli_aux)
        clientList.value = await getClientList(0, 'default', 'default')
        notifySuccess("Client Updated!")
      } catch (error) {
        console.log(error)
      }
    }

    const remove_client = async(id) =>{
      try{
        await del_client(id);
        clientList.value = await getClientList(0, 'default', 'default')
      }catch(error){
        notifyError("Error remove client!")
        notify
      }
    }

    // When view is mounted, call methods below
    onMounted(() =>{
      mapClients(0, 'default', 'default')
    })

    const test = () =>{
        router.replace({name: 'homePg'})
    }
    return{
      user,
      test,
      mapClients,
      items:[
        'id', 'name', 'location', 'date'
      ],
      cli_form_aux: ref([]),
      cli_form_aux_up: ref([]),
      columns,
      clientList,
      persistent_add: ref(false),
      persistent_add_aux: ref(false),
      nameRules: [
        val => (val && val.length > 0) || ''
      ],
      addClient,
      updateClient,
      remove_client
    }
  },

  methods:{
    // Get data from event emit from Form.vue component and pass to cli_form_aux
    get_form(data){
      this.cli_form_aux = data
    },
    // Get data from event emit from Form.vue component and pass to cli_form_aux_up
    get_form_update(data){
      this.cli_form_aux_up = data
    }
  },

  watch:{
    input(value){
      if(value != ""){
        this.mapClients(1, this.input_type ,value)
      }else{
        this.mapClients(0)
      }
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
