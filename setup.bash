#!/bin/bash
# -------------------------------------------------------------------------
#rm package*
rm -fr node_modules

#npm init
npm install --save express
npm install --save sqlite3
npm install --save body-parser

#sqlite3 db/database.db < db/schema.sql

npm install
npm run build
#npm run dev
nodejs ftd.js 10860 & npm start
# http://142.1.200.148:PORT_NUMBER

