import { REQUEST_STATE } from '../constants';

//APIの状態を表すfetchStateと取得したフード一覧が格納されるfoodsList
export const initialState = {
  fetchState: REQUEST_STATE.INITIAL,
  foodsList: [],
};

//取得中を表すFETCHINGと取得成功した状態のFETCH_SUCCESSの二つを定義
export const foodsActionTyps = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS'
}

//foodsActionTypesによってstateを2種類返すようにしている
export const foodsReducer = (state, action) => {
  switch (action.type) {
    case foodsActionTyps.FETCHING:
        //ローディング中
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case foodsActionTyps.FETCH_SUCCESS:
        //成功した場合
      return {
        fetchState: REQUEST_STATE.OK,
        foodsList: action.payload.foods,
      };
    default:
      throw new Error();
  }
}
