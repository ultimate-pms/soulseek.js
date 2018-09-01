FROM cusspvz/node:0.12.8

#### SETUP RUBY (Required for the grunt compass tasks)... ####

RUN apk add --no-cache ruby ruby-bundler

#### SETUP WITH BACKDATED DEPS FROM 2013... ####

RUN apk --update add git openssh supervisor && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

RUN npm install -g yo@1.1.0 grunt-cli@0.1.8 bower@0.9.2


COPY soulseekjs /opt/soulseekjs

# RUN cd /opt/soulseekjs && \
#    npm install && \
#    bower install

EXPOSE 9000

#CMD supervisord -c /etc/supervisor.conf
CMD /bin/bash
