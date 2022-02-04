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


  //lineFoodsはURL文字列でhttp://localhost:3000/api/v1/line_foodsを指している
  //axios.get()でGETリクエストを投げている。この返り値はthen...catchで成功/失敗した場合でレスポンスを変えている
export const fetchLineFoods = () => {
    return axios.get(lineFoods)
    .then(res => {
      return res.data
    })
    .catch((e) => { throw e; })
  };
  