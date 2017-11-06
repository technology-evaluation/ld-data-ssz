#!/bin/sh
curl -n \
     -X PUT \
     -H Content-Type:text/turtle \
     -T input/void.ttl \
     -G https://lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics