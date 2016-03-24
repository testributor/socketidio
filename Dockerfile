FROM ubuntu:15.10

RUN apt-get update && apt-get install -y software-properties-common \
  python-software-properties apt-transport-https

# http://askubuntu.com/questions/672994/how-to-install-nodejs-4-on-ubuntu-15-04-64-bit-edition
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv 68576280
RUN apt-add-repository 'deb https://deb.nodesource.com/node_4.x precise main'
RUN apt-get update
RUN apt-get install -y nodejs

RUN mkdir /socketidio
ADD index.js /socketidio/
ADD package.json /socketidio/
ADD newrelic.js /socketidio/

WORKDIR "/socketidio"
RUN npm install

EXPOSE 9000

CMD node index.js
