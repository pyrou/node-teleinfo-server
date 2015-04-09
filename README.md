# node-teleinfo-server

[![npm version](https://img.shields.io/npm/v/teleinfo-server.svg?style=flat)](https://www.npmjs.com/package/teleinfo-server)
[![Code Climate](https://codeclimate.com/github/pyrou/node-teleinfo-server/badges/gpa.svg)](https://codeclimate.com/github/pyrou/node-teleinfo-server)
[![Dependency Status](https://david-dm.org/pyrou/node-teleinfo-server.svg)](https://david-dm.org/pyrou/node-teleinfo-server)

UDP server that is listening for raw "Teleinfo" (EDF) datagrams

## Installation

```bash
npm install -g teleinfo-server
```

## Usage

`teleinfo-server` can be used standalone to decode and print out received "Teleinfo" datagrams

```text
Usage:
  teleinfo-server [--port=10000] [--host=0.0.0.0] [--wait=0]
  teleinfo-server -h | --help | --version

Options:
  -p, --port=PORT  Specify on which port the server is listening
  -H, --host=HOST  Specify on which host the server is listening
  -w, --wait=TIME  Time in seconds to wait between reading two datagrams
                   During the wait time, datagrams received are dropped.
                   The default value is 0
  -h, --help       display this help
  -v, --version    show version
```

## Example

On the server, run following command :

```bash
# node teleinfo-server -p 8000 -w 5
```

Server is now listening incomming datagrams on port `8000`.
However, it will only handle one request per 5 seconds.

To test the server, try this command on any machine on the same LAN

```bash
echo -en "MOTDETAT 000000 B\r\nADCO 200000294579 =\r\nOPTAR\
IF BASE 0\r\nISOUSC 30 9\r\nBASE 002565285 ,\r\nPTEC TH.. $\
\r\nIINST 002 Y\r\nIMAX 030 B\r\nPAPP 00420 '\r\n\x03" \
| socat - UDP-DATAGRAM:255.255.255.255:8000,broadcast
```

The expected output on the server is :
```javascript
{ MOTDETAT: '000000',
  ADCO: '200000294579',
  OPTARIF: 'BASE',
  ISOUSC: '30',
  BASE: '002565285',
  PTEC: 'TH..',
  IINST: '002',
  IMAX: '030',
  PAPP: '00420',
  timestamp: 1422525194 }
```

Server still accept further datagrams.
