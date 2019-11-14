import {
  SET_FOO
} from "./actionTypes";

export function setFoo(foo) {
  return {
    type: SET_FOO,
    foo: foo
  }
}
