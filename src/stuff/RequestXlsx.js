import XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import moment from 'moment'

export default async function RequestXlsx(socket, event, filters, dispatch) {
  function logMsg(val) {
    dispatch({
      type: 'xlsxLog',
      val
    })
  }
  socket.on('xlsxLog', logMsg)
  const sheets = await socket.asyncSafeEmit(event, {
    xlsx: true,
    filters,
    timeout: 240000
  })
  dispatch({
    type: 'xlsxLog',
    val: null
  })
  socket.off('xlsxLog', logMsg)
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
  const workbook = {
    SheetNames: Object.keys(sheets),
    Sheets: sheets
  }
  for (const sheetName in sheets) {
    const sorted = sheets[sheetName].sort((a, b) => {
      if (a['Фамилия'] > b['Фамилия']) return 1
      if (a['Фамилия'] < b['Фамилия']) return -1

      if (a['Имя'] > b['Имя']) return 1
      if (a['Имя'] < b['Имя']) return -1

      if (a['Отчество'] > b['Отчество']) return 1
      if (a['Отчество'] < b['Отчество']) return -1

      return 0
    })
    const ws = XLSX.utils.json_to_sheet(sorted, {})
    ws['!cols'] = [
      { wch: 9 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 15 }, // Страна
      { wch: 20 },
      { wch: 15 }, // city
      { wch: 30 }, // page
      { wch: 22 }, // dur
      { wch: 22 } // dur
    ]
    sheets[sheetName] = ws
  }
  const wbout = XLSX.write(workbook, wopts)
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `Durations${moment().format('YYYYMMDD_HHmm')}.xlsx`)
}
