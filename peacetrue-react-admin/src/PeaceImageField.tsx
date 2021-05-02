import * as React from 'react';
import {ImageField, Labeled, useTranslate} from 'react-admin';
import {ImageFieldProps} from "ra-ui-materialui/lib/field/ImageField";
import {LabeledProps} from "ra-ui-materialui/lib/input/Labeled";
import {formatFileFieldProps} from "./PeaceFile";


export const PeaceImageField = (props: ImageFieldProps) => {
  return (
    <ImageField {...formatFileFieldProps(props)}/>
  );
};

export const PeaceLabeledImageField = ({label, ...rest}: Omit<LabeledProps, 'children'>) => {
  const translate = useTranslate();
  label = label || translate(`resources.${rest.resource}.fields.${rest.source}`);
  return (
    <Labeled label={label}>
      <PeaceImageField {...rest}/>
    </Labeled>
  );
}

export default {
  PeaceImageField,
  PeaceLabeledImageField
}
