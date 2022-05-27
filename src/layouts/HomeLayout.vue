<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title> Web App </q-toolbar-title>
        <p class="q-mr-xl q-mt-md"><span style="color:black"><strong> User:</strong> </span>  {{store.username_aux}}</p>
        <p class="q-mr-xl q-mt-md"> <span style="color:black"> <strong>Permissions:</strong>  </span> {{store.user_type}}</p>
        <div>
          <q-btn-dropdown color="primary" icon="settings">
            <q-list>
              <q-item clickable v-close-popup @click.prevent="confirm = true">
                <q-item-section>
                  <q-item-label>Logout</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen">
      <q-list>
        <q-item-label header> VNA Manager Menu </q-item-label>
        <q-item clickable @click="left_menu(1)">
          <q-icon name="house" size="25px"></q-icon>
          <label class="q-mt-xs q-ml-lg"> Home page</label>
        </q-item>
        <q-item clickable @click="left_menu(2)">
          <q-icon name="people" size="25px"></q-icon>
          <label class="q-mt-xs q-ml-lg"> Clients</label>
        </q-item>
        <q-item v-if="store.user_type == 'admin' || store.user_type == 'manager' || store.user_type == 'dev'" clickable @click="left_menu(3)">
          <q-icon name="shopping_bag" size="25px"></q-icon>
          <label class="q-mt-xs q-ml-lg"> Sales</label>
        </q-item>
        <q-item clickable @click="left_menu(4)">
          <q-icon name="inventory_2" size="25px"></q-icon>
          <label class="q-mt-xs q-ml-lg">Products</label>
        </q-item>
        <q-item v-if="store.user_type == 'admin'" clickable @click="left_menu(5)">
          <q-icon name="manage_accounts" size="25px"></q-icon>
          <label class="q-mt-xs q-ml-lg"> Users</label>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="logout" text-color="white" />
          <span class="q-ml-sm">Por Favor confirme operação de Logout!</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Confirm" color="primary" v-close-popup @click="logoutUser(store.$state.session_id)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import {useRouter} from 'vue-router';
import {globalUser} from "src/stores/user_store";
import useNotify from "src/composables/UseNotify";


export default defineComponent({
  name: "HomeLayout",

  setup() {
    const store = globalUser()
    const {notifySuccess, notifyError} = useNotify()
    const leftDrawerOpen = ref(false)
    const router = useRouter()
    const verification = ref(false)

    const left_menu = (value) =>{
      switch (value) {
        case 1:
          router.replace({name: 'homePg'})
          break;
        case 2:
          router.replace({name: 'cliPg'})
          break;
        case 3:
          router.replace({name: 'salePg'})
          break;
        case 4:
          router.replace({name: 'ProductPg'})
          break;
        case 5:
          router.replace({name: 'supplierPg'})
          break;
        case 6:
          router.replace({name: 'MessagePg'})
          break;
        default:
          break;
      }
    }

    //Logout async function
    const logoutUser = async (session_id) =>{
      router.replace({name: 'loginPg'})
    }

    return {
      verification,
      store,
      left_menu,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logoutUser,
      confirm: ref(false),
    };
  },
});
</script>
