#!/bin/bash

# color
# Foreground colors
  black=$(tput setaf 0)        #000000
  maroon=$(tput setaf 1)       #800000
  green=$(tput setaf 2)        #008000
  olive=$(tput setaf 3)        #808000
  navy=$(tput setaf 4)         #000080
  purple=$(tput setaf 5)       #800080
  teal=$(tput setaf 6)         #008080
  silver=$(tput setaf 7)       #c0c0c0
  gray=$(tput setaf 8)         #808080
  red=$(tput setaf 9)          #ff0000
  lime=$(tput setaf 10)        #00ff00
  yellow=$(tput setaf 11)      #ffff00
  blue=$(tput setaf 12)        #0000ff
  magenta=$(tput setaf 13)     #ff00ff
  aqua=$(tput setaf 14)        #00ffffo
  white=$(tput setaf 15)       #ffffff
  red=`tput setaf 1`
  green=`tput setaf 2`
  reset=`tput sgr0`

  bold=`tput bold`
# echo "${red}red text ${green}green text${reset}"
# this encrypts ca_cert.pem and ca_key.pem and saves it in ./ssl_certificate/enc_ca_cert_key/
echo "to encrypt ca_cert.pem and ca_key.pem"
read -s -p "${aqua}enter encryption key : ${aqua}" key
echo ${reset}

# checking if ca_cert.pem and ca_key.pem exists

if [ ! -f "./ca_cert_key/ca_cert.pem" ]; then
    # ca_cert.pem not exists
    echo "${bold}${magenta} ca_cert.pem not found"
    if [ ! -f "./ca_cert_key/ca_key.pem" ]; then
        # ca_key.pem not exists
        echo "${bold}${magenta} ca_key.pem not found"
    fi;
    exit 2
fi;
if [ ! -f "./ca_cert_key/ca_key.pem" ]; then
    # ca_key.pem not exists
    echo "${bold}${magenta} ca_key.pem not found"
    exit 2
fi;

# checking if enc_ca_cert_key directory exists
if [ ! -d "enc_ca_cert_key" ]; then
    # create folder
    mkdir ./enc_ca_cert_key
fi;

# if ca_cert and ca_key exists

echo "${bold}${lime} encrypting ca_cert and ca_key"

openssl aes-256-cbc -a -in ./ca_cert_key/ca_key.pem -out ./enc_ca_cert_key/ca_key.pem.enc -pbkdf2  -pass pass:"$key"

if [ $? != 0 ]; then
    # failed to encrypt 
    echo ${bold}${magents}Error : ${reset}${bold} failed to encrypt ca_key.pem
    exit 2
fi;


openssl aes-256-cbc -a -in ./ca_cert_key/ca_cert.pem -out ./enc_ca_cert_key/ca_cert.pem.enc -pbkdf2  -pass pass:"$key"

if [ $? != 0 ]; then
    # failed to encrypt 
    echo ${bold}${magents}Error : ${reset}${bold} failed to encrypt ca_cert.pem
    exit 2
fi;


echo ${bold}${lime} Encryption DONE
echo ${reset}${bold} saved to enc_ca_cert_key directory