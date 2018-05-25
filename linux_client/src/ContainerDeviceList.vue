<template id="container-schedule">
    <v-container>
        <device-list-table></device-list-table>
    </v-container>
</template>

<script>
import DeviceListTable from './components/DeviceListTable.vue'
export default{
    name: "DeviceListPage",
    components : {DeviceListTable, }
}
</script>

<style>

</style>
