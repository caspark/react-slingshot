FROM mhart/alpine-node:base-5

ADD . /dist

WORKDIR /dist
EXPOSE 3000
CMD ["node", "index.js", "3000"]
