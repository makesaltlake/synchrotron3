import React, { Component } from 'react';

import { Link } from '@reach/router';

import { BreadcrumbItem } from 'reactstrap';

export default function Breadcrumb({to, href, children}) {
  if (to) {
    return <BreadcrumbItem><Link to={to}>{children}</Link></BreadcrumbItem>;
  } else if (href) {
    return <BreadcrumbItem><a href={href}>{children}</a></BreadcrumbItem>;
  } else {
    return <BreadcrumbItem active>{children}</BreadcrumbItem>;
  }
}
