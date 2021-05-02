import * as React from 'react';
import {FileField, Labeled, useTranslate} from 'react-admin';
import {FileFieldProps} from "ra-ui-materialui/lib/field/FileField";
import {LabeledProps} from "ra-ui-materialui/lib/input/Labeled";
import {formatFileFieldProps} from "./PeaceFile";

export const PeaceFileField = (props: FileFieldProps) => {
  return (
    <FileField {...formatFileFieldProps(props)}/>
  );
};

export const PeaceLabeledFileField = ({label, ...rest}: Omit<LabeledProps, 'children'>) => {
  const translate = useTranslate();
  label = label || translate(`resources.${rest.resource}.fields.${rest.source}`);
  return (
    <Labeled label={label}>
      <PeaceFileField {...rest}/>
    </Labeled>
  );
}
