import DateManipulation from './dateManipulation.js'
import lodash from 'lodash'
export default{
  toCSV(data, userData, dateCreated, type){
    var tempvar = []
    if(type === 'orders'){
      tempvar.push(this.createObj(data, []))
      data.body.forEach(item => {
        var tempObj = {}
        data.headers.forEach(headerElem => {
          if(headerElem.type === 'money'){
            tempObj[headerElem.label] = item[headerElem.name].toFixed(2)
          }else{
            tempObj[headerElem.label] = item[headerElem.name]
          }
        })
        tempvar.push(tempObj)
      })
      var tempArr = ['Total']
      for(let count = 1; count < data.headers.length; count++){
        if(data.headers[count].type !== 'money'){
          tempArr.push('')
        }else{
          data.total.forEach(totalElem => {
            if(totalElem.name === data.headers[count].name){
              tempArr.push(totalElem.value.toFixed(2))
            }
          })
        }
      }
      tempvar.push(this.createObj(data, tempArr))
      tempvar.push(this.createObj(data, []))
      tempvar.push(this.createObj(data, ['Merchant Name', userData.subAccount.merchant.name]))
      tempvar.push(this.createObj(data, ['Merchant Address', userData.subAccount.merchant.address]))
      tempvar.push(this.createObj(data, ['Query Date', dateCreated]))
      tempvar.push(this.createObj(data, ['Date Published', DateManipulation.currentDate()]))
    }else{
      var tempData = data.body
      tempData.forEach(element => {
        data.body = element
        data = this.setTotals(data)
        tempvar.push(this.createObj(data, []))
        tempvar.push(this.createObj(data, []))
        data.body.forEach(item => {
          var tempObj = {}
          data.headers.forEach(headerElem => {
            if(headerElem.type === 'money'){
              tempObj[headerElem.label] = item[headerElem.name].toFixed(2)
            }else{
              tempObj[headerElem.label] = item[headerElem.name]
            }
          })
          tempvar.push(tempObj)
        })
        var tempArr = ['Total']
        for(let count = 1; count < data.headers.length; count++){
          if(data.headers[count].type !== 'money' && data.headers[count].type !== 'int'){
            tempArr.push('')
          }else{
            data.total.forEach(totalElem => {
              if(totalElem.name === data.headers[count].name){
                tempArr.push(totalElem.value)
              }
            })
          }
        }
        tempvar.push(this.createObj(data, tempArr))
        tempvar.push(this.createObj(data, ['subtotal', data.totals['sub_total']]))
        tempvar.push(this.createObj(data, ['shipping fee', 0]))
        tempvar.push(this.createObj(data, ['tax', data.totals['tax']]))
        tempvar.push(this.createObj(data, ['total', data.totals['total']]))
        tempvar.push(this.createObj(data, ['Order #', data.body[0].order_number]))
        tempvar.push(this.createObj(data, ['Rider', 'NA']))
        tempvar.push(this.createObj(data, ['Location', 'NA']))
        tempvar.push(this.createObj(data, ['Status', data.body[0].status]))
      })
    }
    return tempvar
  },
  createObj(data, array){
    var tempObj = {}
    for(let count = 0; count < data.headers.length; count++){
      var value = ''
      if(array[count] !== undefined){
        value = array[count]
      }
      tempObj[data.headers[count].label] = value
    }
    return tempObj
  },
  setTotals(data){
    data.total[0].value = this.getTotal(data.body, 'sub_total')
    data.total[1].value = this.getTotal(data.body, 'shipping_fee')
    data.total[2].value = this.getTotal(data.body, 'tax')
    data.total[3].value = this.getTotal(data.body, 'total')
    data.total[4].value = this.getTotal(data.body, 'qty')
    data.total[5].value = this.getTotal(data.body, 'price')
    data.total.forEach(element => {
      data.totals[element.name] = element.value
    })
    return data
  },
  getTotal(data, type){
    return lodash.sumBy(data, (val) => {
      return val[type]
    })
  }
}
