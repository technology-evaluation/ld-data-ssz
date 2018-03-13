#!/bin/sh
tdbupdate --loc=target/tdb_ssz --update=sparql/raum-tree.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slicelock.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/dataset-topic.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/datacube-label.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-dimensions.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slices-code.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-undefined.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-xxx-object.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-xxx-predicate.rq