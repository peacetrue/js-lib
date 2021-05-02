import {TransformData} from "ra-core";

const Options = {
  format(value: string) {
    console.info('RichTextInput format:', value);
    let start = PeaceRichTextInput.editorStart, end = PeaceRichTextInput.editorEnd;
    if (value && value.startsWith(start) && value.endsWith(end)) {
      return value;
    }
    return `${start}${value || ''}${end}`;
  },
  parse(value: string) {
    console.info('RichTextInput parse:', value);
    let start = PeaceRichTextInput.editorStart, end = PeaceRichTextInput.editorEnd;
    if (value && value.startsWith(start) && value.endsWith(end)) {
      return value.substr(start.length, value.length - end.length);
    }
    return value;
  },
  toolbar: [
    [{header: [1, 2, 3, 4, 5, 6, false]}],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons

    // ['blockquote', 'code-block'],
    // [{'header': 1}, {'header': 2}],               // custom button values
    [{list: 'ordered'}, {list: 'bullet'}],
    // [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{indent: '-1'}, {indent: '+1'}], // outdent/indent

    // [{'direction': 'rtl'}],                         // text direction
    [{size: ['small', false, 'large', 'huge']}], // custom dropdown

    [{color: []}, {background: []}], // dropdown with defaults from theme
    // [{'font': []}],
    [{align: []}],
    ['link', 'image'], //'video'

    ['clean'], // remove formatting button
  ],
};

export const PeaceRichTextInput = {
  editorStart: '<div class="container"><div class="ql-editor">',
  editorEnd: '</div></div>',
  options: Options,
  buildTransformData(field: string): TransformData {
    return (data: any) => {
      return {...data, [field]: Options.format(data[field])};
    };
  },
};

export default PeaceRichTextInput;
