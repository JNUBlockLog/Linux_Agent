<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile :to="{path:'/'}">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>개요</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/device_list'}">
          <v-list-tile-action>
            <v-icon>forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>장비 현황 열람</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/AP_list'}">
          <v-list-tile-action>
            <v-icon>signal_wifi_4_bar_lock</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>AP 현황 열람</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/device_movement'}">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>장비 이동 기록</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile :to="{path:'/network_overview'}">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>네트워크 개요</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/inbound_ip'}">
          <v-list-tile-action>
            <v-icon>transit_enterexit</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>인바운드 IP</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/blocked_ip'}">
          <v-list-tile-action>
            <v-icon>block</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>차단 IP 목록</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile :to="{path:'/packet_filtering'}">
          <v-list-tile-action>
            <v-icon>filter_list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>패킷 필터링 규칙 관리</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Security Information and Event Management</v-toolbar-title>
    </v-toolbar>
    <v-content>
        <v-container fluid>
            <v-fade-transition mode="out-in">
                <router-view/>
            </v-fade-transition>
        </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; SmartFactory Inc.</span>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    },
    components : {
    }
  }
</script>