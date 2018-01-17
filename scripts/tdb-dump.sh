#!/bin/sh
tdbdump --loc target/tdb_ssz | sed '\#example.org#d' | serdi -o ntriples - > target/everything.nt