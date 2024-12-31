FROM ubuntu:24.04 AS base
RUN apt-get update
RUN apt install -y curl
RUN export NVM_DIR="$HOME/.nvm"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
# # RUN . "$NVM_DIR/nvm.sh"
# RUN /bin/bash -ic "source ~/.bashrc"
# RUN echo nvm

ENV HOSTNAME="0.0.0.0"
ENV NVM_DIR=/usr/local/nvm
ENV NODE_VERSION=v21.7.3

RUN mkdir -p $NVM_DIR && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
RUN /bin/bash -c "source $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm use --delete-prefix $NODE_VERSION"

ENV NODE_PATH=$NVM_DIR/versions/node/$NODE_VERSION/lib/node_modules
ENV PATH=$NVM_DIR/versions/node/$NODE_VERSION/bin:$PATH





WORKDIR /app
COPY . .

RUN npm install -g nodemon
RUN npm ci
RUN npm run build
CMD ["npm", "run", "dev"]


