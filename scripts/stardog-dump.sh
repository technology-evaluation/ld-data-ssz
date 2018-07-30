#!/usr/bin/env bash
set -euo pipefail

stardog data export -f ntriples  ssz-staging target/stardog.nt
cat target/stardog.nt | sed '\#example.org#d' > target/everything.nt
rm target/stardog.nt
