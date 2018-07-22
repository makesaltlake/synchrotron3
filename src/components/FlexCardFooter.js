import React, { Component } from 'react';

import classNames from 'classnames';

import { CardFooter } from 'reactstrap';

export default function FlexCardFooter({className = null, border = false, children, ...props}) {
  return <CardFooter className={classNames(className, 'flex-card-footer', {'flex-card-footer-no-border': !border})} {...props}>
    <div className="flex-card-footer-container">
      {children}
    </div>
  </CardFooter>
}
