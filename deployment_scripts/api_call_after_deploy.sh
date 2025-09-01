
AUTH0_CLIENT_ID=$1
AUTH0_CLIENT_SECRET=$2
AUTH0_DOMAIN=$3

ACCESS_TOKEN=$(sh scripts/get_token.sh $AUTH0_CLIENT_ID $AUTH0_CLIENT_SECRET $AUTH0_DOMAIN)

sh scripts/after_deploy/branding.sh $AUTH0_DOMAIN $ACCESS_TOKEN
sh scripts/after_deploy/branding_themes.sh $AUTH0_DOMAIN $ACCESS_TOKEN
sh scripts/after_deploy/prompt.sh $AUTH0_DOMAIN $ACCESS_TOKEN
sh scripts/after_deploy/connection.sh $AUTH0_DOMAIN $ACCESS_TOKEN
