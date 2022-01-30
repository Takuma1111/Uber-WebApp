import React, { Fragment } from 'react';

// matchオブジェクトを受け取ってmatch.params.restaurantsIdと言う形でパラメータを抽出することができる
export const Foods = ({
    match
  }) => {
    return (
      <Fragment>
        フード一覧
        <p>
        restaurantsIdは {match.params.restaurantsId} です
        </p>
      </Fragment>
    )
}
