<template>
  <q-form v-model="p_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="precision_manufacturing"></q-icon>
      <q-input
        style="width: 95%"
        dense
        clearable
        v-model="p_form.model"
        type="text"
        label="Equipment"
        :rules="nameRules">
      </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="assignment"></q-icon>
      <q-input
      class="form q-ml-sm"
      style="width: 95%"
      dense
      clearable
      v-model="p_form.serial"
      type="number"
      label="Serial Number"
      :rules="nameRules">
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
        label="Value €"
        :rules="nameRules">
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

// Reactive form for client data inputs
const p_form = ref({
  serial: '',
  model: '',
  valor: '',
})

export default defineComponent({
  name: "Product_form",
  setup(){
    return{
      p_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', p_form.value)
    }
  }
})
</script>
