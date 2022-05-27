<template>
  <q-page padding>
    <div class="row">
      <q-btn v-if="user.user_type == 'admin' || user.user_type == 'manager' || user.user_type == 'dev'" label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn v-if="user.user_type == 'admin' || user.user_type == 'manager' || user.user_type == 'dev'" class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE Product" @click="persistent_add_aux = true" />
      <div class="row q-ml-auto" style="height: 30px" >
        <label class="q-ml-xl q-pl-xl q-mt-sm" style="font-size: 20px" dense>Search Product</label>
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
            <div class="row text-h6 justify-center">Add Product</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Product_form
              @submit.prevent="add_product(e_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="persistent_add_aux" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Update Product</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Product_form_update
              @submit.prevent="update_product(p_form_aux_up)"
              @emit_form_product_update="get_form_update"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div id="divTable" class="row q-mt-md">
      <q-table
        title="Stock"
        :rows="stock_list"
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
              <q-btn size="sm" color="accent" round dense @click="remove_product(props.row.serial)" :icon="'remove'" />
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
import {globalUser} from "src/stores/user_store";
import useNotify from "src/composables/UseNotify"
import Product_form from "src/components/Product_form.vue";
import Product_form_update from "src/components/Product_form_update.vue";

const columns = [
  {
    name: 'serial',
    label: 'Serial Number',
    align: 'center',
    field: 'serial',
    sortable: true
  },
  { name: 'model',  align: 'center', label: 'Equipment Model', field: 'model'},
  { name: 'value', align: 'center', label: 'Value €', field: 'valor'},
]

export default defineComponent({
  name: 'StaffPg',
  components:{
    Product_form,
    Product_form_update
  },

  data(){
    return{
      input: '',
      input_type: '',
    }
  },

  setup(){

    const {notifyError, notifySuccess} = useNotify()
    const {getStock, postStock, upProduct, del_product} = useApi()
    const stock_list = ref([])
    const user = globalUser()

    const mapStock = async (validation, type, value) =>{
      try {
        stock_list.value = await getStock(validation, type, value)
        if(stock_list.value != null) notifySuccess("Stock Loaded!")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const add_product = async (e_form) =>{
      try {
        const status = await postStock(e_form)
        if(status == 200){
          stock_list.value = await getStock(0, 'default', 'default')
          notifySuccess("New Product Registered!")
        }
        else notifyError("Error in add register new product!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const update_product = async (e_form_aux) =>{
      console.log(e_form_aux)
      try {
        const status = await upProduct(e_form_aux)
        if(status == 200){
          stock_list.value = await getStock(0, 'default', 'default')
          notifySuccess("Product Updated!")
        }
        else notifyError("Error in update product!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const remove_product = async(id) =>{
      try{
        await del_product(id);
        stock_list.value = await getStock(0, 'default', 'default')
      }catch(error){
        notifyError("Error remove product!")
        notify
      }
    }

    onMounted(() =>{
      mapStock(0, 'default', 'default')
    })

    return{
      user,
      mapStock,
      persistent_add: ref(false),
      persistent_add_aux: ref(false),
      e_form_aux: ref([]),
      p_form_aux_up: ref([]),
      stock_list,
      columns,
      items:[
        'serial', 'model', 'value'
      ],
      nameRules: [
        val => (val && val.length > 0) || 'Field is Required!'
      ],
      add_product,
      update_product,
      remove_product
    }
  },
  methods:{
    get_form(data){
      this.e_form_aux = data
    },
    // Get data from event emit from Form.vue component and pass to cli_form_aux_up
    get_form_update(data){
      this.p_form_aux_up = data
    }
  },

  watch:{
    input(value){
      if(value != ""){
        this.mapStock(1, this.input_type ,value)
      }else{
        this.mapStock(0)
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

