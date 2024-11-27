#!/bin/bash

# this scripts create a local cerficiate authority

source ./scripts/colors_fonts.sh
source ./scripts/log.sh
source ./scripts/onFail.sh
# install openssl if not
source ./scripts/verify_open_ssl.sh

log "generating private key for certificate authority"

# checking if ca_cert_key directory exists
if [ ! -d "./ca_cert_key" ]; then
    mkdir "ca_cert_key"
fi;

echo 
openssl genrsa -aes256 -out ./ca_cert_key/ca_key.pem 4096
onFail "failed to create ca private key"

echo
echo  ${lime}${bold}"ca private key created successfully${reset}"

echo
echo keep you passphrase ultra safe "we need passphrase to singh new certificates"
echo make sure the ca_key.pem is very safe and secure

# creating certificate for certificate authority

log "generating ca certificate"
echo 
openssl req -new -x509 -sha256 -days 3650 -key ./ca_cert_key/ca_key.pem -out ./ca_cert_key/ca_cert.pem

onFail "failed to generate certificate for ca"

# viewing certificate
openssl x509 -in ./ca_cert_key/ca_key.pem -text -noout

echo
echo ${lime}${bold}"successfully generated certificate for ca";