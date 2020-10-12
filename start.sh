#!/bin/bash

variables=()

[[ -n "$ENDPOINT" ]] && variables+=(--variable="endpoint=$ENDPOINT")
[[ -n "$INPUT_DIR" ]] && variables+=(--variable="inputDir=$INPUT_DIR")
[[ -n "$OUTPUT" ]] && variables+=(--variable="targetFile=$OUTPUT")
[[ -n "$MAPPINGS_DIR" ]] && variables+=(--variable="mappingsDir=$MAPPINGS_DIR")
[[ -n "$GRAPHSTORE_USERNAME" ]] && variables+=(--variable="user=$GRAPHSTORE_USERNAME")
[[ -n "$GRAPHSTORE_PASSWORD" ]] && variables+=(--variable="password=$GRAPHSTORE_PASSWORD")
[[ -n "$GRAPH" ]] && variables+=(--variable="graph=$GRAPH")


node  ./node_modules/.bin/barnard59 \
  run -v \
  --format text/turtle \
  "${variables[@]}" \
 --pipeline=urn:pipeline:xrm#MainFile \
 pipelines/main.ttl
