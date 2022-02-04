import React, { Fragment,useEffect,useReducer } from 'react';
import { fetchLineFoods } from '../apis/line_foods';
import { postOrder } from '../apis/orders';
import styled from 'styled-components';
import { Link } from "react-router-dom";

//components
import { OrderDetailItem } from '../components/OrderDetailItem';
import { OrderButton } from '../components/Buttons/OrderButton';
import CircularProgress from '@material-ui/core/CircularProgress';


// images
import MainLogo from '../images/logo.png';

//Reducer
import {
    initialState,
    lineFoodsActionTyps,
    lineFoodsReducer,
  } from '../reducers/lineFoods';

  // constants
import { REQUEST_STATE } from '../constants';

//Orders.jsxで使用するレイアウトをstyled-componentsでいくつか定義
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8px 32px;
`;

const MainLogoImage = styled.img`
  height: 90px;
`;

const OrderListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const OrderItemWrapper = styled.div`
  margin-bottom: 50px;
`;

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

  const postLineFoods = () => {
    dispatch({ type: lineFoodsActionTyps.POSTING });
    postOrder({
    //state.lineFoodsSummaryには取得した仮注文データが入っている
    //そsてこの中身には複数の仮注文データをまとめたものが入っている
      line_food_ids: state.lineFoodsSummary.line_food_ids,
    }).then(() => {
      dispatch({ type: lineFoodsActionTyps.POST_SUCCESS });
    });
    window.location.reload();
  };

  //注文ボタン
  //リクエストの状態(state.postState)に応じて文言を変える
  const orderButtonLabel = () => {
        switch (state.postState) {
        case REQUEST_STATE.LOADING:
            return '注文中...';
        case REQUEST_STATE.OK:
            return '注文が完了しました！';
        default:
            return '注文を確定する';
        }
    };

  return (
    <Fragment>
       <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
      </HeaderWrapper>
      <OrderListWrapper>
          <div>
            <OrderItemWrapper>
              {
                // APIローディング中はくるくる回るローディングコンポーネントを表示
                state.fetchState === REQUEST_STATE.LOADING ?
                  <CircularProgress />
                :
                  state.lineFoodsSummary &&
                    <OrderDetailItem
                      restaurantFee={state.lineFoodsSummary.restaurant.fee}
                      restaurantName={state.lineFoodsSummary.restaurant.name}
                      restaurantId={state.lineFoodsSummary.restaurant.id}
                      timeRequired={state.lineFoodsSummary.restaurant.time_required}
                      foodCount={state.lineFoodsSummary.count}
                      price={state.lineFoodsSummary.amount}
                    />
              }
            </OrderItemWrapper>
          <div>
            {
              state.fetchState === REQUEST_STATE.OK && state.lineFoodsSummary &&
                <OrderButton
                  onClick={() => postLineFoods()}
                  //OrderButtonコンポーネントには注文登録APIを呼ぶpostLineFoods()を渡す
                  //APIを呼んでいる/成功した場合にはボタンをdisableにしたいので以下のコードにしている
                  disabled={state.postState === REQUEST_STATE.LOADING || state.postState === REQUEST_STATE.OK}
                >
                  {orderButtonLabel()}
                </OrderButton>
            }
            {
              state.fetchState === REQUEST_STATE.OK && !(state.lineFoodsSummary) &&
                <p>
                  注文予定の商品はありません。
                </p>
            }
          </div>
        </div>
      </OrderListWrapper>
    </Fragment>
  )
}
