import React, { Fragment,useEffect,useReducer } from 'react';
import { fetchLineFoods } from '../apis/line_foods';

//Reducer
import {
    initialState,
    lineFoodsActionTyps,
    lineFoodsReducer,
  } from '../reducers/lineFoods';

//APIの取得状況をstateにセットしつつ、成功した場合はそのデータをstateに保持することができる
export const Orders = () => {
    const [state, dispatch] = useReducer(lineFoodsReducer, initialState);
    useEffect(() => {
        dispatch({ type: lineFoodsActionTyps.FETCHING });
        fetchLineFoods()
          .then((data) =>
            dispatch({
              type: lineFoodsActionTyps.FETCH_SUCCESS,
              payload: {
                lineFoodsSummary: data
              }
            })
          )
        .catch((e) => console.log(e));
    },[]);
  return (
    <Fragment>
      注文画面
    </Fragment>
  )
}
