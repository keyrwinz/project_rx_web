import PDFTemplate from 'pdfmake'

export default {
  merchant: null,
  merchantAd: null,
  merchantEmail: null,
  dataContainer: [],
  getItem(data, merchant) {
    this.dates = data.date
    this.money = data.tendered_amount
    this.sub_total = data.sub_total
    this.discount = data.discount
    this.total = data.total
    this.changed = data.change
    this.tax = data.tax
    this.deliveryFee = data.shipping_fee
    this.merchant = merchant.name
    this.merchantAd = merchant.address
  },
  getData(data) {
    this.dataContainer = data
  },
  template() {
    var data = []
    data.push(
      [
        { text: 'Qty', fontSize: 10, bold: true },
        { text: 'Product', fontSize: 10, bold: true, alignment: 'center' },
        { text: 'Price', fontSize: 10, bold: true },
        { text: 'Total', fontSize: 10, bold: true }
      ]
    )
    this.dataContainer.map(key => {
      data.push([
        { text: key.qty, fontSize: 10, margin: [0, 0, 0, 10] },
        { text: key.title, fontSize: 10, margin: [0, 0, 0, 10] },
        { text: key.price, fontSize: 10, margin: [0, 0, 0, 10] },
        { text: (key.price * key.qty), fontSize: 10, margin: [0, 0, 0, 10] }
      ])
    })
    var docDefinition = {
      pageMargins: [ 20, 30, 20, 20 ],
      pageSize: {
        width: 300,
        height: 'auto'
      },
      content: [
        {
          text: this.merchant,
          fontSize: 20,
          style: 'header',
          alignment: 'center',
          bold: true
        },
        {
          text: this.merchantAd,
          fontSize: 13,
          style: 'subheader',
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        {
          layout: 'headerLineOnly',
          table: {
            headerRows: 1,
            widths: [ '*', 'auto', 45, '*' ],
            body: data
          }
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ '*', '*' ],
            body: [
              [
                {
                  text: 'Subtotal',
                  margin: [0, 10, 0, 0],
                  fontSize: 10,
                  bold: true,
                  border: [false, true, false, false]
                },
                {
                  text: this.sub_total + '\n',
                  bold: true,
                  margin: [0, 10, 0, 0],
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, true, false, false]
                }
              ],
              [
                {
                  text: 'Tax',
                  bold: true,
                  fontSize: 10,
                  border: [false, false, false, false]
                },
                {
                  text: this.tax + '\n',
                  bold: true,
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Delivery Fee',
                  bold: true,
                  fontSize: 10,
                  border: [false, false, false, false]
                },
                {
                  text: this.deliveryFee + '\n',
                  bold: true,
                  fontSize: 10,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Discount',
                  bold: true,
                  fontSize: 10,
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10]
                },
                {
                  text: this.discount + '\n',
                  bold: true,
                  fontSize: 10,
                  alignment: 'right',
                  margin: [0, 0, 0, 10],
                  border: [false, false, false, true]
                }
              ]
            ]
          }
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: [ '*', '*' ],
            body: [
              [
                {
                  text: 'Total',
                  bold: true,
                  margin: [0, 10, 0, 0],
                  fontSize: 11,
                  border: [false, true, false, false]
                },
                {
                  text: this.total + '\n',
                  bold: true,
                  fontSize: 11,
                  margin: [0, 10, 0, 0],
                  alignment: 'right',
                  border: [false, true, false, false]
                }
              ],
              [
                {
                  text: 'Cash',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false]
                },
                {
                  text: this.money + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false]
                }
              ],
              [
                {
                  text: 'Change',
                  fontSize: 11,
                  bold: true,
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                },
                {
                  text: this.changed + '\n',
                  bold: true,
                  fontSize: 11,
                  alignment: 'right',
                  border: [false, false, false, false],
                  margin: [0, 0, 0, 10]
                }
              ]
            ]
          }
        },
        {
          text: '********************Thank You!********************\n\n',
          fontSize: 11,
          alignment: 'center',
          bold: true
        },
        {
          text: this.dates,
          fontSize: 11,
          alignment: 'center'
        }
      ]
    }
    PDFTemplate.createPdf(docDefinition).open()
  }
}
