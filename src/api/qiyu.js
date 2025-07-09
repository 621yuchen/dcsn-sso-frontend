import request from '../utils/request'

// 查询列表
export function userProfile(query) {
  return request.get('/qiyu/userProfile/'+query)
}
export function queryCrmInfo(query) {
  return request.get('/qiyu/queryCrmInfo/'+query)
}
// 查询列表
export function incident(query) {
  return request.get('/qiyu/incident/'+query)
}
// 查询列表详情
export function incidentInfo(query) {
  return request.post('/qiyu/incidentInfo',query)
}
// 查询用户信息
export function getSysUser(query) {
  return request.get('/qiyu/getSysUser/'+query )
}

export function getGroup(query) {
  return request.get('/qiyu/getGroup', query)
}

export function serviceOffering(query) {
  return request.get('/qiyu/serviceOffering', query)
}

export function getTO(query) {
  return request.get('/qiyu/getTO/'+ query)
}
export function addIncident(query) {
  return request.post('/qiyu/incident',query)
}