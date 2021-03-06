import {
  messages,
  ruleName,
} from ".."
import rules from "../../../rules"
import { testRule } from "../../../testUtils"

const rule = rules[ruleName]

testRule(rule, {
  ruleName,
  config: [true],
  skipBasicChecks: true,

  accept: [ {
    code: "",
  }, {
    code: "@import \"foo.css\";",
  }, {
    code: "a { color: pink; }",
  }, {
    code: "@media print { a { color: pink; } }",
  }, {
    code: "@import url(x.css)",
  } ],

  reject: [ {
    code: "a {}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a { }",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a {\n}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a {\r\n}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a {\n\n}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a {\t}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "a {\t\t}",
    message: messages.rejected,
    line: 1,
    column: 3,
  }, {
    code: "@media print {}",
    message: messages.rejected,
    line: 1,
    column: 14,
  }, {
    code: "@media print {\n}",
    message: messages.rejected,
    line: 1,
    column: 14,
  }, {
    code: "@media print {\r\n}",
    message: messages.rejected,
    line: 1,
    column: 14,
  }, {
    code: "@media print {\t}",
    message: messages.rejected,
    line: 1,
    column: 14,
  }, {
    code: "@media print { a {} }",
    message: messages.rejected,
    line: 1,
    column: 18,
  } ],
})

testRule(rule, {
  ruleName,
  config: [undefined],
  skipBasicChecks: true,
  syntax: "sugarss",

  reject: [{
    code: ".a",
    message: messages.rejected,
    line: 1,
    column: 2,
  }],
})
