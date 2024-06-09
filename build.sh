#!/bin/sh
npm i
npm run build
screen -X -S site_run_prod_front quit
screen -S site_run_prod_front -d -m npm run start