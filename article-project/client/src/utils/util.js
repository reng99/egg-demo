export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : (hour <= 11 ? '上午好' : (hour <= 13 ? '中午好' : (hour < 20 ? '下午好' : '晚上好')))
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor((Math.random() * arr.length))
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}

/**
 * 校验用户是否登录超时
 * @returns {boolean}
 */
export function loginTimeOut () {
  let user = localStorage.getItem('user')
  let loginTime = localStorage.getItem('loginTime')
  let time = new Date().getTime()
  // 帐号不存在
  if (!user) {
    return true
  }
  // 登录信息是否已经超时（30分钟）
  if (time - loginTime > 30 * 60 * 1000) {
    return true
  }

  localStorage.setItem('loginTime', time)
  return false
}

/**
 * 校验FormData是否有值
 * @param event
 * @param formData
 * @returns {boolean}
 */
export function checkFormData (event, formData) {
  let flag = false
  formData.forEach(() => {
    flag = true
  })
  if (!flag) {
    event.$message.error(`请输入筛选条件`)
  }
  return flag
}

/**
 * 根据columns获取excel导出表头
 * @param columns
 * @returns {Array}
 */
export function exportTableHead (columns) {
  let tableHead = {}
  columns.forEach((column) => {
    tableHead[column.key] = column.title
  })
  return tableHead
}

/**
 * 根据formData转换为json字符串对象
 * @param columns
 * @returns {Array}
 */
export function exporteQueryParam (formData) {
  let queryParam = {}
  formData.forEach((value, key) => {
    queryParam[key] = value
  })
  return queryParam
}

/**
 * 页面直接导出文件参数组装
 * @param tableColumns
 * @param data
 * @param fileName
 * @returns {{title: string[], key: string[], data: *, autoWidth: boolean, filename: *}}
 */
export function getExcelParams (tableColumns, statementData, fileName) {
  let titles = []
  let keys = []
  tableColumns.forEach((column) => {
    titles.push(column.title)
    keys.push(column.key)
  })
  const params = {
    title: titles,
    key: keys,
    data: statementData,
    autoWidth: true,
    filename: fileName
  }
  return params
}

/**
 * 计算表格高度
 * @param event
 * @param dataSize
 * @param bodySize
 * @returns {}
 */
export function getTableHeight (event, dataSize, bodySize, type) {
  let size = {}
  if (dataSize > 10) {
    let height = window.innerHeight - 54 - 54 - 24 - event.$refs.queryRow.offsetHeight - 32 - 56 - 6
    if (bodySize === 'default') {
      height -= 24
    }
    if (type === 2) {
      height -= 32
    }
    size.y = height
  }
  return size
}

/**
 * 创建路由对象
 * @returns {boolean}
 * @param data
 */
export const createRoute = (data) => {
  let path = data.url;
  if (data.params) {
      path += '/' + data.params;
  }
  let filePath = data.url;
  if (data.file_path) {
      filePath = data.file_path;
  }
  return {
      name: data.id,
      path: path,
      component: resolve => require(['@/views/' + filePath], resolve),
      meta: {model: data.pid, info: data},
  };
};

export const showLocalTime = () => {
  //获取当前时间
  let o = new Date()
  let time = '' + o.getFullYear() + 
             '-' + (o.getMonth() + 1 < 10 ? '0' + (o.getMonth() + 1) : o.getMonth()) + 
             '-' + (o.getDate() < 10 ? '0' + o.getDate() : o.getDate()) + 
             ' ' + (o.getHours() < 10 ? '0' + o.getHours() : o.getHours()) +
             ':' + (o.getMinutes() < 10 ? '0' + o.getMinutes() : o.getMinutes()) +
             ':' + (o.getSeconds() < 10 ? '0' + o.getSeconds() : o.getSeconds())
  return time
}

