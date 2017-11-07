FROM node:8.5

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
COPY config/dot.netrc /root/.netrc

RUN npm install

CMD [ "npm", "build-local" ]