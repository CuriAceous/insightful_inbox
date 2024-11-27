#!/bin/bash

function onFail(){
    if [ $? != 0 ]; then
        echo
        echo ${magenta}${bold}Error \> ${reset}${bold}$@
        exit 2
    fi
}

export -f onFail