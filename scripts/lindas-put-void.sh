#!/usr/bin/env bash
set -eo pipefail

set +u
ENDPOINT=${ENDPOINT:=http://localhost:5820/ssz}
set -u

echo "Posting to endpoint: $ENDPOINT"
curl -n \
     -X PUT \
     -H Content-Type:text/turtle \
     -T target/void.ttl \
     -G $ENDPOINT \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics
