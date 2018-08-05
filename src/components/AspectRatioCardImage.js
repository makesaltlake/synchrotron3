import React, { Component } from 'react';

export default function AspectRatioCardImage({src, ...props}) {
  let style = {
    width: '100%',
    paddingBottom: '68%', // 16:9. should make this configurable
    background: `url('${src}') no-repeat`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center'
  };

  return <div className="card-img-top" style={style}/>
}
