#!/bin/sh
tdbdump --loc target/tdb_ssz | sed '\#example.org#d' | serdi -o ntriples - | gzip --stdout > target/everything.nt.gz