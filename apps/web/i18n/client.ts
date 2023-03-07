import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        common: {
          Apply: 'Apply',
          Cancel: 'Cancel',
          Confirm: 'Confirm',
          Delete: 'Delete',
          Create: 'Create',
          Done: 'Done',
          Update: 'Update',
          Name: 'Name',
          Type: 'Type',
          Asc: 'A → Z',
          Desc: 'Z → A',
          Max: 'max',
        },
        table: {
          'Create New Record': 'Create New Record',
          Views: 'Views',
          Filter: 'Filter',
          'Field Name': 'Field Name',
          Sort: 'Sort',
          'Config Fields': 'Fields',
          'Select Display Type': 'Select Display Type',
          Grid: 'Grid',
          Kanban: 'Kanban',
          Calendar: 'Calendar',
          TreeView: 'Tree',
          'Display Fields': 'Display Fields',
          'Select View': 'Select View',
          'Update View Name': 'Update View Name',
          'Duplicate View': 'Duplicate View',
          'Delete View': 'Delete View',
          'Search Field': 'Search Field',
          'Create New Table': 'Create New Table',
          'Create New Field': 'Create New Field',
          'Create New Filter': 'Create New Filter',
          'Create New Sort': 'Create New Sort',
          'Update Field': 'Update Field',
          'Insert Field Left': 'Insert Left',
          'Insert Field Right': 'Insert Right',
          'Insert Field Before': 'Insert Before',
          'Insert Field After': 'Insert After',
          'Sort Ascending': 'Sort: Ascending',
          'Sort Desending': 'Sort: Desending',
          'Delete Sort Ascending': 'Delete Sort: Ascending',
          'Delete Sort Desending': 'Delete Sort: Desending',
          'Hide Field': 'Hide Field',
          'Delete Field': 'Delete Field',
          'Set Rating Max': 'Set Rating Max',
          'Foreign Table': 'Foreign Table',
          'Select Foreign Table': 'Select Foreign Table',
          'Select Display Fields': 'Select Display Fields',
          'Date Format': 'Date Foramt',
          'Select Date Format': 'Select Date Format',
          String: 'String',
          Email: 'Email',
          Color: 'Color',
          Number: 'Number',
          Rating: 'Rating',
          Date: 'Date',
          DateRange: 'DateRange',
          AutoIncrement: 'AutoIncrement',
          Bool: 'Bool',
          Select: 'Select',
          Reference: 'Reference',
          Tree: 'Tree',
          'Duplicate Record': 'Duplicate Record',
          'Copy Record Id': 'Copy Record Id',
          'Update Record': 'Update Record',
          'Delete Record': 'Delete Record',
          'System fields': 'System fields',
          'Show System Fields': 'Show System Fields',
          'Update Table': 'Update Table',
          'Update Table Name': 'Update Table Name',
          'Delete Table': 'Delete Table',
        },
      },
      zh: {
        common: {
          Apply: '应用',
          Cancel: '取消',
          Confirm: '确认',
          Delete: '删除',
          Create: '创建',
          Done: '完成',
          Update: '更新',
          Name: '名称',
          Type: '类型',
          Asc: '正序',
          Desc: '倒序',
          Max: '最大值',
        },
        table: {
          'Create New Record': '创建新记录',
          Views: '视图',
          Filter: '筛选',
          Sort: '排序',
          'Field Name': '列名',
          'Config Fields': '配置列',
          'Select Display Type': '切换视图类型',
          Grid: '表格',
          Kanban: '看板',
          Calendar: '日历',
          TreeView: '树形',
          'Display Fields': '显示列',
          'Select View': '选择视图',
          'Update View Name': '更新视图名称',
          'Duplicate View': '复制视图',
          'Delete View': '删除视图',
          'Search Field': '搜索列',
          'Create New Table': '创建表',
          'Create New Field': '创建列',
          'Create New Filter': '添加筛选',
          'Create New Sort': '添加排序',
          'Update Field': '更新列',
          'Insert Field Left': '向左插入',
          'Insert Field Right': '向右插入',
          'Insert Field Before': '向上插入',
          'Insert Field After': '向下插入',
          'Sort Ascending': '排序：正序',
          'Sort Desending': '排序：倒序',
          'Delete Sort Ascending': '删除排序：正序',
          'Delete Sort Desending': '删除排序：倒序',
          'Hide Field': '隐藏列',
          'Delete Field': '删除列',
          'Set Rating Max': '设置评分最大值',
          'Foreign Table': '关联表',
          'Select Foreign Table': '选择关联表',
          'Select Display Fields': '选择显示列',
          'Date Format': '日期格式',
          'Select Date Format': '选择日期格式',
          String: '文本',
          Email: '邮件',
          Color: '颜色',
          Number: '数字',
          Rating: '评分',
          Date: '日期',
          DateRange: '日期区间',
          AutoIncrement: '自增',
          Bool: '布尔',
          Select: '单选',
          Reference: '关联',
          Tree: '树形',
          'Duplicate Record': '复制记录',
          'Copy Record Id': '拷贝行 Id',
          'Update Record': '更新记录',
          'Delete Record': '删除记录',
          'System fields': '系统列',
          'Show System Fields': '显示系统列',
          'Update Table': '更新表',
          'Update Table Name': '更新表名',
          'Delete Table': '删除表',
        },
      },
    },
    ns: ['common', 'table'],
    defaultNS: 'table',
    lng: undefined, // if you're using a language detector, do not define the lng option
    fallbackLng: 'zh',

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
