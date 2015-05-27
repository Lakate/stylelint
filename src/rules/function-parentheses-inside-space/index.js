import {
  ruleMessages,
  isWhitespace,
  styleSearch
} from "../../utils"

export const ruleName = "function-parentheses-inside-space"

export const messages = ruleMessages(ruleName, {
  expectedOpening: "Expected single space before \"(\" of a function",
  rejectedOpening: "Unexpected space before \"(\" of a function",
  expectedClosing: "Expected single space before \")\" of a function",
  rejectedClosing: "Unexpected space before \")\" of a function",
})

/**
 * @param {"always"|"never"} expectation
 */
export default function (expectation) {
  return function (css, result) {
    css.eachDecl(function (decl) {
      const value = decl.value

      styleSearch({ source: value, target: "(" }, index => {
        checkOpening(value, index, decl)
      })
      styleSearch({ source: value, target: ")" }, index => {
        checkClosing(value, index, decl)
      })
    })

    function checkOpening(source, index, node) {
      const nextCharIsSpace = source[index + 1] === " "
      if (expectation === "always") {
        if (!nextCharIsSpace || isWhitespace(source[index + 2])) {
          result.warn(messages.expectedOpening, { node })
        }
      } else if (expectation === "never") {
        if (nextCharIsSpace) {
          result.warn(messages.rejectedOpening, { node })
        }
      }
    }

    function checkClosing(source, index, node) {
      const prevCharIsSpace = source[index - 1] === " "
      if (expectation === "always") {
        if (!prevCharIsSpace || isWhitespace(source[index - 2])) {
          result.warn(messages.expectedClosing, { node })
        }
      } else if (expectation === "never") {
        if (prevCharIsSpace) {
          result.warn(messages.rejectedClosing, { node })
        }
      }
    }
  }
}
