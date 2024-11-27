#!/bin/bash

# this scripts removes your CA
sudo rm -rf /usr/local/share/ca-certificates/*
sudo update-ca-certificates --fresh