<template>
  <q-page class="text-h5 text-center q-mt-xl">
    <div class="q-ml-xl q-mr-xl q-mt-lg">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        autoplay
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders">
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="home" size="56px" />
          <div class="q-mt-md text-center">
            {{ homeSlide }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row q-mt-xl justify-center">
      <q-card
        class=" home-card my-card text-white q-ml-xl"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Total Clients: {{tClients}}</div>
          <div class="text-subtitle2">Most from:</div>
          <div class="q-mt-sm"> {{ tpClients }} </div>
        </q-card-section>
      </q-card>
      <q-card
        class=" home-card my-card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Products Count: {{tProducts}}</div>
          <div class="text-subtitle2">Most frequent product:</div>
          <div class="q-mt-sm"> {{tpProduct}}</div>
        </q-card-section>
      </q-card>
      <q-card
        class="my-card home-card-right text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Euro € -> Real R$</div>
          <div class=" currency text-h5"> {{real}} R$</div>
          <div class="text-subtitle2 q-mt-sm">exchangerate.host official</div>
        </q-card-section>
      </q-card>

    </div>
    <div class="row q-mt-lg justify-center">
      <q-card
        class=" home-card my-card text-white q-ml-xl"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Total Sales: {{tSales_v}}</div>
          <div class="text-subtitle2">Top Sale:</div>
          <div class=""> {{tSales}}</div>
        </q-card-section>
      </q-card>
      <q-card
        class=" home-card my-card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Sales Amount: {{saleAmount}} €</div>
          <div class="text-subtitle2"> Year Sales:</div>
          <div class=""> <span color="green">{{ySale}} €</span></div>
        </q-card-section>
      </q-card>
      <q-card
        class="my-card home-card-right text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Euro € -> Dollar $</div>
          <div class=" currency text-h5"> {{dollar}} $</div>
          <div class="text-subtitle2 q-mt-sm">exchangerate.host official</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useApi from "src/composables/UseApi";
import extraData from "src/composables/ExternalData";
import useNotify from "src/composables/UseNotify";
import {globalUser} from "src/stores/user_store";
import {useRouter} from 'vue-router';


export default defineComponent({
    name: "HomePage",

    setup(){
      const store = globalUser()
      const {getCurrency} = extraData()
      const {getSales, topSale, yearSale, getStock, getClientList, topCliLocation, topProduct} = useApi()
      const {notifyError, notifySuccess} = useNotify()
      const real = ref('')
      const dollar = ref('')
      const tClients = ref('')
      const tpClients = ref('')
      const tProducts = ref('')
      const tpProduct = ref('')
      const tSales = ref('')
      const tSales_v = ref('')
      const ySale = ref('')
      const clientList = ref([])
      const productList = ref([])
      const saleList = ref([])
      const saleAmount = ref(0)
      const currencyList = ref([])
      const router = useRouter()

      const mapClients = async () =>{
        try {
          var aux = false
          clientList.value = await getClientList(0, 'default', 'default')
          tpClients.value = await topCliLocation()
          tClients.value = clientList.value.length
          if (tClients.value != null && tpClients.value != null) aux =true
          if(aux != true) notifyError("Client Data Not Loaded Correctly!")
        } catch (error) {
          console.log(error)
        }
      }
      const mapProducts = async () =>{
        try {
          var aux = false
          productList.value = await getStock(0, 'default', 'default')
          tProducts.value = productList.value.length
          tpProduct.value = await topProduct()
        } catch (error) {
        }
      }
      const mapSales = async () =>{
        try {
          saleList.value = await getSales(0, 'default', 'default')
          tSales.value = await topSale()
          ySale.value = await yearSale()
          tSales_v.value = saleList.value.length
          saleList.value.forEach(sale => {
            saleAmount.value += sale.valor
          });
        } catch (error) {
          notifyError("Error in load data!")
        }
      }
      const mapCurrency = async () =>{
        try {
          currencyList.value = await getCurrency()
          real.value = currencyList.value.BRL
          var aux = currencyList.value.rates.USD.toString()
          var aux_r = currencyList.value.rates.BRL.toString()
          dollar.value = aux.substring(0,4)
          real.value = aux_r.substring(0,4)

        } catch (error) {
          notifyError("Error in load currency data!")
        }
      }
      onMounted(() =>{
        mapCurrency()
        mapClients()
        mapProducts()
        mapSales()
      })

      const test = () =>{
        router.replace({name: 'cliPg'})
      }
      return{
        tpClients,
        tClients,
        tProducts,
        tpProduct,
        tSales,
        tSales_v,
        saleAmount,
        ySale,
        store,
        real,
        dollar,
        slide: ref('style'),
        homeSlide: '',
        lorem:'',
        test
      }
    }
})
</script>
