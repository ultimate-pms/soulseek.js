FROM cusspvz/node:0.11.16

RUN apk --update add git openssh supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

RUN npm install -g yo@1.0.0 grunt-cli@0.1.11 bower@1.0.0 && \
    git clone https://github.com/ultimate-pms/soulseekjs.git /opt/soulseek && \
    cd /opt/soulseek/soulseekjs && \
    npm install && \
    bower install

EXPOSE 9002
EXPOSE 9000

CMD supervisord -c /etc/supervisor.conf
