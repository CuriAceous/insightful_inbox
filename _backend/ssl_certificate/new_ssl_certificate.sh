#!/bin/bash

# colors and fonts
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

# log
function log () {
    echo
    echo ${reset}${bold}\> ${aqua}$@${reset}
};

function onFail(){
    if [ $? != 0 ]; then
        echo
        echo ${magenta}${bold}Error \> ${reset}${bold}$@
        exit 2
    fi
}

# =============================
log "generating ssl certificate for server"

echo =======================================
echo
echo ${bold}"  YOU can generate ssl certificate for :" 
echo
echo ">  dns names:    eg createive.home"
echo
echo ">  wildcard certificate : issue is once and valid for all subdomains"
echo
echo ">  ipaddress : eg 192.168.29.155"

echo 
echo "note : when genereate for one ip address , ip should not change , if change then generate new certificate for new ip"
echo
echo ${reset}=======================================


# making ssl_cert_key directory
if [ ! -d "./ssl_cert_key" ]; then
    # when directory not exists
    mkdir "ssl_cert_key"

fi;
# =================
log generating private key for certificate

echo
echo "${magenta}${bold}Important : ${reset}protect the private key and keep is secure"
echo 

openssl genrsa -out ./ssl_cert_key/ssl_private_key.pem 4096

onFail "failed to generate private key "

# generating certificate signing request
log generating certificate signing request
echo
echo -n "Enter subject for csr (not important) : ";
read subject
# checking if subject is provided
if [ -z $subject ]; then
    # if no subject is provided
    subject="anuragv"
fi;

openssl req -new -sha256 -subj "/CN=$subject" -key ./ssl_cert_key/ssl_private_key.pem -out ./ssl_cert_key/ssl_csr.csr

# accepthing dns names and ip address

echo
echo -n ${bold}Enter dns name \( eg : *.domain.com\)  : ${aqua} 
read domain

echo ${reset}
echo -n ${bold}Enter ip address \( eg : 192.168.1.1  \) : ${aqua}
read ip
echo -n ${reset}


# generating extfile
extData="subjectAltName"

# if both dns and ip
if [ ! -z $domain ] && [ ! -z $ip ] ; then
    # both domain and ip
    extData="$extData=DNS:$domain,IP:$ip"
    
else
    # if both not provided
    if [ ! -z $domain ]; then
        # only domain
        extData="$extData=DNS:$domain"
    else
        # only ip
        extData="$extData=IP:$ip"
    fi;
fi;


echo -n $extData > ./ssl_cert_key/extfile.cnf
onFail "failed to create extfile.cnf"

# 
log "generatig ssl certificate for domain: $domain and ip:$ip"

openssl x509 -req -sha256 -days 3650  -in ./ssl_cert_key/ssl_csr.csr -CA ./ca_cert_key/ca_cert.pem -CAkey ./ca_cert_key/ca_key.pem -out ./ssl_cert_key/ssl_cert.pem -extfile ./ssl_cert_key/extfile.cnf -CAcreateserial

onFail "failed to generate ssl certificate"

log "combining CA certificate and SSL certificate"

cat ./ssl_cert_key/ssl_cert.pem > ./ssl_cert_key/full_ssl_cert.pem
onFail "failed to write ssl_cert.pem to full_ssl_cert.pem"

cat ./ca_cert_key/ca_cert.pem >> ./ssl_cert_key/full_ssl_cert.pem
onFail "failed to copy CA certificate to full_ssl_cert.pem"


echo ${lime}${bold}DONE${reset}
