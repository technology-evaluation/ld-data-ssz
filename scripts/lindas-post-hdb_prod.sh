#!/usr/bin/env bash
set -euo pipefail

curl -n \
     -X POST \
     -H Content-Type:application/n-triples \
     -T target/hdb-clean.nt \
     -G https://lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics
curl -n \
     -X POST \
     -H Content-Type:application/n-triples \
     -T target/hdb-meta.nt \
     -G https://lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics
