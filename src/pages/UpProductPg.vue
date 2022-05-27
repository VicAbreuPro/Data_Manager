<template>
  <q-page padding>
      <p class ="col-12 text-h4 text-center q-mt-lg"> Update Product Data</p>
      <q-form class="row justify-center" @submit.prevent="checkId()">
        <div class="row q-mt-sm">
          <q-icon class="q-mr-lg q-mt-lg" color="green" name="check_circle_outline" v-if="icoAux.checkIco == true && productForm.serialNumber != null "></q-icon>
          <q-icon class="q-mr-lg q-mt-lg" name="info" v-if="icoAux.infoIco || productForm.serialNumber == null "></q-icon>
          <q-input
            dense
            clearable
            v-model="productForm.serialNumber"
            type="number"
            label="Verify Serial Number!"
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
        <label class="q-mr-sm"> Actual Model: <strong>{{proAux.model}}</strong></label>
        <label class="q-ml-sm">Actual Value €: <strong>{{proAux.value}}</strong></label>
      </div>
      <q-form @submit.prevent="updateProduct()">
        <div class="fixed-center q-mt-xl">
          <div class="col q-mt-xl">
            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="star"></q-icon>
              <q-input
                dense
                clearable
                v-model="productForm.p_model"
                type="text"
                label="Model"
                :rules="nameRules">
              </q-input>

            </div>

            <div class="row">
              <q-icon class="q-mr-sm q-mt-md" name="euro"></q-icon>
              <q-input
                dense
                clearable
                v-model="productForm.p_value"
                type="text"
                label="Value"
                suffix="€"
                :rules="nameRules"></q-input>
            </div>
            <q-btn class="full-width q-mt-xl" label="Update Product" color="primary" type="submit"></q-btn>
            <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" @click="closeApp()"></q-btn>
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
  name: "UpdateProductPg",

  setup(){
    const {getProducts, upProduct} = useApi()
    const{notifyError, notifySuccess} = useNotify()
    const router = useRouter()
    const listAux = ref([])

    const icoAux = ref({
      infoIco: true,
      checkIco: false,
      checkInfo: false
    })

    // Reactive form for login inputs
    const productForm = ref({
        serialAux: '',
        serialNumber: '',
        p_model: '',
        p_value: '',
    })

    const proAux = ref({
      model: '' ,
      value: '',
    })


    const checkId = async () => {

      var notAux = false;

      try {
        listAux.value = await getProducts()

        listAux.value.forEach(product => {
          if(product.serial == productForm.value.serialNumber){

            productForm.value.serialAux = product.serial
            proAux.value.model = product.model
            proAux.value.value = product.valor

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

    const updateProduct = async () =>{
      try {
        const status = await upProduct(productForm.value.serialAux, productForm.value.p_model, productForm.value.p_value)

        if(status == 200) notifySuccess("Product Nº: " + productForm.value.serialAux + " updated!")
        else notifyError("Error in Update Product!")
      } catch (error) {
        notifyError("Internal Application Error!")
      }
    }

    function closeApp () {

      this.close()

    }
    return{
      proAux,
      icoAux,
      productForm,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      checkId,
      updateProduct,
      closeApp
    }
  },

  methods:{
    closeWindow(){ this.close()}
  }
})
</script>
