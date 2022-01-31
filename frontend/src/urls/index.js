// サーバーサイドで定義したURL文字列を返す定数をいくつか設定している
const DEFAULT_API_LOCALHOST = 'http://localhost:3001/api/v1'

export const restaurantsIndex = `${DEFAULT_API_LOCALHOST}/restaurants`
//引数を受け取ってそれを文字列と結合させ、返り値として返している
export const foodsIndex = (restaurantId) =>
  `${DEFAULT_API_LOCALHOST}/restaurants/${restaurantId}/foods`
export const lineFoods = `${DEFAULT_API_LOCALHOST}/line_foods`;
export const lineFoodsReplace = `${DEFAULT_API_LOCALHOST}/line_foods/replace`;
export const orders = `${DEFAULT_API_LOCALHOST}/orders`;
