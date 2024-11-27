#!/bin/bash

# checking json compiler verion

openssl &> /dev/null

if [ $? != "0" ]; then
    # json compiler not present
    log "installing openssl"
    echo
    # command
    sudo apt-get install openssl
    
fi;