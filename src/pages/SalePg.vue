<template>
  <q-page padding>
    <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE SALE" @click="persistent_add_aux = true" />
      <div class="row q-ml-auto" style="height: 30px" >
        <label class="q-ml-xl q-pl-xl q-mt-sm" style="font-size: 20px" dense>Search Sale</label>
        <q-input
            filled
            class="q-ml-lg"
            style="width: 300px"
            v-model="input"
            dense
            @input="isTyping = true"
            type="text"
            label="Value"
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
            <div class="row text-h6 justify-center">Add Sale</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Sale_Form
              @submit.prevent="addSale(s_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="persistent_add_aux" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Update Sale</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Sale_Form_update
              @submit.prevent="updateSale(s_form_aux_up)"
              @emit_sale_update="get_form_update"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div id="divTable" class="row q-mt-md">
      <q-table
        title="Clients"
        :rows="salesList"
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
              <q-btn size="sm" color="accent" round dense @click="remove_sale(props.row.Sale_id)" :icon="'remove'" />
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
import Sale_Form from "../components/Sale_Form.vue"
import Sale_Form_update from "../components/Sale_Form_update.vue"
import {globalUser} from "src/stores/user_store";

const columns = [
  {
    name: 'Serial',
    label: 'Sale ID',
    align: 'center',
    field: 'Sale_id',
    sortable: true
  },
  { name: 'Serial', align: 'center', label: 'Equipment Serial Number', field: 'serial'},
  { name: 'client_name', align: 'center', label: 'Client Name', field: 'client_name'},
  { name: 'model',  align: 'center', label: 'Model', field: 'model'},
  { name: 'value', align: 'center', label: 'Value €', field: 'valor'},
  { name: 'register_date',  align: 'center', label: 'Register Date', field: 'date'},
]

export default defineComponent({
  name: "SalesPg",
  components:{
    Sale_Form,
    Sale_Form_update
  },

  data(){
    return{
      input: '',
      input_type: '',
    }
  },

  setup(){

    const {notifyError, notifySuccess} = useNotify()
    const {getSales, postSale, upSale, del_sale} = useApi()
    const salesList = ref([])

    const mapSales = async (validation, type, value) =>{
      try {
        salesList.value = await getSales(validation, type, value)
        if(salesList.value != null) notifySuccess("Sales Loaded!")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addSale = async (s_aux) =>{
      try {
        const status = await postSale(s_aux)
        if(status == 200){
          salesList.value = await getSales(0, 'default', 'default')
          notifySuccess("New Sale Registered!")
        }
        else notifyError("Error in Register New Sale!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const updateSale = async (s_aux) =>{
      try {
        console.log(s_aux)
        const status = await upSale(s_aux)
        if(status == 200){
          salesList.value = await getSales(0, 'default', 'default')
          notifySuccess("Sale Updated!")
        }
        else notifyError("Error in Update Sale!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const remove_sale = async(id) =>{
      try{
        await del_sale(id);
        salesList.value = await getSales(0, 'default', 'default')
      }catch(error){
        notifyError("Error remove sale!")
        notify
      }
    }

    onMounted(() =>{
      mapSales(0, 'default', 'default')
    })

    return{
      mapSales,
      persistent_add: ref(false),
      persistent_add_aux: ref(false),
      s_form_aux: ref([]),
      s_form_aux_up: ref([]),
      columns,
      salesList,
      items:[
        'id', 'serial', 'name', 'equipment', 'value', 'date'
      ],
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      addSale,
      updateSale,
      remove_sale
    }
  },
  methods:{
    get_form(data){
      this.s_form_aux = data
    },
    // Get data from event emit from Form.vue component and pass to cli_form_aux_up
    get_form_update(data){
      this.s_form_aux_up = data
    }
  },

  watch:{
    input(value){
      if(value != ""){
        this.mapSales(1, this.input_type ,value)
      }else{
        this.mapSales(0)
      }
    }
  }
});
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
