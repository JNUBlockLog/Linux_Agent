<template id="container-main">
    <v-container>
      <card-chart></card-chart>
      <br>
      <card-table></card-table>
    </v-container>
</template>

<script>
import CardTable from './components/CardTable.vue'
import CardChart from './components/CardChart.vue'

export default{
    name: "main",
    components : {CardTable, CardChart}
}
</script>

<style>

</style>
