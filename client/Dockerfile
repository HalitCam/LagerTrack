FROM node:22-slim
WORKDIR /opt/amazon-lager/client
COPY . /opt/amazon-lager/client
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]