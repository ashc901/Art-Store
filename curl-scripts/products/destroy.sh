# TOKEN=<user token> sh curl-scripts/questions/index.sh
# deelt

API="https://floating-mountain-26988.herokuapp.com"
URL_PATH="/products"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request DELETE \
  --header "Authorization: Bearer ${TOKEN}"

echo

#"https://floating-mountain-26988.herokuapp.com/"
