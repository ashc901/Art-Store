#!/bin/bash

API="https://floating-mountain-26988.herokuapp.com/"
URL_PATH="/sign-out"

curl "${API}${URL_PATH}/" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo

#"https://floating-mountain-26988.herokuapp.com/"
