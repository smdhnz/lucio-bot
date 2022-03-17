docker run \
    --rm \
    --init \
    --env-file=$(pwd)/.env \
    smdhnz/lucio-bot \
    node deploy-commands.js
