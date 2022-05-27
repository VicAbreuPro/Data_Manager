<template>
  <q-form v-model="s_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="search"></q-icon>
      <q-input
        style="width: 75%"
        dense
        clearable
        v-model="s_form.Sale_id"
        type="number"
        label="Sale ID">
      </q-input>
      <q-btn
        class="q-mt-sm q-ml-sm"
        label="CHECK"
        color="green"
        style="height: 10%"
        @click="check_id(s_form.Sale_id)">
      </q-btn>
    </div>
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="precision_manufacturing"></q-icon>
      <q-input
        style="width: 95%"
        dense
        clearable
        v-model="s_form.model"
        type="text"
        label="Equipment">
      </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="assignment"></q-icon>
      <q-input
      class="form q-ml-sm"
      style="width: 95%"
      dense
      clearable
      v-model="s_form.serial"
      type="number"
      label="Serial Number">
    </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="person"></q-icon>
      <q-input
        style="width: 95%"
        class="q-ml-sm"
        dense
        clearable
        v-model="s_form.client_id"
        type="text"
        label="Client ID">
      </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="paid"></q-icon>
      <q-input
        style="width: 95%"
        class="q-ml-sm"
        dense
        clearable
        v-model="s_form.valor"
        type="number"
        label="Value €">
      </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="date_range"></q-icon>
      <q-input
        style="width: 95%"
        class="q-ml-sm"
        dense
        clearable
        v-model="s_form.date"
        type="date"
        hint="Register Date">
      </q-input>
    </div>
    <q-card-actions align="right" class="text-teal">
      <q-btn
        flat
        label="CANCEL"
        v-close-popup />
      <q-btn
        flat
        label="CONFIRM"
        v-close-popup
        type="submit"/>
    </q-card-actions>
  </q-form>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useApi from "src/composables/UseApi"

const s_form = ref({
  Sale_id: '',
  serial: '',
  valor: '',
  model: '',
  client_id: '',
  date: '',
})

export default defineComponent({
  name: "Sale_Form_update",
  setup() {
    const {get_sale} = useApi()

    const check_id = async(sale_id) =>{
      s_form.value = await get_sale(s_form.value.Sale_id)
      console.log(s_form.value)
    }
    return{
      s_form,
      check_id,
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_sale_update', this.s_form)
    }
  }
})
</script>

