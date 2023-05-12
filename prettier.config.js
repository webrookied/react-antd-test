// prettier.config.js or .prettierrc.js
// 规范化代码文件（代码格式化配置）
module.exports = {
  printWidth: 120, // 每行代码最大长度
  tabWidth: 2, //一个tab代表几个空格数，默认为80
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: false, // 声明后带分号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: true, // 使用单引号
  jsxBracketSameLine: true, // 启用jsx语法，> 放在末尾
  trailingComma: 'all',
  arrowParens: 'always',
}
