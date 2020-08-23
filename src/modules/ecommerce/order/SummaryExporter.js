var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
import CURRENCY from 'src/services/currency.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default{
  tableBodyGenerator(data){
    let tableBodyList = [
      [
        {text: 'Date', style: 'boldHeader'},
        {text: 'Order #', style: 'boldHeader'},
        {text: 'Location', style: 'boldHeader'},
        {text: 'Delivered By', style: 'boldHeader'},
        {text: 'Status', style: 'boldHeader'},
        {text: 'Total Amount', style: 'boldHeader'}
      ]
    ]
    data.forEach(item => {
      let tempArr = []
      tempArr.push(item.date)
      tempArr.push(item.order_number)
      tempArr.push(item.location !== null && item.location.length > 20 ? item.location.substring(0, 20) + '...' : item.location)
      tempArr.push(item.assigned_rider)
      tempArr.push(item.status + ' - ' + item.type)
      tempArr.push(CURRENCY.displayWithCurrency(item.total, item.currency ? item.currency : 'PHP'))
      tableBodyList.push(tempArr)
    })
    return tableBodyList
  },
  toPDF(data, salesReport){
    var docDefinition = {
      pageSize: 'A4',
      header: 'Sales Summary',
      content: [
        {
          style: 'tableExample',
          table: {
            widths: [120, 100],
            body: [
              [{text: 'Expected Total Sales:', style: 'boldHeader'}, 'PHP ' + salesReport.expectedTotalSales.toFixed(2)],
              [{text: 'Total Sales:', style: 'boldHeader'}, 'PHP ' + salesReport.totalSales.toFixed(2)],
              [{text: 'Total num of Transactions:', style: 'boldHeader'}, salesReport.totalTransac > 9 ? salesReport.totalTransac : '0' + salesReport.totalTransac],
              [{text: 'Completed Transactions:', style: 'boldHeader'}, salesReport.completedTransac > 9 ? salesReport.completedTransac : '0' + salesReport.completedTransac],
              [{text: 'Pending Transactions:', style: 'boldHeader'}, salesReport.pendingTransac > 9 ? salesReport.pendingTransac : '0' + salesReport.pendingTransac],
              [{text: 'Cancelled Transactions:', style: 'boldHeader'}, salesReport.cancelledTransac > 9 ? salesReport.cancelledTransac : '0' + salesReport.cancelledTransac]
            ]
          },
          layout: {
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
        {
          text: '',
          margin: [0, 20]
        },
        {
          table: {
            headerRows: 1,
            widths: [100, 80, '*', 50, 50, 80],
            body: this.tableBodyGenerator(data)
          },
          layout: {
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
        }
      ],
      styles: {
        boldHeader: {
          bold: true
        }
      }
    }
    pdfMake.createPdf(docDefinition).open()
  },
  toCSV(){}
}
