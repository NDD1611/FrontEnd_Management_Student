
  
<script>

import Service from "../../service/Service.js"
import { Bar, PolarArea } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadialLinearScale, ArcElement)

export default {
    name: 'PolarAreaChart',
    components: {
        Bar,
        PolarArea
    },
    props: {
        xs: 0,
        g: 0,
        k: 0,
        tb: 0,
    },
    data() {
        return {
            chartData: {
                labels: [
                    'Xuất Sắc',
                    'Giỏi',
                    'Khá',
                    'Dưới Trung Bình'
                ],
                datasets: [{
                    label: "Chart",
                    data: [0, 0, 0, 0],
                    backgroundColor: [
                        '#0d6efd',
                        '#ffc107',
                        '#198754',
                        '#dc3545'
                    ]
                }]
            }
        }
    },
    async created() {
        this.chartData.datasets[0].data[0] = this.xs
        this.chartData.datasets[0].data[1] = this.g
        this.chartData.datasets[0].data[2] = this.k
        this.chartData.datasets[0].data[3] = this.tb
    }

}
</script>
    
<template>
    <Bar :chart-data="chartData" />
</template>