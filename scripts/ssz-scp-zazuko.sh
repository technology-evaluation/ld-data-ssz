#!/bin/sh
gzip target/everything.nt
scp target/everything.nt.gz swiss.resc.info:~/docker/ssz-data/target
ssh swiss.resc.info "rm ~/docker/ssz-data/target/everything.nt"
ssh swiss.resc.info "gzip -d ~/docker/ssz-data/target/everything.nt.gz"
ssh swiss.resc.info "cd ~/docker/ssz-data && env ENDPOINT=http://data.zazuko.com:5820/ssz ./scripts/lindas-put-everything.sh"