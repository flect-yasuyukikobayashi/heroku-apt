AUTH0_DOMAIN=$1
ACCESS_TOKEN=$2

curl --request PATCH \
  --url "https://${AUTH0_DOMAIN}/api/v2/branding" \
  --header "authorization: Bearer ${ACCESS_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data '{"favicon_url":"https://notice.lcx.mitsubishielectric.co.jp/shared_resp/v0006/img/favicon.ico"}'
