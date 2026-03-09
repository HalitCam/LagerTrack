FROM node:22-slim
WORKDIR /opt/backend
COPY . . 
RUN npm install
RUN npm run build
CMD ["node", "dist/app.js"]
