<template id="container-schedule">
    <v-container>
        <device-movement-table></device-movement-table>
    </v-container>
</template>

<script>
import DeviceMovementTable from './components/DeviceMovementTable.vue'
export default{
    name: "DeviceMovementPage",
    components : {DeviceMovementTable, }
}
</script>

<style>

</style>
