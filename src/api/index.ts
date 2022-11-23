import request from '../utils/axios'
export function getDataone(){
  return request.get('/v2-course/v2/courses',{},{})
}

export function getPostData(){
  return request.post('/v2-course/v2/courses',{},{})
}