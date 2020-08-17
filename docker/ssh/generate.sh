#!/bin/bash

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"


if [ ! -f $DIR/id_rsa ] ; then
  echo "ssh-keygen -t rsa -N '""' -b 4096 -f $DIR/id_rsa"
  ssh-keygen -t rsa -b 4096 -f $DIR/id_rsa
fi




echo "Adding container's ssh public key to host's authorized_host file"
ssh-copy-id -i "$DIR/id_rsa" localhost
