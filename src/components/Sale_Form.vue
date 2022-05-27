<template>
  <q-form v-model="s_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="precision_manufacturing"></q-icon>
      <q-input
        style="width: 95%"
        dense
        clearable
        v-model="s_form.model"
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
      v-model="s_form.serial"
      type="number"
      label="Serial Number"
      :rules="nameRules">
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
        type="number"
        label="Client ID"
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
        v-model="s_form.valor"
        type="number"
        label="Value €"
        :rules="nameRules">
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
        hint="Register Date"
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
import { defineComponent, ref } from 'vue'

const s_form = ref({
  serial: '',
  valor: '',
  model: '',
  client_id: '',
  date: '',
})

export default defineComponent({
  name: "Sale_Form",
  setup() {
    return{
      s_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', s_form.value)
    }
  }
})
</script>

