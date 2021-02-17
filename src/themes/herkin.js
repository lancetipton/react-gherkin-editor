import { define } from 'ace-builds'
/* istanbul ignore file */
define('ace/theme/herkin', [
  'require',
  'exports',
  'module',
  'ace/lib/dom'
], function (acequire, exports) {
  exports.isDark = false
  exports.cssClass = 'ace-herkin'
  exports.cssText = `
.ace-herkin .ace_gutter {
  background: #f9fafe;
  color: #333333;
}
.ace-herkin .ace_gutter .ace_gutter-layer {
}
.ace-herkin .ace_print-margin {
  width: 1px;
  background: #f9fafe;
}
.ace-herkin {
  background-color: #FFFFFF;
  color: #000000;
  padding-bottom: 20px;
}
.ace-herkin .ace_cursor {
  color: #AEAFAD;
}
.ace-herkin .ace_marker-layer .ace_selection {
  background: #E3E8F0;
}
.ace-herkin.ace_multiselect .ace_selection.ace_start {
  box-shadow: 0 0 3px 0px #FFFFFF;
}
.ace-herkin .ace_marker-layer .ace_step {
  background: rgb(255, 255, 0);
}
.ace-herkin .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #rgb(192, 192, 192);
}
.ace-herkin .ace_marker-layer .ace_active-line {
  background: #EFEFEF;
}
.ace-herkin .ace_gutter-active-line {
  background-color : #e3e8f0;
}
.ace-herkin .ace_marker-layer .ace_selected-word {
  background: rgb(250, 250, 255);
  border: 1px solid rgb(200, 200, 250);
}
.ace-herkin .ace_invisible {
  color: #rgb(191, 191, 191);
}
.ace-herkin .ace_keyword,
.ace-herkin .ace_meta,
.ace-herkin .ace_storage,
.ace-herkin .ace_storage.ace_type,
.ace-herkin .ace_support.ace_type {
  color: rgb(25, 144, 184);
  font-weight: bold;
}
.ace-herkin .ace_storage.ace_type,
.ace-herkin .ace_support.ace_type {
  color: rgb(147, 15, 128);
}
.ace-herkin .ace_keyword.ace_operator {
  color: #3E999F;
}
.ace-herkin .ace_constant.ace_character,
.ace-herkin .ace_constant.ace_language,
.ace-herkin .ace_constant.ace_numeric,
.ace-herkin .ace_keyword.ace_other.ace_unit,
.ace-herkin .ace_support.ace_constant,
.ace-herkin .ace_variable.ace_parameter {
  color: #F5871F;
}
.ace-herkin .ace_constant.ace_other {
  color: #666969;
}
.ace-herkin .ace_invalid {
  color: #FFFFFF;
  background-color: #C82829;
}
.ace-herkin .ace_invalid.ace_deprecated {
  color: #FFFFFF;
  background-color: #8959A8;
}
.ace-herkin .ace_fold {}
.ace-herkin .ace_entity.ace_name.ace_function,
.ace-herkin .ace_support.ace_function,
.ace-herkin .ace_variable {
  color: #4271AE;
}
.ace-herkin .ace_support.ace_class,
.ace-herkin .ace_support.ace_type {
  color: #C99E00;
}
.ace-herkin .ace_heading,
.ace-herkin .ace_markup.ace_heading {
  color: #1A1AA6;
}
.ace-herkin .ace_alternate,
.ace-herkin .ace_string {
  color: #048851;
}
.ace-herkin .ace_comment + .ace_string {
  color: #1A1AA6;
}
.ace-herkin .ace_entity.ace_name.ace_tag,
.ace-herkin .ace_entity.ace_other.ace_attribute-name,
.ace-herkin .ace_meta.ace_tag,
.ace-herkin .ace_string.ace_regexp,
.ace-herkin .ace_variable {
  color: rgb(147, 15, 128);
}
.ace-herkin .ace_argument {
  color: #a8142f;
}
.ace-herkin .ace_comment {
  color: #7d8b99;
}
.ace-herkin .ace_indent-guide {
  background: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==\") right repeat-y;
}
.ace-herkin .ace_tooltip {
  max-width: 500px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  word-wrap: break-word;
}`

  const dom = acequire('../lib/dom')
  dom.importCssString(exports.cssText, exports.cssClass)
})
