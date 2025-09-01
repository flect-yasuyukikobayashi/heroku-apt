AUTH0_DOMAIN=$1
ACCESS_TOKEN=$2

curl --request PATCH \
  --url "https://${AUTH0_DOMAIN}/api/v2/tenants/settings" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data '{"error_page": {}}'