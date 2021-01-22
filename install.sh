#!/bin/bash

mkdir log
npm i --production
pm2 start app.yml
pm2 startup systemd
pm2 save
echo "Installed csv-parser"
