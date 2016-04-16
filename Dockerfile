FROM mhart/alpine-node:base-5

ADD node_modules/ /dist/node_modules
ADD dist/ /dist

WORKDIR /dist
EXPOSE 3000
CMD ["node", "index.js", "3000"]
