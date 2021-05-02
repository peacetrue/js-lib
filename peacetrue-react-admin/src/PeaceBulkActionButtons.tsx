import * as React from "react";
import PeaceBulkDeleteButton from "./PeaceBulkDeleteButton";

/** default to undoable, this to confirm */
export const PeaceBulkActionButtons = (props: any) => {
  return (
    <React.Fragment>
      <PeaceBulkDeleteButton {...props}/>
    </React.Fragment>
  );
}

export default PeaceBulkActionButtons;
