"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const calculateSize = (str, _ref) => {
  let _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 16 : _ref$fontSize,
      font = _ref.font;
  const widths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625, 0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625, 0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
  const avg = 0.5279276315789471;
  return str.split('').map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg).reduce((cur, acc) => acc + cur, '') * fontSize;
};

class StepCompleter {
  constructor(autoCompleteFunction, getGherkinDialect) {
    _defineProperty(this, "getCompletions", async (editor, session, position, _prefix, callback) => {
      const lineTokens = session.getLine(position.row).trim().split(' ');

      if (lineTokens.length > 1 && this.getGherkinDialect().keywords.includes(lineTokens[0])) {
        const keyword = lineTokens.shift();
        const text = lineTokens.join(' ');

        try {
          const completions = await this.autoCompleteFunction(keyword, text);
          callback(null, completions);

          this._resizePopup(editor, completions);
        } catch (error) {
          callback(null, []);
          throw error;
        }
      }
    });

    _defineProperty(this, "_resizePopup", (editor, completions) => {
      if (!completions || !completions.length) return;
      let longestString = '';
      const strings = completions.map(comp => {
        comp.caption && comp.caption.length > longestString.length && (longestString = comp.caption);
        return comp.caption;
      });

      const _editor$getOptions = editor.getOptions(),
            fontFamily = _editor$getOptions.fontFamily,
            fontSize = _editor$getOptions.fontSize;

      const width = calculateSize(longestString, {
        font: fontFamily,
        fontSize: parseInt(fontSize)
      });
      editor.completer.popup.container.style.width = "".concat(width + 200, "px");
    });

    this.autoCompleteFunction = autoCompleteFunction;
    this.getGherkinDialect = getGherkinDialect;
  }

}

var _default = StepCompleter;
exports.default = _default;