export const SIMPLEFORM = {
  gutter: 8,
  props: {
    layout: 'horizontal',
    labelAlign: 'left',
    autoLabelWidth: true,
    scrollToField: true,
  },
  fields: [
    {
      type: 'alert',
      show: true,
      props: {
        title: '这是警告标题',
        type: 'warning',
        banner: true,
        content: '这是警告内容',
      },
    },
    {
      type: 'color-picker',
      title: '颜色选择',
      show: true,
      props: {
        format: 'rgb',
        showText: true,
        showHistory: true,
      },
    },
    {
      type: 'input',
      field: 'name',
      title: '姓名',
      value: 'QQ',
      show: true,
      span: 12,
      config: {
        showColon: true,
        rules: [
          {
            required: true,
            message: '名称为必填项',
          },
          {
            validator: (value, callback) => {
              console.log(value)
              if (value === 'QQ') {
                callback('名字不能为只因')
              }
            },
            trigger: 'blur',
          },
        ],
      },
      props: {},
    },
    {
      type: 'slider',
      field: 'height',
      show: true,
      title: '身高(cm)',
      value: 170,
      span: 12,
      props: {
        max: 300,
      },
    },
    {
      type: 'divider',
      show: true,
      props: { direction: 'horizontal', content: '个人经历' },
    },
    {
      type: 'input-number',
      show: true,
      field: 'experience',
      title: '工作时长(年)',
      config: {
        rules: [
          {
            required: true,
            message: '工作时长为必填项',
          },
          {
            validator: (value, callback) => {
              if (value !== 2.5) {
                callback('工作时长必须大于两年半！')
              }
            },
          },
        ],
      },
      props: {
        setp: 0.5,
        precision: 1,
        max: 10,
        min: 0,
        mode: 'button',
      },
    },
    {
      type: 'rate',
      field: 'rate',
      show: true,
      title: '评分',
      value: 10,
      config: {
        rules: [
          {
            required: true,
            message: '评分必选',
          },
          {
            validator: (value, callback) => {
              if (value < 3) {
                callback('评分不能低于3颗星')
              }
            },
          },
          {
            validator: (value, callback) => {
              if (value % 2 == 0) {
                callback('评分必须为奇数')
              }
            },
          },
        ],
      },
      props: {
        count: 10,
      },
    },
    {
      type: 'form-item',
      show: true,
      field: 'childItem',
      title: '嵌套表单',
      value: 10,
      props: {},
      gutter: 24,
      children: [
        {
          type: 'rate',
          show: true,
          field: 'rate2',
          title: '评分',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '评分必选',
              },
              {
                validator: (value, callback) => {
                  if (value < 5) {
                    callback('评分不能低于5颗星')
                  }
                },
                trigger: 'blur',
              },
            ],
          },
          props: {},
        },
        {
          type: 'date-picker',
          show: true,
          field: 'datepicker',
          title: '日期',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '日期必选',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          datasource: { type: 'local' },
          type: 'tree-select',
          field: 'treeselect',
          title: '选择树',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '选择树',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          datasource: { type: 'local' },
          type: 'cascader',
          field: 'cascader',
          title: '级联选择器',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '级联选择器必选',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          type: 'upload',
          field: 'upload',
          title: '文件传输',
          value: 10,
          span: 12,
          props: {
            draggable: true,
            autoUpload: false,
          },
        },
        {
          show: true,
          datasource: { type: 'local' },
          type: 'transfer',
          value: [],
          field: 'transfer',
          title: '穿梭框',
          span: 12,
          props: {},
        },
        {
          show: true,
          type: 'verification-code',
          field: 'verificationcode',
          title: '验证码',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '验证码',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          type: 'time-picker',
          field: 'timepicker',
          title: '时间选择',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '时间选择',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          type: 'date-range-picker',
          field: 'daterangepicker',
          title: '日期范围',
          value: 10,
          span: 12,
          config: {
            rules: [
              {
                required: true,
                message: '日期必选',
              },
            ],
          },
          props: {},
        },
        {
          show: true,
          type: 'select',
          field: 'like2',
          title: '爱好',
          value: 'rap',
          span: 12,
          config: {
            rules: [
              {
                validator: (value, callback) => {
                  if (value < 3) {
                    callback('评分不能低于3颗星')
                  }
                },
                trigger: 'blur',
              },
            ],
          },
          props: {
            allowClear: true,
          },
        },
      ],
    },
    {
      show: true,
      datasource: {
        type: 'provide',
        data: [
          {
            value: 'song',
            label: '唱',
          },
          {
            value: 'dance',
            label: '跳',
          },
          {
            value: 'rap',
            label: 'rap',
          },
          {
            value: 'basketball',
            label: '篮球',
          },
        ],
      },
      type: 'select',
      field: 'like',
      title: '爱好',
      value: 'rap',
      props: {},
    },
    {
      show: true,
      datasource: {
        type: 'provide',
        data: [
          {
            value: 'song',
            label: '唱',
          },
          {
            value: 'dance',
            label: '跳',
          },
          {
            value: 'rap',
            label: 'rap',
          },
          {
            value: 'basketball',
            label: '篮球',
          },
        ],
      },
      type: 'radio',
      field: 'radio',
      title: '单选按钮',
      value: 'rap',
      props: {},
      config: {
        rules: [
          {
            required: false,
            message: '单选按钮为必填项',
          },
        ],
      },
    },
    {
      show: true,
      type: 'checkbox',
      field: 'checkbox',
      title: '复选',
      value: ['rap'],
      props: {},
    },
    // {
    //   type: "upload",
    //   field: "file",
    //   title: "文件",
    //   value: [],
    // },
    {
      show: true,
      type: 'switch',
      field: 'Information',
      title: '信息公开',
      value: true,
      config: {
        rules: [
          {
            validator: (value, callback) => {
              if (!value) {
                callback('信息必须为公开')
              }
            },
          },
        ],
      },
      props: {},
    },
    {
      show: true,
      field: 'slot',
      title: '自定义表单项',
    },
  ],
}

export const SIMPLEFORMDATA = {
  name: '',
  Information: false,
  height: 170,
  experience: 0.5,
  age: 1,
  rate: 0,
  rate2: 0,
  datepicker: '',
  daterangepicker: [],
  timepicker: '',
  like2: '',
  like: '',
  radio: '',
  checkbox: [],
  verificationcode: '',
  cascader: '',
  treeselect: [],
  upload: [],
  transfer: [],
}
