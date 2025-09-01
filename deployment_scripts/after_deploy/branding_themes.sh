AUTH0_DOMAIN=$1
ACCESS_TOKEN=$2

THEME=$(curl \
    --url "https://${AUTH0_DOMAIN}/api/v2/branding/themes/default" \
    --header "authorization: Bearer ${ACCESS_TOKEN}")

# themeId取得
THEME_ID=$(echo "$THEME" | jq -r ".themeId")
# 更新用に必要なBodyを抽出
THEME_BODY=$(echo "$THEME" | jq -r '{borders,colors,displayName,fonts,page_background,widget}')
# error/successの色・Buttons textのサイズをBodyに上書き
UPDATED_BODY=$(echo "$THEME_BODY" | jq '.colors.error="#FF0000" | .colors.success="#FF0000" | .fonts.buttons_text.size=90.0')

curl --request PATCH \
    --url "https://${AUTH0_DOMAIN}/api/v2/branding/themes/${THEME_ID}" \
    --header "authorization: Bearer ${ACCESS_TOKEN}" \
    --header 'Content-Type: application/json' \
    --data "$UPDATED_BODY"
