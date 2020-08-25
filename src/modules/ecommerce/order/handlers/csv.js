import DateManipulation from './dateManipulation.js'
export default{
  toCSV(data, userData, dateCreated){
    var tempvar = []
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
  }
}
