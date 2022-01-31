import axios from 'axios';

//URL文字列を返す関数をimport
import { foodsIndex } from '../urls/index'

export const fetchFoods =(restaurantId) => {
  return axios.get(foodsIndex(restaurantId))
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
