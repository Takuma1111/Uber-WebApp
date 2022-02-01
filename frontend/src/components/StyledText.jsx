//複数コンポーネントから共通で使用される「style-componentsで定義したテキストスタイル」を
//定義。

import styled from 'styled-components';
import { COLORS, FONT_SIZE } from '../style_constants';

//SubTextを定義
//これをimportして使用することでサブテキスト(文字が少し薄く、小さい)
//スタイルをどのコンポーネントでも使える
export const SubText = styled.p`
  color: ${COLORS.SUB_TEXT};
  font-size: ${FONT_SIZE.BODY2};
`;
