<template>
  <q-page padding>
      <p class ="col-12 text-h4 text-center q-mt-lg"> Update Sale Info</p>
      <q-form class="row justify-center" @submit.prevent="checkId()">
        <div class="row q-mt-sm">
          <q-icon class="q-mr-lg q-mt-lg" color="green" name="check_circle_outline" v-if="icoAux.checkIco == true && saleForm.sale_ID != null "></q-icon>
          <q-icon class="q-mr-lg q-mt-lg" name="info" v-if="icoAux.infoIco || saleForm.sale_ID == null "></q-icon>
          <q-input
            dense
            clearable
            v-model="saleForm.sale_ID"
            type="number"
            label="Verify Sale ID!"
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
      <div class="row justify-center q-mt-md q-mb-md" v-if="icoAux.checkInfo">
        <label class="q-mr-sm"> Serial: <strong>{{saleAux.s_serial}}</strong></label>
        <label class="q-ml-sm">Model: <strong>{{saleAux.s_model}}</strong></label>
        <label class="q-mr-sm q-ml-md"> Cli ID: <strong>{{saleAux.s_cli}}</strong></label>
        <label class="q-ml-sm">Value €: <strong>{{saleAux.s_value}}</strong></label>
      </div>
      <q-form @submit.prevent="updateSale()">
        <div class="fixed-center q-mt-xl">
          <div class="col q-mt-xl">
            <div class="row">
              <q-icon class="q-mr-sm q-mt-lg" name="star"></q-icon>
              <q-input
                dense
                clearable
                v-model="saleForm.s_model"
                type="text"
                label="Model"
                :rules="nameRules">
              </q-input>

            </div>

            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="vpn_key"></q-icon>
              <q-input
                dense
                clearable
                v-model="saleForm.s_serial"
                type="text"
                label="Serial Number"
                :rules="nameRules"></q-input>
            </div>

            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="euro"></q-icon>
              <q-input
                dense
                clearable
                v-model="saleForm.s_value"
                type="text"
                label="Value"
                suffix="€"
                :rules="nameRules"></q-input>
            </div>

            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
              <q-input
                dense
                clearable
                v-model="saleForm.s_cli"
                type="number"
                label="Client ID"
                :rules="nameRules"></q-input>
            </div>
            <q-btn class="full-width q-mt-xl" label="Update Product" color="primary" type="submit"></q-btn>
            <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" ></q-btn>
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
  name: "UpdateSalePg",

  setup(){
    const {getSales, upSale} = useApi()
    const{notifyError, notifySuccess} = useNotify()
    const router = useRouter()
    const listAux = ref([])

    const icoAux = ref({
      infoIco: true,
      checkIco: false,
      checkInfo: false
    })

    // Reactive form for login inputs
    const saleForm = ref({
        s_id: '',
        sale_ID: '',
        s_serial: '',
        s_model: '',
        s_cli: '',
        s_value: '',
        s_date: ''
    })

    const saleAux = ref({
      s_serial: '',
      s_model: '',
      s_cli: '',
      s_value: '',
    })

    const checkId = async () => {

      var notAux = false;

      try {
        listAux.value = await getSales()

        listAux.value.forEach(sale => {
          if(sale.sale_id == saleForm.value.sale_ID){

            saleForm.value.s_id = sale.sale_id
            saleAux.value.s_serial = sale.serial
            saleAux.value.s_model = sale.model
            saleAux.value.s_cli = sale.client_id
            saleAux.value.s_value = sale.valor
            saleForm.value.s_date = sale.date


            icoAux.value.checkInfo = true
            icoAux.value.infoIco = false
            icoAux.value.checkIco = true
            notAux = true
          }
        });

        if(notAux != true) notifyError("Product Not Found!")
        else notifySuccess("Product Serial Check!")
      } catch (error) {
        console.log(error)
      }
    }

    const updateSale = async () =>{
      try {
        const status = await upSale(saleForm.value.s_id, saleForm.value.s_serial, saleForm.value.s_model, saleForm.value.s_cli, saleForm.value.s_value, saleForm.value.s_date)

        if(status == 200) notifySuccess("Sale ID: " + saleForm.value.s_id + " updated!")
        else notifyError("Error in Update Sale!")
      } catch (error) {
        notifyError("Internal Application Error!")
      }
    }

    return{
      icoAux,
      saleForm,
      saleAux,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      checkId,
      updateSale,
    }
  },

})
</script>
