#!/bin/sh
TODAY="$(date "+%Y-%m-%d")"
NOW="$(date -u "+%Y-%m-%dT%H:%M:%SZ")"
cat input/void.ttl| sed "s/%%DATEISSUED%%/${TODAY}/g" | sed "s/%%DATECREATED%%/${NOW}/g" > target/void.ttl
curl -n \
     -X PUT \
     -H Content-Type:text/turtle \
     -T target/void.ttl \
     -G https://test.lindas-data.ch:8443/lindas \
     --data-urlencode graph=https://linked.opendata.swiss/graph/zh/statistics