import * as React from 'react';
import {FileFieldProps} from "ra-ui-materialui/lib/field/FileField";
import {DataProvider, Record as RaRecord} from "react-admin";
import {string} from "../../peacetrue-yup/dist/local/zh-cn";

type Optional<T> = T | undefined;


/*--------------文件上传-----------*/
/** 前端文件信息 */
export type FrontFile = {
  title: string
  src: string,
  value?: string,
  rawFile?: File,
  [key: string]: any
};


/** 前端文件参数 */
export type FileParam = {
  /** 字段名 */
  name: string,
  single: boolean
  relativePath?: string,
  fileName?: string,
  baseIndex?: number,
  files?: Optional<File | Array<File>>,
  [key: string]: any
};

export const FileParamBuilder = (name: string,
                                 relativePath: string,
                                 single: boolean = true,
                                 fileName?: string,
                                 baseIndex?: number): FileParam => {
  return {name, single, relativePath, fileName, baseIndex};
}

export const fileTransformBuilder = (dataProvider: DataProvider, fileParams: Array<FileParam>) => {
  return (record: RaRecord) => {
    console.info("fileParams: ", fileParams);
    console.info("transform.record:", record);
    //一个表单，多个文件字段
    fileParams = fileParams
      .map(fileParam => extractFiles(record, fileParam))//可选的文件字段，可能返回空
      .map((files, index) => ({...fileParams[index], files}))
      .filter(fileParam => !isEmpty(fileParam.files))
    ;
    console.info("fileParams with files: ", fileParams);
    //没有文件，无需上传
    if (fileParams.length === 0) return record;

    //多文件上传时，设置 baseIndex
    fileParams
      .filter(item => item.fileName)
      .filter(item => !item.single)
      //.forEach(item => item.baseIndex = data[item.name].findIndex(item => Boolean(extractFile(item))))
      .forEach((item) => {
        let values = record[item.name] as Array<FrontFile>;
        let files = item.files as Array<File>;
        if (values.length === files.length) return;
        item.baseIndex = parseInt(values[values.length - files.length - 1].title.replace(/.*default-(\d+).*/, "$1")) + 1;
      });
    console.info("fileParams after set baseIndex: ", fileParams);
    let promises = fileParams
      .map(fileParam => FileFormDataBuilder(fileParam))
      .map(formData => dataProvider.create('files', {data: formData}))
    ;
    console.info("promises: ", promises);
    return Promise.all(promises)
      .then(responses => {
        console.info("responses:", responses);
        if (!responses || !responses.length) return record;
        let transformedData = {...record};
        responses.forEach((response, index) => {
          if (!response) return;//会话超时，此时无结果
          let files = response.data, fileParam = fileParams[index];
          if (files instanceof Array) {
            let values = record[fileParam.name] as Array<any>, newIndex = 0;
            //if (values.length > 0) newIndex = parseInt(values[values.length - responses.length - 1].title.replace(/.*default-(\d+).*/, "$1")) + 1;
            values.forEach((value: FrontFile, index) => {
              if (value.rawFile) values[index] = files[newIndex++].id;
              else values[index] = value.value;
            });
            transformedData[fileParam.name] = values.join(',');
          } else {
            transformedData[fileParam.name] = files.id;
          }
        });
        return transformedData;
      })
  };
}

type FormValueRaw = string | Blob;
type FormValueFile = { rawFile: File, [key: string]: any };

export const FormDataAppender = (formData: FormData, name: string, value: FormValueRaw | FormValueFile) => {
  if (value instanceof Blob) {
    formData.append(name, value, (value as File).name);
  } else if (typeof value === 'string') {
    formData.append(name, value);
  } else {
    FormDataAppender(formData, name, value.rawFile);
  }
  return formData;
}

export const FormDataBuilder = (data: Record<string, any>, formData?: FormData): FormData => {
  const localFormData = formData || new FormData();
  Object.keys(data).forEach((name) => {
    const value = data[name];
    if (value instanceof Array) {
      value.forEach(item => FormDataAppender(localFormData, name, item));
    } else {
      FormDataAppender(localFormData, name, value);
    }
  });
  return localFormData;
}

/**@deprecated*/
export const formDataBuilder = FormDataBuilder;

export const FileFormDataBuilder = (fileParam: Partial<FileParam>) => {
  console.info("FileFormDataBuilder.fileParam:", fileParam);
  const {name = "filePart", single = true, relativePath, fileName, baseIndex, files} = fileParam;
  let formData = new FormData();
  relativePath && formData.append('relativePath', relativePath);
  fileName && formData.append('fileName', fileName);
  baseIndex !== undefined && formData.append('baseIndex', baseIndex.toString());

  if (files instanceof Array) {
    files.forEach((item: File) => FormDataAppender(formData, name, item));
  } else if (files) {
    formData.append(name, files, files.name);
  }
  formData.append("_query", JSON.stringify({'type': single ? 'single' : 'multiple'}));
  return formData;
}

/**@deprecated*/
export const fileFormDataBuilder = FileFormDataBuilder;

/** replaceFileName('a.png','b')='b.png' */
/** replaceFileName('a.png','b',1)='b-1.png' */
export const replaceFileName = (source: string, target: string, index: number) => {
  if (!target) return source;
  if (index) target = `${target}-${index}`;
  return `${target}.${source.split('.').pop()}`
}


export const extractFiles = (data: Record<string, any>, fileParam: FileParam): Optional<File | Array<File>> => {
  console.info("extractFiles: ", data, fileParam);
  let value = data[fileParam.name];
  //nothing change: "teacher/pc-photo/865-手机(8).jpeg,teacher/pc-photo/976-手机(13).png"
  if (!value || typeof value === 'string') return undefined;
  return value instanceof Array
    ? value.map(extractFile).filter(item => !!item) as Array<File>
    : extractFile(value)
    ;
}

export const extractFile = (value: any): Optional<File> => {
  return value.rawFile;
}

export const isEmpty = (value: any) => {
  return !value ? true : value.length === 0;
}

export const buildUrl = (path: string, dispositionType: string) => {
  if (path.startsWith('http')) return encodeURI(path);
  return `${process.env.REACT_APP_BASE_URL}/files/${dispositionType}/${encodeURI(path)}`;
};

export const buildPreviewUrl = (path: string) => buildUrl(path, 'inline');
export const buildDownloadUrl = (path: string) => buildUrl(path, 'attachment');

export const filePathFormatter = (item: string): FrontFile => {
  console.info("filePathFormatter:", item);
  return {
    value: item,
    src: buildDownloadUrl(item),
    title: item.substring(item.lastIndexOf('/') + 1)
  };
}

export const singleInputFormatter = (data: any) => {
  if (typeof data === 'string') {
    //multiple path: teacher/photo1.png,teacher/photo2.png
    return filePathFormatter(data);
  }
  //File(name=photo.png,path=photo.png)
  return data;
}

export const multipleInputFormatter = (data: any) => {
  if (typeof data === 'string') {
    //multiple path: teacher/photo1.png,teacher/photo2.png
    data = data.split(',');
  }
  console.info('multipleInputFormatter: ', data);
  data = data.map((item: any) => singleInputFormatter(item))
  //File(name=photo.png,path=photo.png)
  return data;
}


/*------文件展示--------*/
/** 后端文件信息 */
export type BackFile = {
  name: string;
  url: string;
  [rest: string]: any
};

/** http://host:port/path/name.png */
export function toBackFile(value: string): BackFile {
  return {
    name: value.split("/").pop() || 'undefined',
    // url: `${value}?dispositionType=inline`,
    url: value,
  }
}

export function toBackFiles(values: Array<string>): Array<BackFile> {
  return values.map(item => toBackFile(item));
}

export function formatFileFieldProps(props: FileFieldProps): FileFieldProps {
  let {source, src, title = 'name', target = '_blank', record, ...rest} = props;
  if (record == null || source == null) return {source, src, title, record, target, ...rest};

  let value = record[source];
  if (value instanceof Array) {
    record = {id: record.id, [source]: toBackFiles(value)};
    src = 'url';
  } else {
    record = {id: record.id, ...toBackFile(value)};
    source = 'url';
  }
  return {source, src, title, record, target, ...rest};
}

/*
export const LabeledBuilder = (BaseComponent: ComponentType) => {
  let LabeledBaseComponent: typeof Labeled = ({label, translate, ...rest}: LabeledProps) => {
    debugger
    label = label || translate(`resources.${rest.resource}.fields.${rest.source}`);
    return (
      <Labeled label={label}>
        <BaseComponent {...rest}/>
      </Labeled>
    );
  };
  return withTranslate(LabeledBaseComponent)
}
export const PeaceLabeledFileField2 = LabeledBuilder(PeaceFileField);
*/
