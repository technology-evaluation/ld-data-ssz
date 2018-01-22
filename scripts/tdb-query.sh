#!/bin/sh
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slices.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/slice-observation.rq