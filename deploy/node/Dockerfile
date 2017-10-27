FROM hypriot/rpi-node:6.11.0-slim

WORKDIR "/usr/src/app"
COPY app .
RUN npm i

CMD ["npm", "run", "bundle_server"]
