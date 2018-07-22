import React, { Component } from 'react';

import { Button } from 'reactstrap';

import BreadcrumbAction from './BreadcrumbAction';

export default function BreadcrumbButton(props) {
  return <BreadcrumbAction>
    <Button size="sm" {...props}/>
  </BreadcrumbAction>;
}
