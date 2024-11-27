#!/bin/bash

#generating a key
openssl genrsa -out key.pem

#certificate signing request
openssl req -new -key key.pem -out csr.pem

#generate ssl certificate
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem

