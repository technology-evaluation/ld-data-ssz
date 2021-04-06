#!/usr/bin/env bash
set -u
echo "Generating views..."
echo "Writing to endpoint: $ENDPOINT"
echo "Fetching data from: $QUERYENDPOINT"
./ssz-views/bin/ssz-views.js generate2store \
  --endpoint=$QUERYENDPOINT \
  --base=https://ld.stadt-zuerich.ch/statistics/view/ \
  --index=https://ld.stadt-zuerich.ch/catalog/SSZ/view \
  --output-graph=https://lindas.admin.ch/stadtzuerich/stat/views \
  --output-user=$GRAPHSTORE_USERNAME \
  --output-password=$GRAPHSTORE_PASSWORD \
  --output-clear \
  ./input/kuration.txt \
  $ENDPOINT