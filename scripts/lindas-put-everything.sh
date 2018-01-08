#!/bin/sh
ENDPOINT=${ENDPOINT:=http://localhost:5820/ssz}
echo "Posting to endpoint: $ENDPOINT"
curl -n \
     -X PUT \
     -H Content-Type:application/n-triples \
     -T target/everything.nt \
     -G $ENDPOINT \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics