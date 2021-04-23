# TOKEN=<user token> sh curl-scripts/questions/index.sh
# patch/update

API="https://floating-mountain-26988.herokuapp.com"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "product": {
      "name": "'"${NAME}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo

#"https://floating-mountain-26988.herokuapp.com/"
