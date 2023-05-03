export const SIMPLEFORM = {
  props: {
    layout: "horizontal",
    labelAlign: "left",
  },
  fields: [{
      type: "input",
      field: "name",
      title: "姓名",
      value: "QQ",
      slot: {
        prefix: {
          type: 'text',
          content: '+86'
        },
        suffix: {
          type: 'icon',
          content: 'user'
        }
      },
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
        rules:[{
          required: true,
          message:'工作时长为必填项'
        },
          {
            validator:(value,callback)=> {
            if(value!==2.5) {
              callback('工作时长必须大于两年半！')
            }
          }}
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
        }, ]
      },
    },

    {
      type: "form-item",
      field: "childItem",
      title: "嵌套表单",
      value: 10,
      props: {},
      children: {
        column: 1,
        items: [{
            type: "rate",
            field: "rate2",
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
              }, ]
            },

          },
          {
            type: "select",
            field: "like2",
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
            props: {
              allowClear: true,
              rules: [ {
                validator: (value, callback) => {
                  if (value < 3) {
                    callback("评分不能低于3颗星");
                  }
                },
                trigger: "blur",
              }, ]
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
        rules:[{
          validator:(value,callback) => {
            if(!value) {
              callback('信息必须为公开')
            }
          }
        }]
      },
    },
  ],
}


export const SIMPLEFORMDATA = {
  name: "",
  Information: false,
  height: 170,
  experience: 0.5,
  age: 1,
  rate2: 0,
  like2: "",
  like: "",
  radio: "",
  checkbox:[]
}
