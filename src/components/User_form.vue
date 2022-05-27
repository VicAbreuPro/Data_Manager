<template>
  <q-form v-model="sup_form" @change="emitEvent">
    <div class="">

      <div class="row">
        <q-icon class="q-mr-sm q-mt-md q-ml-sm" name="person"></q-icon>
        <q-input
          style="width: 90%"
          dense
          clearable
          v-model="user_form.username"
          type="text"
          label="Username"
          :rules="nameRules">
        </q-input>
      </div>

      <div class="row">
        <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="password"></q-icon>
        <q-input
          style="width: 90%"
          dense
          clearable
          v-model="user_form.password"
          type="text"
          label="Password"
          :rules="nameRules">
        </q-input>
      </div>
      <div class="row">
        <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="badge"></q-icon>
        <q-select
          style="width: 90%"
          class="form q-ml-sm"
          :options="type_options"
          dense
          clearable
          v-model="user_form.type"
          type=""
          label="User type"
          :rules="nameRules">
        </q-select>
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
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";

// Reactive form for client data inputs
const user_form = ref({
  username: '',
  password: '',
  user_type: ''
})

export default defineComponent({
  name: "User_form",
  setup(){
    return{
      user_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      type_options:[
        'admin', 'staff'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', user_form.value)
    }
  }
})
</script>
