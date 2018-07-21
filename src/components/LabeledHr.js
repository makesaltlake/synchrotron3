import React, { Component } from 'react';
import classNames from 'classnames';

export default function LabeledHr({short = false, children}) {
  return <div className={classNames('labeled-hr', {'labeled-hr-short': short})}>
    <hr/>
    <div>{children}</div>
    <hr/>
  </div>
}
