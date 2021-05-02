import React, {ReactElement} from 'react';
import {Edit, EditProps} from "react-admin";

export const PeaceEdit = (props: EditProps & { children: ReactElement; }) => {
  console.info('PeaceEdit:', props);
  const {
    children,
    undoable = false,
    ...rest
  } = props;
  return (
    <Edit undoable={undoable} {...rest}>
      {children}
    </Edit>
  )
};

export default PeaceEdit;
