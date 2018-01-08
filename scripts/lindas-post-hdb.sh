#!/bin/sh
ENDPOINT=${ENDPOINT:=http://localhost:5820/ssz}
echo "Posting to endpoint: $ENDPOINT"
curl -n \
     -X POST \
     -H Content-Type:application/n-triples \
     -T target/hdb-clean.nt \
     -G $ENDPOINT\
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics
curl -n \
     -X POST \
     -H Content-Type:application/n-triples \
     -T target/hdb-meta.nt \
     -G $ENDPOINT \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics