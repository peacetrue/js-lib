import * as React from "react";
import {DeleteButton, DeleteButtonProps} from "react-admin";

/** default to undoable, this to confirm */
export const PeaceDeleteButton = (props: DeleteButtonProps) => {
  const {mutationMode = 'pessimistic', ...rest} = props;
  return (<DeleteButton mutationMode={mutationMode} {...rest}/>);
};

export default PeaceDeleteButton;
