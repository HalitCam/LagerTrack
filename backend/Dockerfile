FROM node:22-slim
WORKDIR /opt/amazon-lager/backend
COPY . . 
RUN npm install
RUN npm run build
CMD ["node", "dist/app.js"]
