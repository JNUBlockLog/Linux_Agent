import {Line} from 'vue-chartjs'

export default {

  extends: Line,
  mounted () {
    this.renderChart({
      labels: ['3일', '2일', '1일'],
      datasets: [
        {
          label: 'SQLi',
          backgroundColor: '#FC2525',
          data: [40, 39, 10]
        },{
          label: 'Large Packet',
          backgroundColor: '#05CBE1',
          data: [60, 55, 32]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
}
}
