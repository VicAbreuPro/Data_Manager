<template>
  <q-page padding>
      <p class ="col-12 text-h4 text-center q-mt-lg"> Update Client</p>
      <q-form class="row justify-center" @submit.prevent="checkId()">
        <div class="row q-mt-sm">
          <q-icon class="q-mr-lg q-mt-lg" color="green" name="check_circle_outline" v-if="icoAux.checkIco == true && cliForm.cli_Id != null "></q-icon>
          <q-icon class="q-mr-lg q-mt-lg" name="info" v-if="icoAux.infoIco || cliForm.cli_Id == null "></q-icon>
          <q-input
            dense
            clearable
            v-model="cliForm.cli_Id"
            type="number"
            label="Verify Client ID!"
            :rules="nameRules">
          </q-input>
          <div class="q-mt-sm q-ml-md">
            <q-btn
              color="primary"
              label="CHECK"
              type="submit">
            </q-btn>
          </div>
        </div>
      </q-form>
      <div class="row justify-center q-mt-md" v-if="icoAux.checkInfo">
        <label class="q-mr-sm"> Actual Name: <strong>{{cliAux.name}}</strong></label>
        <label class="q-ml-sm">Actual Location: <strong>{{cliAux.localAux}}</strong></label>
      </div>
      <q-form @submit.prevent="updateClient()">
        <div class="fixed-center q-mt-xl">
          <div class="col q-mt-xl">
            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
              <q-input
                dense
                clearable
                v-model="cliForm.cli_name"
                type="text"
                label="Name"
                :rules="nameRules">
              </q-input>

            </div>

            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="location_on"></q-icon>
              <q-input
                dense
                clearable
                v-model="cliForm.cli_location"
                type="text"
                label="Location"
                :rules="nameRules"></q-input>
            </div>
            <q-btn class="full-width q-mt-xl" label="Update Client" color="primary" type="submit"></q-btn>
            <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" to="/ClientPg"></q-btn>
          </div>
        </div>
      </q-form>

  </q-page>
</template>

<script>
//Import components and composables
import { defineComponent, ref } from "vue";
import useNotify from "src/composables/UseNotify";
import useApi from "src/composables/UseApi"

//For redirecting after registration
import {useRouter} from 'vue-router';

export default defineComponent({
  name: "UpdateCliPg",

  setup(){
    const {getClientList, upClient} = useApi()
    const{notifyError, notifySuccess} = useNotify()
    const router = useRouter()
    const listAux = ref([])

    const icoAux = ref({
      infoIco: true,
      checkIco: false,
      checkInfo: false
    })

    // Reactive form for login inputs
    const cliForm = ref({
        id_Aux: '',
        cli_Id: '',
        cli_name: '',
        cli_location: '',
        cli_date: '',
    })

    const cliAux = ref({
      name: '' ,
      localAux: ''
    })


    const checkId = async () => {

      var notAux = true;

      try {
        listAux.value = await getClientList()

        listAux.value.forEach(client => {
          if(client.id == cliForm.value.cli_Id){

            cliForm.value.id_Aux = client.id
            cliForm.value.cli_date = client.date
            cliAux.value.name = client.name
            cliAux.value.localAux = client.location

            icoAux.value.checkInfo = true
            icoAux.value.infoIco = false
            icoAux.value.checkIco = true
          }
        });

        if(notAux != true) notifyError("Client Not Found!")
        else notifySuccess("Client ID Check!")

      } catch (error) {
        console.log(error)
      }
    }

    const updateClient = async () =>{

      try {
        const status = await upClient(cliForm.value.id_Aux, cliForm.value.cli_name, cliForm.value.cli_location, cliForm.value.cli_date)

        if(status == 200) notifySuccess("Client ID: " + cliForm.value.id_Aux + " updated!")
        else notifyError("Error in Update Client!")
      } catch (error) {
        notifyError("Internal Application Error!")
      }
    }

    return{
      cliAux,
      icoAux,
      cliForm,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      checkId,
      updateClient
    }
  }
})
</script>
