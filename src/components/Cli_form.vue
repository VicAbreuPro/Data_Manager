<template>
  <q-form v-model="cli_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
        <q-input
          style="width: 95%"
          dense
          clearable
          v-model="cli_form.name"
          type="text"
          label="Client Name"
          :rules="nameRules">
        </q-input>
    </div>
    <div class="row">
      <q-icon class="q-mt-md" name="location_on"></q-icon>
      <q-input
      class="form q-ml-sm"
      style="width: 95%"
      dense
      clearable
      v-model="cli_form.location"
      type="text"
      label="Location"
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
        v-model="cli_form.date"
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
import { defineComponent, ref } from "vue";

// Reactive form for client data inputs
const cli_form = ref({
  name: '',
  location: '',
  date: ''
})

export default defineComponent({
  name: "Cli_Form",
  setup(){
    return{
      cli_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', cli_form.value)
    }
  }
})
</script>


