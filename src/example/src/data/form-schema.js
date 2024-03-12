export const SIMPLEFORM = {
  column: 1,
  gutter: 8,
  props: {
    layout: "vertical",
    labelAlign: "left",
    autoLabelWidth: true
  },
  fields: [{
    type: "input",
    field: "name",
    title: "姓名",
    value: "QQ",
    show: true,
    props: {
      rules: [{
        required: true,
        message: "名称为必填项"
      },
      {
        validator: (value, callback) => {
          console.log(value);
          if (value === "QQ") {
            callback("名字不能为只因");
          }
        },
        trigger: "blur",
      },
      ],
    },
  },
  {
    type: "slider",
    field: "height",
    title: "身高(cm)",
    value: 170,
    props: {
      max: 200
    },
  },
  {
    type: "input-number",
    field: "experience",
    title: "工作时长(年)",
    props: {
      setp: 0.5,
      precision: 1,
      max: 2.5,
      min: 0,
      rules: [{
        required: true,
        message: '工作时长为必填项'
      },
      {
        validator: (value, callback) => {
          if (value !== 2.5) {
            callback('工作时长必须大于两年半！')
          }
        }
      }
      ]
    },
  },


  {
    type: "rate",
    field: "rate",
    title: "评分",
    value: 10,
    props: {
      rules: [{
        required: true,
        message: '评分必选'
      }, {
        validator: (value, callback) => {
          if (value < 5) {
            callback("评分不能低于5颗星");
          }
        },
        trigger: "blur",
      },]
    },
  },

  {
    type: "form-item",
    field: "childItem",
    title: "嵌套表单",
    value: 10,
    props: {},
    gutter: 24,
    children: {
      items: [
        {
          type: "rate",
          field: "rate2",
          title: "评分",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '评分必选'
            }, {
              validator: (value, callback) => {
                if (value < 5) {
                  callback("评分不能低于5颗星");
                }
              },
              trigger: "blur",
            },]
          },
        },
        {
          type: "date-picker",
          field: "datepicker",
          title: "日期",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '日期必选'
            }]
          },
        },
        {
          type: "tree-select",
          field: "treeselect",
          title: "选择树",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '选择树'
            }],
          }
        },
        {
          type: "cascader",
          field: "cascader",
          title: "级联选择器",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '级联选择器必选'
            }]
          }
        },
        {
          type: "upload",
          field: "upload",
          title: "文件传输",
          value: 10,
          span: 12,
          props: {
            draggable: true,
            autoUpload: false
          },
        },
        {
          type: "transfer",
          field: "transfer",
          title: "穿梭框",
          value: 10,
          span: 12,
          props: {
          },
        },
        {
          type: "verification-code",
          field: "verificationcode",
          title: "验证码",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '验证码'
            }]
          },
        },
        {
          type: "time-picker",
          field: "timepicker",
          title: "时间选择",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '时间选择'
            }]
          },
        },
        {
          type: "date-range-picker",
          field: "daterangepicker",
          title: "日期范围",
          value: 10,
          span: 12,
          props: {
            rules: [{
              required: true,
              message: '日期必选'
            }]
          },
        },

        {
          type: "select",
          field: "like2",
          title: "爱好",
          value: "rap",
          span: 12,
          data: {
            list: [{
              value: "song",
              label: "唱"
            },
            {
              value: "dance",
              label: "跳"
            },
            {
              value: "rap",
              label: "rap"
            },
            {
              value: "basketball",
              label: "篮球"
            },
            ],
            key: "value",
          },
          props: {
            allowClear: true,
            rules: [{
              validator: (value, callback) => {
                if (value < 3) {
                  callback("评分不能低于3颗星");
                }
              },
              trigger: "blur",
            },]
          },
        },
      ],
    },
  },
  {
    type: "select",
    field: "like",
    title: "爱好",
    value: "rap",
    data: {
      list: [{
        value: "song",
        label: "唱"
      },
      {
        value: "dance",
        label: "跳"
      },
      {
        value: "rap",
        label: "rap"
      },
      {
        value: "basketball",
        label: "篮球"
      },
      ],
      key: "value",
    },
    props: {},
  },
  {
    type: "radio",
    field: "radio",
    title: "单选",
    value: "rap",
    data: {
      list: [{
        value: "song",
        label: "唱"
      },
      {
        value: "dance",
        label: "跳"
      },
      {
        value: "rap",
        label: "rap"
      },
      {
        value: "basketball",
        label: "篮球"
      },
      ],
      key: "value",
    },
    props: {},
  },
  {
    type: "checkbox",
    field: "checkbox",
    title: "复选",
    value: "rap",
    // data: {
    //   list: [{
    //       value: "song",
    //       label: "唱"
    //     },
    //     {
    //       value: "dance",
    //       label: "跳"
    //     },
    //     {
    //       value: "rap",
    //       label: "rap"
    //     },
    //     {
    //       value: "basketball",
    //       label: "篮球"
    //     },
    //   ],
    //   key: "value",
    // },
    props: {},
  },
  // {
  //   type: "upload",
  //   field: "file",
  //   title: "文件",
  //   value: [],
  // },
  {
    type: "switch",
    field: "Information",
    title: "信息公开",
    value: true,
    props: {
      rules: [{
        validator: (value, callback) => {
          if (!value) {
            callback('信息必须为公开')
          }
        }
      }]
    },
  },
  {
    field: 'slot',
    title: '自定义表单项',
  }
  ],
}


export const SIMPLEFORMDATA = {
  name: "",
  Information: false,
  height: 170,
  experience: 0.5,
  age: 1,
  rate: 0,
  rate2: 0,
  datepicker: '',
  daterangepicker: [],
  timepicker: '',
  like2: "",
  like: "",
  radio: "",
  checkbox: [],
  verificationcode: "",
  cascader: '',
  treeselect: [],
  upload: [],
  transfer: []
}
