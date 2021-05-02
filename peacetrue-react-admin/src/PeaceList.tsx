import React, {ReactElement} from 'react';
import {List, ListProps} from "react-admin";
import {PeaceBulkActionButtons} from "./PeaceBulkActionButtons";

export const PeaceList = (props: ListProps & { children: ReactElement; }) => {
  console.info('PeaceList:', props);
  const {
    children,
    bulkActionButtons = <PeaceBulkActionButtons/>,
    sort = {field: 'createdTime', order: 'DESC'},
    ...rest
  } = props;
  return (
    <List bulkActionButtons={bulkActionButtons}
          sort={sort}
          {...rest}
    >
      {children}
    </List>
  )
};

export default PeaceList;
