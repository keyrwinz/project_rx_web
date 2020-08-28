<template>
      <table v-if="data.body !== null" class="table table-bordered table-responsive">
        <thead>
          <th v-for="(datum, index) in data.headers" :key="index">{{datum.label}}</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data.body" :key="index">
            <td v-for="(label, index) in data.headers" :key="index">{{label.type === 'money' ?'PHP ' + item[label.name].toFixed(2) : item[label.name] }}</td>
          </tr>
          <tr v-if="data.body !== null">
            <td v-for="(datum, index) in data.headers" :key="index" >{{datum.type === 'money' ? 'PHP ' + total[datum.name].toFixed(2): index === 0 ? 'Total': ''}}</td>
          </tr>
        </tbody>
      </table>  
      <div style="text-align:center;color:grey;margin-top:50px" v-else>
        <h3 >Opps!!sorry no record :(</h3>
      </div>  
</template>
<script>
import CURRENCY from 'src/services/currency.js'
export default {
  name: 'TemplateSummaryExporter',
  data(){
    return {
      data: this.propsData,
      currency: CURRENCY,
      total: this.totalArr
    }
  },
  props: ['propsData', 'totalArr'],
  watch: {
    propsData: (newVal, old) => {
      this.total = this.totalArr
    }
  }
}
</script>
