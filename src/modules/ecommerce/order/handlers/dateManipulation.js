export default{
  getNextDay(date){
    var tempDate = new Date(date)
    return [tempDate.getFullYear(),
      tempDate.getMonth() + 1 < 10 ? '0' + (tempDate.getMonth() + 1) : tempDate.getMonth() + 1,
      tempDate.getDate() + 1
    ].join('-')
  },
  currentDate(){
    var today = new Date()
    return this.dateFormat(today)
  },
  dateFormat(date){
    var dd = String(date.getDate()).padStart(2, '0')
    var mm = String(date.toLocaleString('default', {month: 'long'})).padStart(2, '0')
    var yyyy = date.getFullYear()
    return [mm, dd + ',', yyyy].join(' ')
  }
}

