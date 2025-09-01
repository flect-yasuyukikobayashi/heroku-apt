AUTH0_DOMAIN=$1
ACCESS_TOKEN=$2

curl --request PUT \
  --url "https://${AUTH0_DOMAIN}/api/v2/prompts/email-verification/custom-text/ja" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Content-Type: application/json" \
  --data @prompt_jsons/email-verification.json

curl --request PUT \
  --url "https://${AUTH0_DOMAIN}/api/v2/prompts/reset-password/custom-text/ja" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  --header "Content-Type: application/json" \
  --data @prompt_jsons/reset-password.json