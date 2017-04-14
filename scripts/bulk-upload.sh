#!/bin/bash

ENDPOINT="https://lindasprd.netrics.ch:8443/lindas"
GRAPH="https://linked.opendata.swiss/graph/zh/statistics"
DATAFILE="target/hdb-all.nt" 

function sparql-put {
  curl -n \
       -X PUT \
       -H Content-Type:text/plain \
       -T $1\
       -G $2 \
       --data-urlencode graph=$3
}

# Main

mkdir $TMPDIR/staging
split -l 50000 $DATAFILE $TMPDIR/staging/nt-

for file in $TMPDIR/staging/*
do
  filename=$(basename "$file")

  echo Processing $filename...
  echo $file
  sparql-put $file $ENDPOINT $GRAPH
done;

rm -f $TMPDIR/staging/*
rmdir $TMPDIR/staging


