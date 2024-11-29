#!/bin/bash

# import
source ./utils/colors_fonts.sh
source ./utils/log.sh

# logic

#Initial Log

echo -e ${gray}${bold}"\n\n################"
echo ${aqua}INSIGHTFUL INBOX
echo -e ${gray}${bold}"################\n\n"
# sleep 2

# getting teminal width
width=$(tput cols)

log Building Front End
# sleep 2
cd frontend
npm run build

# copying static build files
log Copying Static Build Files
# sleep 2
cd ../_backend/
rm -rf spa_frontend

mv ../frontend/build ./spa_frontend

log DONE
# sleep 2

# starting website
log Starting Application
# sleep 5
# open http://localhost:80

# starting backend

log Starting Backend !!!
node app/app.js --spa -p 80