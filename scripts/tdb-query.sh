#!/bin/sh
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slicelock.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/dataset-topic.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-dimensions.rq
