#!/bin/sh
curl -n \
     -X POST \
     -H Content-Type:application/n-triples \
     -T target/dimensions.nt \
     -G https://test.lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics