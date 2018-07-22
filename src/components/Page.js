import React, { Component } from 'react';

import { Breadcrumb as BootstrapBreadcrumb, BreadcrumbItem } from 'reactstrap';

import PageHeader from './PageHeader';
import Breadcrumb from './Breadcrumb';
import BreadcrumbAction from './BreadcrumbAction';
import BreadcrumbButton from './BreadcrumbButton';

export default function Page({title, form, children}) {
  // I may come to regret this bit of hackery...
  children = React.Children.toArray(children);
  let breadcrumbs = children.filter(child => child.type === Breadcrumb);
  let breadcrumbActions = children.filter(child => child.type === BreadcrumbAction || child.type === BreadcrumbButton);
  children = children.filter(child => child.type !== Breadcrumb && child.type !== BreadcrumbAction && child.type !== BreadcrumbButton);
  console.log('breadcrumbs:', breadcrumbs, 'and actions:', breadcrumbActions, 'and children:', children);

  if (form) {
    children = <div className="page-form-wrapper"><div className="page-form">{children}</div></div>;
  }

  return <div className='page-default'>
    {(breadcrumbs.length > 0 || breadcrumbActions.length > 0) && <BootstrapBreadcrumb>
      {breadcrumbs}
      <li className='breadcrumb-spacer'/>
      {breadcrumbActions}
    </BootstrapBreadcrumb>}
    <PageHeader>{title}</PageHeader>
    {children}
  </div>
}
