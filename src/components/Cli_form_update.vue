<template>
  <q-form v-model="cli_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="search"></q-icon>
      <q-input
        style="width: 75%"
        dense
        clearable
        v-model="cli_form.id"
        type="number"
        label="Client ID"
        :rules="nameRules">
      </q-input>
      <q-btn
        class="q-mt-sm q-ml-sm"
        label="CHECK"
        color="green"
        style="height: 10%"
        @click="check_id(cli_form.id)">
      </q-btn>
    </div>
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
import useApi from "src/composables/UseApi"

// Reactive form for client data inputs
const cli_form = ref({
  id: '',
  name: '',
  location: '',
  date: ''
})

export default defineComponent({
  name: "Cli_Form_update",
  setup(){
    const {get_client} = useApi()

    const check_id = async(id) =>{
      cli_form.value = await get_client(cli_form.value.id)
    }
    return{
      cli_form,
      check_id,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form_up', this.cli_form)
    }
  }
})
</script>


