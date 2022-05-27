<template>
  <q-form v-model="p_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="search"></q-icon>
      <q-input
        style="width: 75%"
        dense
        clearable
        v-model="p_form.serial"
        type="number"
        label="Serial Number">
      </q-input>
      <q-btn
        class="q-mt-sm q-ml-sm"
        label="CHECK"
        color="green"
        style="height: 10%"
        @click="check_id(p_form.serial)">
      </q-btn>
    </div>
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="precision_manufacturing"></q-icon>
      <q-input
        style="width: 95%"
        dense
        clearable
        v-model="p_form.model"
        type="text"
        label="Equipment">
      </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="paid"></q-icon>
      <q-input
        style="width: 95%"
        class="q-ml-sm"
        dense
        clearable
        v-model="p_form.valor"
        type="number"
        label="Value €">
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
import { defineComponent, ref } from "vue";
import useApi from "src/composables/UseApi"

// Reactive form for client data inputs
const p_form = ref({
  serial: '',
  model: '',
  valor: '',
})

export default defineComponent({
  name: "Product_form_update",
  setup(){
    const {get_product} = useApi()

    const check_id = async() =>{
      p_form.value = await get_product(p_form.value.serial)
    }

    return{
      p_form,
      check_id,
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form_product_update', this.p_form)
    }
  }
})
</script>
