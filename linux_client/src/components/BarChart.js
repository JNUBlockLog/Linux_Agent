import { Bar } from 'vue-chartjs'
 
export default {
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['192.168.30.111','192.168.30.112','192.168.30.113','192.168.30.114'],
      datasets: [
        {
          label: 'Inbound Packets',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
}