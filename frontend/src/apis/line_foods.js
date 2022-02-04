//lineFoodsは仮注文のAPIのURL文字列
//そのURLに対してPOSTリクエストを送るのでaxios.post()を使用する

import axios from 'axios';
import { lineFoods,lineFoodsReplace } from '../urls/index'

//引数にリクエスト先のURL文字列
export const postLineFoods =(params) => {
  return axios.post(lineFoods,
    {
      food_id: params.foodId,
      count: params.count,
    }
  )
  .then(res => {
    return res.data
  })
  .catch((e) => { throw e; }) //not_acceptableが返ってきた場合はこの中に入る
};
//上記のエラーレスポンスの中からe.response.statusとすることでそのエラーのHTTPステータスコード(200や404など)を
//取得することができるぽい


//置き換えAPIを呼ぶ関数
export const replaceLineFoods = (params) => {
    return axios.put(lineFoodsReplace,
      {
        food_id: params.foodId,
        count: params.count,
      }
    )
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
  };