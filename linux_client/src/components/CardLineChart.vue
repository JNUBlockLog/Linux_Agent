<template>
<v-card :width="width" :height="height">
    <v-card-title>
        <h2>차단 이벤트</h2>
    </v-card-title>
    <v-card-text>
    <line-example></line-example>
    </v-card-text>
</v-card>
</template>

<script>
import LineExample from './LineChart.js'
export default {
  name: 'app',
  props: {
    width : {default : "50%"},
    height : {default : "auto"},
  },
  components: {
    LineExample
  }
}
</script>

<style>

</style>
