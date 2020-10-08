import React, { ReactElement } from 'react';
import { Tooltip } from '@material-ui/core';

interface InfoWrapperProps {
  readonly children: ReactElement
  readonly title: string
}

export default function InfoWrapper({ children, title }: InfoWrapperProps) {
  return (
    <Tooltip title={title}
             enterTouchDelay={0}
             placement="top">
      {children}
    </Tooltip>
  )
}
