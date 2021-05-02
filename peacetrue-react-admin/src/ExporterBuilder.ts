import jsonExport from "jsonexport/dist";

import {Exporter} from "ra-core";
import {downloadCSV} from 'react-admin';
import {fromPartial, values} from "peacetrue-core";

type Resource = {
  name: string,
  fields: {
    [key: string]: string
  },
  [key: string]: any
}

export function ExporterBuilder(resources: Resource, headerFields?: string[]): Exporter {
  let fields = resources.fields;
  return (records) => {
    let record = records[0];
    if (headerFields) {
      records = records.map((item: Record<string, any>) => fromPartial(item, headerFields as string[]));
    } else {
      headerFields = Object.keys(record);
    }
    let rename = values(fields, headerFields);
    jsonExport(records, {
      headers: headerFields,
      rename: rename
    }, (_err, csv) => {
      downloadCSV('\uFEFF' + csv, resources.name);
    });
  }
}

export default ExporterBuilder;
