import React, { Fragment,useEffect,useReducer } from 'react';


// reducers
import {
//A as BとしているとAで定義されているmoduleをBとしてimportすることができる
//つまりinitialStateを別名で表現したいから使用している
  initialState as foodsInitialState, 
  foodsActionTyps,
  foodsReducer,
} from '../reducers/foods';

// apis
import { fetchFoods } from '../apis/foods';

// constants
import { REQUEST_STATE } from '../constants';

// matchオブジェクトを受け取ってmatch.params.restaurantsIdと言う形でパラメータを抽出することができる
export const Foods = ({
    match
  }) => {
    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
    //一度だけAPIを叩き、その返り値をreducerを通してstateにセットしている
    useEffect(() => {
        dispatch({ type: foodsActionTyps.FETCHING });
        fetchFoods(match.params.restaurantsId)
            .then((data) => {
        dispatch({
          type: foodsActionTyps.FETCH_SUCCESS,
          payload: {
            foods: data.foods
          }
        });
      })
    }, [])
  
    return (
      <Fragment>
           {
        foodsState.fetchState === REQUEST_STATE.LOADING ?
          <Fragment>
            <p>
              ロード中...
            </p>
          </Fragment>
        :
          foodsState.foodsList.map(food =>
            <div key={food.id}>
              {food.name}
            </div>
          )
      }
      </Fragment>
    )
  }