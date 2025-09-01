AUTH0_DOMAIN=$1
ACCESS_TOKEN=$2

CONNECTION_ID=$(curl \
  --url "https://${AUTH0_DOMAIN}/api/v2/connections?name=google-oauth2" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  | jq -r ".[].id")

curl --request DELETE \
  --url "https://${AUTH0_DOMAIN}/api/v2/connections/${CONNECTION_ID}" \
  --header "authorization: Bearer ${ACCESS_TOKEN}"