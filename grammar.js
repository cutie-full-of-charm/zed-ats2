module.exports = grammar({
  name: "ats2",
  word: $ => $.identifier,
  extras: $ => [/\s/],

  rules: {
    source_file: $ => repeat(choice(
      $.comment,
      $.string,
      $.char_literal,
      $.c_block,
      $.preproc,
      $.dollar_keyword,
      $.boolean,
      $.function_header,
      $.binding_header,
      $.type_declaration_header,
      $.case_branch_header,
      $.constructor_declaration,
      $.function_call,
      $.keyword,
      $.type,
      $.number,
      $.identifier,
      $.operator,
      $.punctuation
    )),

    _type_expression: $ => choice(
      $.type_application,
      $.type,
      $.identifier
    ),

    type_application: $ => seq(
      field("name", choice(
        $.identifier,
        $.type
      )),
      "(",
      optional(seq(
        field("argument", $._type_expression),
        repeat(seq(
          ",",
          field("argument", $._type_expression)
        ))
      )),
      ")"
    ),

    case_branch_header: $ => prec(3, seq(
      "|",
      field("pattern", choice(
        $.constructor_pattern,
        $.binding_pattern
      )),
      choice("=>", "=>>")
    )),

    constructor_pattern: $ => seq(
      field("name", $.identifier),
      field("arguments", $.pattern_argument_list)
    ),

    binding_pattern: $ => seq(
      field("name", $.identifier)
    ),

    pattern_argument_list: $ => seq(
      "(",
      optional(seq(
        $._pattern_argument,
        repeat(seq(",", $._pattern_argument))
      )),
      ")"
    ),

    _pattern_argument: $ => choice(
      $.identifier,
      $.tuple_pattern
    ),

    tuple_pattern: $ => seq(
      "@",
      "(",
      optional(seq(
        $.identifier,
        repeat(seq(",", $.identifier))
      )),
      ")"
    ),

    c_block: $ => token(seq(
      "%{",
      repeat(choice(
        /[^%]/,
        /%[^}]/
      )),
      "%}"
    )),

    function_call: $ => prec(2, seq(
      field("name", $.identifier),
      optional("!"),
      field("arguments", $.argument_list)
    )),

    argument_list: $ => seq(
      "(",
      optional(seq(
        $._argument,
        repeat(seq(",", $._argument))
      )),
      ")"
    ),

    constructor_declaration: $ => prec(2, seq(
      "|",
      field("name", $.identifier)
    )),

    _argument: $ => seq(
      choice(
        $.identifier,
        $.number,
        $.string,
        $.char_literal,
        $.boolean
      ),
      repeat(seq(
        choice("+", "-", "*", "/"),
        choice(
          $.identifier,
          $.number,
          $.string,
          $.char_literal,
          $.boolean
        )
      ))
    ),

    binding_header: $ => prec(1, seq(
      choice("val", "var"),
      field("name", $.identifier),
      optional(seq(
        ":",
        field("type", $._type_expression)
      ))
    )),


    type_declaration_header: $ => prec(1, seq(
      choice(
        "datatype",
        "datavtype",
        "dataviewtype",
        "dataprop",
        "dataview",

        "typedef",
        "vtypedef",
        "viewtypedef",

        "abstype",
        "absvtype",
        "absviewtype",
        "absprop",
        "absview",

        "datasort",
        "sortdef",
        "propdef",
        "viewdef"
      ),
      field("name", $.identifier)
    )),

    function_header: $ => seq(
      choice(
        "fun", "fn", "fnx",
        "prfun", "implement", "primplement"
      ),

      repeat(field("static_parameters", $.static_parameter_list)),

      field("name", $.identifier),

      repeat(field("static_parameters", $.static_parameter_list)),

      optional(field("parameters", $.parameter_list)),

      optional(seq(
        ":",
        field("return_type", $._type_expression)
      ))
    ),

    static_parameter_list: $ => seq(
      "{",
      $.static_parameter,
      repeat(seq(",", $.static_parameter)),
      optional(seq(
        "|",
        $.static_constraint
      )),
      "}"
    ),

    static_constraint: $ => seq(
      field("left", $.identifier),
      field("operator", $.operator),
      field("right", choice($.identifier, $.number))
    ),


    static_parameter: $ => seq(
      field("name", $.identifier),
      ":",
      field("sort", choice($.type, $.identifier))
    ),

    parameter_list: $ => seq(
      "(",
      optional(seq(
        $.parameter,
        repeat(seq(",", $.parameter))
      )),
      ")"
    ),

    parameter: $ => seq(
      field("name", $.identifier),
      ":",
      field("type", $._type_expression)
    ),

    char_literal: $ => seq(
      "'",
      choice(
        token.immediate(/[^'\\\n]/),
        $.escape_sequence
      ),
      token.immediate("'")
    ),

    preproc: $ => token(prec(3,
      /#[a-zA-Z_][a-zA-Z_0-9]*/
    )),

    dollar_keyword: $ => token(prec(3,
      /\$[a-zA-Z_][a-zA-Z_0-9]*/
    )),

    boolean: $ => choice("true", "false"),

    comment: $ => token(choice(
      /\/\/[^\n]*/,
      /\/\*([^*]|\*+[^*/])*\*+\//,
      /\(\*([^*]|\*+[^*)])*\*+\)/
    )),


    string: $ => seq(
      '"',
      repeat(choice(
        token.immediate(/[^"\\\n]+/),
        $.escape_sequence
      )),
      '"'
    ),

    escape_sequence: $ => token.immediate(seq(
      "\\",
      choice(
        /0[xX][0-9a-fA-F]+/,
        /[xX][0-9a-fA-F]+/,
        /[0-7]{1,3}/,
        /[^\n]/
      )
    )),


    keyword: $ => choice(
      "val", "var", "prval", "prvar", "prfn", "praxi", "castfn",
      "extern", "extype", "extval", "exception",
      "typedef", "vtypedef", "viewtypedef", "propdef", "viewdef",
      "datatype", "datavtype", "dataviewtype", "dataprop", "dataview", "datasort",
      "absprop", "absview", "abstype", "abst0ype",
      "abstbox", "absvtbox", "abstflt", "absvtflt", "abstflat", "absvtflat",
      "absvtype", "absvt0ype", "absviewtype", "absviewt0ype",
      "assume", "absimpl", "reassume", "absreimpl",
      "staload", "dynload", "sta", "stacst", "stadef", "stavar",
      "sortdef", "sexpdef", "tkindef",
      "if", "sif", "then", "else", "case", "case+", "case-", "scase", "of",
      "let", "in", "end", "where", "local", "begin",
      "and", "rec", "as", "op", "lam", "llam", "fix",
      "macdef", "macrodef", "symintr", "symelim", "overload",
      "infix", "infixl", "infixr", "prefix", "postfix", "nonfix",
      "for", "while", "break", "continue", "try", "with", "when",
      "withtype", "withprop", "withview", "withvtype", "withviewtype",
      "implmnt", "primplmnt", "classdec"
    ),

    type: $ => choice(
      "int", "nat", "bool", "char", "string", "void", "ptr", "size_t",
      "uint", "float", "double", "addr", "ssize_t",
      "list", "list0", "Option",
      "cls", "eff", "prop", "tkind", "tk",
      "t@ype", "type", "t0ype",
      "view", "viewt@ype", "viewtype", "viewt0ype",
      "vtype", "vt0ype"
    ),

    number: $ => token(choice(
      /0[xX][0-9a-fA-F]+/,
      /[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/
    )),

    identifier: $ => /[a-zA-Z_][a-zA-Z_0-9]*/,

    operator: $ => /[+\-*\/=<>!&|%^~?:@#$]+/,

    punctuation: $ => /[(){}\[\],;.]/
  }
});
