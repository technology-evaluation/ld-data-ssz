#!/bin/sh
TODAY="$(date "+%Y-%m-%d")"
cat input/void.ttl| sed "s/%%DATEISSUED%%/${TODAY}/g" > target/void.ttl
curl -n \
     -X PUT \
     -H Content-Type:text/turtle \
     -T target/void.ttl \
     -G https://lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics