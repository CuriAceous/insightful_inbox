### instructions to import __CA certificate__ to __os__ and __browsers__


> If you want to send or receive messages signed by root authorities and these authorities are not installed on the server, you must add a trusted root certificate manually.

> Use the following steps to add or remove trusted root certificates to/from a server.


## Linux (Ubuntu, Debian)

> __add__<br>
to add your CA
1. Copy your CA to dir ___/usr/local/share/ca-certificates/___
2. remane ___cert.pem___ to ___cert.crt___
3. Use command: ___sudo cp cert.crt /usr/local/share/ca-certificates/cert.crt___
4. Update the CA store: ___sudo update-ca-certificates___

> __remove__ <br>
    to remove your CA<br>
    update your CA store

run commad ___sudo update-ca-certificates --fresh___


## Windows

> __add__

Use command:

___certutil -addstore -f "ROOT" new-root-certificate.crt___

> __remove__

Use command:

__certutil -delstore "ROOT" serial-number-hex__

