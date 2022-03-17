docker run \
    --detach \
    --init \
    --restart=always \
    --env-file=$(pwd)/.env \
    smdhnz/lucio-bot
