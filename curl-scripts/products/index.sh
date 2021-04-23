# TOKEN=<user token> sh curl-scripts/questions/index.sh
# get request

API="https://floating-mountain-26988.herokuapp.com"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

  echo

#"https://floating-mountain-26988.herokuapp.com/"
