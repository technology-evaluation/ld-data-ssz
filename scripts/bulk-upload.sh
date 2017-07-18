#!/bin/bash

ENDPOINT="https://lindas-data.ch:8443/lindas"
GRAPH="https://linked.opendata.swiss/graph/zh/statistics"
DATAFILE="target/final.nt" 

function sparql-delete {
  curl -n \
       -X DELETE \
       -G $1 \
       --data-urlencode graph=$2  
}

function sparql-put {
  curl -n \
       -X POST \
       -H Content-Type:text/plain \
       -T $1\
       -G $2 \
       --data-urlencode graph=$3
}

# Main

mkdir $TMPDIR/staging
split -l 50000 $DATAFILE $TMPDIR/staging/nt-

echo "Deleting current graph..."
#sparql-delete $ENDPOINT $GRAPH

for file in $TMPDIR/staging/*
do
  filename=$(basename "$file")

  echo Processing $filename...
  echo $file
  sparql-put $file $ENDPOINT $GRAPH
done;

rm -f $TMPDIR/staging/*
rmdir $TMPDIR/staging


