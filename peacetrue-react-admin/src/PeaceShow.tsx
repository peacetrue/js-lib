import React, {ReactElement} from 'react';
import {Show, ShowProps} from "react-admin";
import PeaceShowActions from "./PeaceShowActions";

export const PeaceShow = (props: ShowProps & { children: ReactElement; }) => {
  console.info('PeaceShow:', props);
  const {actions = <PeaceShowActions/>, children, ...rest} = props;
  return (
    <Show actions={actions} {...rest} >
      {children}
    </Show>
  )
};

export default PeaceShow;
