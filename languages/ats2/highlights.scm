(keyword) @keyword
(type) @type.builtin

(number) @number
(string) @string
(comment) @comment
(operator) @operator
(punctuation) @punctuation
(preproc) @preproc
(dollar_keyword) @keyword
(boolean) @boolean

[
  "fun"
  "fn"
  "fnx"
  "prfun"
  "implement"
  "primplement"
] @keyword

(function_header
  name: (identifier) @function)

(
  (source_file
    (identifier) @function
    .
    (punctuation) @_open)
  (#eq? @_open "(")
)

(
  (source_file
    (identifier) @function
    .
    (operator) @_bang
    .
    (punctuation) @_open)
  (#eq? @_bang "!")
  (#eq? @_open "(")
)

(char_literal) @string.special

(parameter
  name: (identifier) @variable.parameter)

[
  "val"
  "var"
] @keyword

(binding_header
  name: (identifier) @variable)

(function_call
  name: (identifier) @function)

"(" @punctuation
")" @punctuation
"," @punctuation
"!" @operator

(source_file
  (identifier) @variable)

(argument_list
  (identifier) @variable)

(c_block) @embedded

(static_parameter
  name: (identifier) @variable.parameter)

(static_constraint
  (identifier) @variable)

(tuple_pattern
  (identifier) @variable)

"@" @operator

(parameter
  type: (identifier) @type)

(function_header
  return_type: (identifier) @type)

(type_declaration_header
  name: (identifier) @type)

[
  "datatype"
  "datavtype"
  "dataviewtype"
  "dataprop"
  "dataview"
  "typedef"
  "vtypedef"
  "viewtypedef"
  "abstype"
  "absvtype"
  "absviewtype"
  "absprop"
  "absview"
  "datasort"
  "sortdef"
  "propdef"
  "viewdef"
] @keyword


(constructor_declaration
  name: (identifier) @constructor)

"|" @operator

(constructor_pattern
  name: (identifier) @constructor)

(pattern_argument_list
  (identifier) @variable)

(
  (binding_pattern
    name: (identifier) @constructor)
  (#match? @constructor "^[A-Z]")
)

(
  (binding_pattern
    name: (identifier) @variable)
  (#match? @variable "^[a-z_]")
)

[
  "=>"
  "=>>"
] @operator


(type_application
  name: (identifier) @type)

(type_application
  argument: (identifier) @type)

(binding_header
  type: (identifier) @type)

(escape_sequence) @string.escape
