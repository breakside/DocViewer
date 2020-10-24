FROM alpine:3

RUN apk -U add nginx && mkdir /run/nginx

COPY DocViewerWeb /DocViewerWeb

# forward request and error logs to docker log collector
RUN mkdir -p /DocViewerWeb/logs && ln -sf /dev/stdout /DocViewerWeb/logs/access.log && ln -sf /dev/stderr /DocViewerWeb/logs/error.log

EXPOSE {{HTTP_PORT}}

CMD ["nginx", "-p", "/DocViewerWeb", "-c", "conf/nginx.conf", "-g", "daemon off;"]