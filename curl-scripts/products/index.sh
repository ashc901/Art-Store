# TOKEN=<user token> sh curl-scripts/questions/index.sh
# get request

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Bearer ${TOKEN}"

  echo
