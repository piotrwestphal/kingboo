import React, { ReactElement } from 'react';
import { Tooltip } from '@material-ui/core';

interface InfoWrapperProps {
  readonly children: ReactElement
  readonly title: string
}

export default function InfoWrapper({ children, title }: InfoWrapperProps) {
  return (
    <Tooltip enterTouchDelay={100} title={title} placement="top">
      {children}
    </Tooltip>
  )
}
