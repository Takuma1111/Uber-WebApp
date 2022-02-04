//注文するAPI
import axios from 'axios';
import { orders } from '../urls/index'

//postOrderは引数を一つ取り、{ line_food_ids: [1,2,3] }のようなオブジェクトを受け取る
//こうすることで一つの店舗で登録された"1つ以上の"仮注文のデータをまとめて注文データに紐づけることができる
export const postOrder = (params) => {
  return axios.post(orders,
    {
      line_food_ids: params.line_food_ids
    },
  )
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
