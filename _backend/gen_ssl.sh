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


# this scripts starts the local server on a local machine with single command

# Get local IP address
ip_address=$(ifconfig | grep 'inet 192.168' | awk '{print $2}')

# removing old key.pem and cert.pem
if [ -f "./ssl_certificate/key.pem" ]; then
    # key.pem already exists
    echo "removed key.pem"
    rm -rf ./ssl_certificate/key.pem
fi;
if [ -f "./ssl_certificate/cert.pem" ]; then
    # cert.pem already exists
    echo "removed cert.pem"
    rm -rf ./ssl_certificate/cert.pem
fi;

# checking if the ca_cert.pem.enc and ca_key.pem.enc exists
if [ ! -f "./ssl_certificate/enc_ca_cert_key/ca_cert.pem.enc" ]; then
    # ca_cert.pem.key not exists
    echo ${bold}${magenta} encrypted ca_cert.pem.enc not found
    if [ ! -f "./ssl_certificate/enc_ca_cert_key/ca_key.pem.enc" ]; then
        # ca_cert.pem.key not exists
        echo ${bold}${magenta} encrypted ca_key.pem.enc not found
    fi;
    exit 2
fi;

if [ ! -f "./ssl_certificate/enc_ca_cert_key/ca_key.pem.enc" ]; then
    # ca_cert.pem.key not exists
    echo ${bold}${magenta} encrypted ca_key.pem.enc not found
    exit 2
fi;

echo
read -s -p "${bold}#${aqua} ca decryption key : ${aqua}" deckey
echo ${reset}
echo 
read -s -p "${bold}#${aqua} certificate authority encryption key : ${aqua}" key
echo ${reset}
echo

# removing ca_cert_key directory if already exists
if [ -d "./ssl_certificate/ca_cert_key" ]; then
    rm -rf ./ssl_certificate/ca_cert_key
fi;

# making directory ca_cert_key
if [ ! -d "./ssl_certificate/ca_cert_key" ]; then
    mkdir ./ssl_certificate/ca_cert_key
fi;

# decrypting ca certifiactea dn private key
echo "${bold}>${aqua} decrypting ca certificate and private key"

echo "${bold}>${aqua} decrypting ca certificate"
openssl aes-256-cbc -d  -a -in ./ssl_certificate/enc_ca_cert_key/ca_cert.pem.enc -out ./ssl_certificate/ca_cert_key/ca_cert.pem -pbkdf2  -pass pass:"$deckey"
if [ $? != 0 ]; then
    # failed to encrypt 
    echo ${reset}${bold}${magenta}Error : ${reset}${bold} failed to decrypt ca_cert.pem.enc
    rm -rf ./ssl_certificate/ca_cert_key
    exit 2
fi;


echo "${bold}>${aqua} decrypting ca private key"
openssl aes-256-cbc -d  -a -in ./ssl_certificate/enc_ca_cert_key/ca_key.pem.enc -out ./ssl_certificate/ca_cert_key/ca_key.pem -pbkdf2  -pass pass:"$deckey"
if [ $? != 0 ]; then
    # failed to encrypt 
    echo ${reset}${bold}${magents}Error : ${reset}${bold} failed to decrypt ca_key.pem.enc
    rm -rf ./ssl_certificate/ca_cert_key
    exit 2
fi;

# creating ssl certificate for ip_address
echo "${reset}${bold}>${aqua} generating ssl certifricate for ${lime}$ip_address ${aqua}and ${lime}localhost${reset}"
cd ./ssl_certificate/
bash ./new_ssl_certificate.sh << EOF
$ip_address
localhost
$ip_address
$key
EOF

if [ $? != 0 ]; then
    # failed to generate ssl certificate 
    echo ${reset}${bold}${magents}Error : ${reset}${bold} failed to genearate ssl certificate
    exit 2
fi;

# now copying the ssl cert and key

cp ./ssl_cert_key/full_ssl_cert.pem ./cert.pem

cp ./ssl_cert_key/ssl_private_key.pem ./key.pem

echo
echo ${lime}${bold} DONE SUCCESSFULLY



