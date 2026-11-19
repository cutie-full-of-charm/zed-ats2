#include "share/atspre_staload.hats"
#define ANSWER 0x2A

stadef N = 10
abstype token

datasort color = Red | Blue

val enabled = true
val disabled = false
val hex_value = 0xFF
val fractional = 3.14e-2
val xs = $list{int}(1, 2, 3)

fun identity{a:t@ype}(x: a): a = x

val functional = 10
val integer = 20

val enabled = true
val hex_value = 0xFF
val xs = $list{int}(1, 2, 3)

fun identity{a:t@ype}(x: a): a = x

%{^
#include <stdint.h>

int ats2_test(void) {
    return 42;
}
%}

val x = 10

fun test_case
  {n:nat}
  {i:nat | i <= n}
  {k:int}
  (
    cur: Cursor(n, i),
    len: int(n),
    amount: int(k)
  ): void =
  case+ take_bytes(cur, len, amount) of
  | TakeOK(@(slice, next)) => let
      val @(_, start, taken) = slice
      val @(_, next_pos) = next
    in
      println!(
        "OK: start=", start,
        " count=", taken,
        " next=", next_pos
      )
    end
  | TakeError() =>
      println!("ERROR: amount=", amount)

fun{a:t@ype} identity(x: a): a = x
fun identity2{a:t@ype}(x: a): a = x
fun add(x: int, y: int): int = x + y

datatype weekday =
  | Monday
  | Tuesday
  | Wednesday

datavtype resource =
  | Resource of ()

typedef score = int

abstype handle = ptr

fun identity_score(x: score): score = x

datatype ab =
  | A of ()
  | B of (bool)

datavtype resource =
  | Resource of ()


fun length(xs: List0(int)): int =
  case+ xs of
  | list_nil() => 0
  | list_cons(x, rest) => 1

fun nested(xs: List0(Option(int))): List0(int) = xs

typedef score = int

val points: score = 100
val counter: int = 42
var items: List0(int) = list_nil()
val ordinary = 10

val () = println!("Hello")

sortdef myindex = int

abstype handle = ptr

typedef score = int

fun get_score(x: score): int
fun set_score(x: score, n: int): void


val message = "Hello\nWorld!"
val tabs = "one\ttwo\tthree"
val quoted = "Say \"Hello\""
val slash = "C:\\folder\\file"

val hex = "\x41"
val octal = "\123"
val ats_hex = "\0x41"

val newline = '\n'
val letter = 'A'
