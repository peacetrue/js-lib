import React from 'react';
import { TransformData } from 'ra-core';
import { convertPropertyValue } from 'peacetrue-core';

/** 上传文件时文件格式 */
export type RaEditFile = {
  rawFile: File;
  src: string;
  title: string;
};

/** 展示文件时文件格式 */
export type RaShowFile = {
  value: string;
  src: string;
  title: string;
};

export function isShowFile(value: any) {
  return !!(value.value && value.src && value.title);
}

export function ShowFileConverter(item: any) {
  return isShowFile(item) ? item.value : item;
}

export function ShowFileConverters(value: any) {
  if (value instanceof Array) {
    return value.map(ShowFileConverter);
  } else {
    return ShowFileConverter(value);
  }
}

/** 将展示文件转换为文件值 */
export const ShowFileTransformData: TransformData = data => {
  return convertPropertyValue(data, (_name, value) =>
    ShowFileConverters(value)
  );
};
