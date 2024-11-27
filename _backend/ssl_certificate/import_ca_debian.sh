#!/bin/bash

# this scripts import your CA to debian , ubuntu

sudo cp ./ca_cert_key/ca_cert.pem /usr/local/share/ca-certificates/your_ca_cert.crt

sudo update-ca-certificates