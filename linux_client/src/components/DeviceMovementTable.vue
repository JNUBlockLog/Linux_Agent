<template>
    <v-card>
        <v-card-title>
            <h2>장비 목록</h2>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="검색"
              single-line
              hide-details
            ></v-text-field>
            <v-btn icon @click="fetchData">
              <v-icon>refresh</v-icon>
            </v-btn>
        </v-card-title>
        <v-divider/>
        <v-card-text>
            <v-data-table
            :headers="headers"
            :items="deviceList"
            :pagination.sync="pagination"
            select-all
            item-key="name"
            class="elevation-1"
            :search="search"
            >
            <template slot="headers" slot-scope="props">
            <tr>
            <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
            >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
            </th>
            </tr>
            </template>
            <template slot="items" slot-scope="props">
            <tr :active="props.selected" @click="props.selected = !props.selected">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.MACAddress }}</td>
            <td class="text-xs-right">{{ props.item.Processes }}</td>
            <td class="text-xs-right">{{ props.item.DeviceType }}</td>
            <td class="text-xs-right">{{ props.item.DeviceDesc }}</td>
            <td class="text-xs-right">{{ props.item.DeviceID }}</td>
            </tr>
            </template>
            <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
            </v-data-table>
        </v-card-text>
    </v-card>
</template>

<script>
import CONF from "../Config.js";
import eventBus from "../EventBus.js";
export default {
  data: () => ({
    search:'',
    pagination: {
      sortBy: "name"
    },
    headers: [
      {
        text: "장비 이름",
        align: "left",
        value: "name"
      },
      { text: "MAC 주소", value: "MACAddress" },
      { text: "가동중인 프로세스 수", value: "Processes" },
      { text: "장비 종류", value: "DeviceType" },
      { text: "장비 설명", value: "DeviceDesc" },
      { text: "장비 ID", value: "DeviceID" }
    ],
    deviceList: [
      {
        $class: "org.factory.Device",
        DeviceID: "Device:1527217396",
        name: "IoT Machine 1",
        CPUInfomation: "Intel®Core™ i3-4160 3.60GHz",
        MACAddress: "00:0c:29:5a:d9:71",
        DeviceType: "IoT Machine 1",
        DeviceDesc: "Make Logistics Happy",
        currentDepartment: "resource:org.factory.Department#2",
        DeviceUser: "resource:org.factory.Worker#1",
        DeviceManager: "resource:org.factory.DeviceManager#1",
        Processes: "All: 338, Running: 1"
      }
    ]
  }),
  mounted: function() {
    console.log("[INFO] : ON MOUNT :");
    this.fetchData();
  },
  methods: {
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.deviceList.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },

    fetchData: function() {
      console.log(`[INFO] : fetching data at ${CONF.DeviceList}`);
      this.$axios.get(CONF.DeviceList).then(response => {
        this.deviceList = response.data;
        console.log("Fetch Result:");
        console.log(response);
      });
    }
  }
};
</script>

<style>
</style>
