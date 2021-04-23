# TOKEN=<user token> sh curl-scripts/questions/index.sh
# curl script for making a new product
#v2 do i need to add img stuff?
API="https://floating-mountain-26988.herokuapp.com"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "product": {
      "name": "'"${NAME}"'",
      "price": "'"${PRICE}"'"
    }
  }'

echo

#"https://floating-mountain-26988.herokuapp.com"
