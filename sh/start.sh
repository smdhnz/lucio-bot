docker run \
    --init \
    --env-file=$(pwd)/.env \
    smdhnz/lucio-bot \
    node deploy-commands.js
