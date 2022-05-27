<template>
  <q-page>
    <div class="row justify-center q-mt-md">
      <label class="q-mt-sm" style="font-size:large"> Message To:</label>
      <q-input
            filled
            class="q-ml-lg"
            style="width: 300px"
            v-model="input"
            dense
            type="text"
            :counter="10"
            :label="input_type"
            required>
        </q-input>
        <q-select
            filled
            style="width: 300px"
            class="q-ml-md"
            dense
            v-model="input_type"
            :options="items"
            label="Item"
            required>
        </q-select>
    </div>
    <div class="row justify-center q-mt-lg" >
      <q-input
      style="width: 660px"
      v-model="text"
      filled
      type="textarea"/>
      <q-btn class="q-ml-md" color="green">SEND</q-btn>
    </div>
    <div class="row justify-center q-mt-xl">
      <label class="q-mt-sm" style="font-size:large"> Select Topic</label>
      <q-select
            filled
            style="width: 300px"
            class="q-ml-md"
            dense
            v-model="input_type"
            :options="items"
            label="Topic"
            required>
        </q-select>
        <q-btn class="q-ml-md" color="primary"> Load Messages</q-btn>
    </div>
    <div class="row justify-center q-mt-md">
      <q-table
        title="Topic Inbox"
        style="width: 750px"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round dense @click="props.expand = !props.expand" :icon="props.expand ? 'remove' : 'add'" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>

  </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name:'MessagePg',
  data(){
    return{
      input: '',
      input_type: '',
    }
  },
  setup() {
    return{
      items:[
        'User', 'Topic'
      ],
    }
  },
})
</script>
