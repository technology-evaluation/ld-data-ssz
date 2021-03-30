#!/usr/bin/env bash
set -eo pipefail

set +u
ENDPOINT=${ENDPOINT:=http://localhost:5820/lindas}
set -u

echo "Posting to endpoint: $ENDPOINT"
curl -n \
     -X PUT \
     -H Content-Type:application/n-triples \
     -T output/transformed.nt \
     -G $ENDPOINT \
     --data-urlencode graph=https://lindas.admin.ch/stadtzuerich/stat
