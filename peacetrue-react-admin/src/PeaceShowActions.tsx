import {DeleteButton, EditButton, ListButton, ShowActionsProps, TopToolbar, usePermissions} from "react-admin";
import * as React from "react";

const PeaceShowActions = (props: ShowActionsProps) => {
  console.info("PeaceShowActions: ", props);
  const {basePath, data, resource, hasEdit, hasList, ...rest} = props;
  const {permissions} = usePermissions();
  console.info("PeaceShowActions.permissions: ", permissions);
  return (
    <TopToolbar>
      {hasList && <ListButton basePath={basePath}/>}
      {hasEdit && permissions && permissions.isManager &&
      <EditButton resource={resource} basePath={basePath} record={data}/>}
      {permissions && permissions.isManager &&
      <DeleteButton resource={resource} basePath={basePath} record={data} mutationMode={"pessimistic"}/>}
    </TopToolbar>
  );
};

export default PeaceShowActions;
