import React, { Fragment,useEffect,useReducer,useState} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";


import { COLORS } from '../style_constants';
import { LocalMallIcon } from '../components/Icons';
import { FoodWrapper } from '../components/FoodWrapper';
import Skeleton from '@material-ui/lab/Skeleton';
import { FoodOrderDialog } from '../components/FoodOrderDialog';

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

//images
import MainLogo from '../images/logo.png';
import FoodImage from '../images/food-image.jpg';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between; //左右端に並ぶようにspace-betweenを使用する
  padding: 8px 32px;
`;
const BagIconWrapper = styled.div`
  padding-top: 24px;
`;
const ColoredBagIcon = styled(LocalMallIcon)`
  color: ${COLORS.MAIN};
`;

const MainLogoImage = styled.img`
  height: 90px;
`

const FoodsList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  margin: 16px;
`;

const submitOrder = () => {
    console.log('登録ボタンが押された！')
  }
// matchオブジェクトを受け取ってmatch.params.restaurantsIdと言う形でパラメータを抽出することができる
export const Foods = ({
    match
  }) => {
    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
    const initialState = {
        isOpenOrderDialog: false, //ここがTrueになったらモーダルが開く
        selectedFood: null,
        selectedFoodCount: 1,
    }
    const [state, setState] = useState(initialState);
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
           <HeaderWrapper>
        <Link to="/restaurants">
          <MainLogoImage src={MainLogo} alt="main logo" />
        </Link>
        <BagIconWrapper>
          <Link to="/orders">
            <ColoredBagIcon fontSize="large" />
          </Link>
        </BagIconWrapper>
      </HeaderWrapper>
      <FoodsList>
        {
          foodsState.fetchState === REQUEST_STATE.LOADING ?
            <Fragment>
              {
                [...Array(12).keys()].map(i =>
                  <ItemWrapper key={i}>
                    <Skeleton key={i} variant="rect" width={450} height={180} />
                  </ItemWrapper>
                )
              }
            </Fragment>
          :
            foodsState.foodsList.map(food =>
              <ItemWrapper key={food.id}>
                <FoodWrapper
                food={food}
                onClickFoodWrapper={
                    //フードのitemがクリックされたらsetState()が実行される
                    (food) => setState({
                    ...state,
                    isOpenOrderDialog: true,
                    selectedFood: food,
                    })
                }
                imageUrl={FoodImage}
                />
              </ItemWrapper>
            )
        }
      </FoodsList>
      {
          //&&より前の値がTrueの場合に&&より後の要素をレンダリングするようにJSXが認識する
          //以下のコードの場合、FoodOrderDialogがtruの場合にFoodOrderDialogコンポーネントをレンダリングしてくれるようになる
        state.isOpenOrderDialog &&
        <FoodOrderDialog
        isOpen={state.isOpenOrderDialog}
        food={state.selectedFood}
        countNumber={state.selectedFoodCount}
        onClickCountUp={() => setState({
          ...state,
          selectedFoodCount: state.selectedFoodCount + 1,
        })}
        onClickCountDown={() => setState({
          ...state,
          selectedFoodCount: state.selectedFoodCount - 1,
        })}
        // 先ほど作った関数を渡します
        onClickOrder={() => submitOrder()}
        // モーダルを閉じる時はすべてのstateを初期化する
        onClose={() => setState({
          ...state,
          isOpenOrderDialog: false,
          selectedFood: null,
          selectedFoodCount: 1,
        })}
      />
      }
      </Fragment>
    )
  }