import { get, post } from './index'

// 获取城市列表
export function getCity() {
  return get('/bricks-api/city-info/getAsynCity')
}

// 获取画砖列表信息
export function getStoneList(data) {
  return post('/bricks-api/city-info/getBrickIdsByCityId',data)
}

// 获取画砖具体信息
export function getStone(data) {
  return post('/bricks-api/bricks/message',data)
}
