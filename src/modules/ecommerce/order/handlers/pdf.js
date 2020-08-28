import DateManipulation from './dateManipulation.js'
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default{
  layout(){
    return {
      hLineWidth: function () {
        return 1
      },
      vLineWidth: function () {
        return 1
      },
      hLineColor: function () {
        return 'gray'
      },
      vLineColor: function () {
        return 'gray'
      }
    }
  },
  toPDF(headerPDF, footerPDF, contentPDF){
    pdfMake.createPdf(this.createDoc(headerPDF, footerPDF, contentPDF)).open()
  },
  createDoc(headerPDF, footerPDF, contentPDF){
    return {
      pageSize: 'A4',
      pageMargins: [10, 60, 10, 30],
      header: headerPDF,
      footer: footerPDF,
      content: contentPDF,
      styles: {
        boldHeader: {
          bold: true
        },
        filledHeader: {
          bold: true,
          fontSize: 18,
          color: 'white',
          fillColor: '#FF5B04',
          alignment: 'center'
        },
        header: {
          fontSize: 12,
          alignment: 'center'
        },
        title: {
          bold: true,
          fontSize: 18,
          alignment: 'center'
        },
        item: {
          fontSize: 10
        },
        footer: {
          alignment: 'right'
        }
      }
    }
  },
  tableBodyGenerator(data){
    let tableBodyList = []
    tableBodyList.push(this.createHeaders(data))
    data.body.forEach(item => {
      let tempArr = []
      data.headers.forEach(headerElem => {
        if(headerElem.type === 'money'){
          tempArr.push(this.createObj('PHP ' + item[headerElem.name].toFixed(2)))
        }else{
          tempArr.push(this.createObj(item[headerElem.name]))
        }
      })
      tableBodyList.push(tempArr)
    })
    var tempArr = [{text: 'Total', style: 'boldHeader'}]
    for(let count = 1; count < data.headers.length; count++){
      if(data.headers[count].type !== 'money'){
        tempArr.push('')
      }else{
        data.total.forEach(totalElem => {
          if(totalElem.name === data.headers[count].name){
            tempArr.push('PHP ' + (totalElem.value.toFixed(2)))
          }
        })
      }
    }
    tableBodyList.push(tempArr)
    return tableBodyList
  },
  createObj(data){
    let obj = {}
    obj['text'] = data
    obj['style'] = 'item'
    return obj
  },
  createHeaders(data){
    var tempArr = []
    data.headers.forEach(headerElem => {
      tempArr.push({text: headerElem.label, style: 'boldHeader'})
    })
    return tempArr
  }
}
