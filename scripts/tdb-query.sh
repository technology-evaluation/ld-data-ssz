#!/usr/bin/env bash
set -euo pipefail

tdbupdate --loc=target/tdb_ssz --update=sparql/raum-tree.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/raum-collection.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/raum-raumebene.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/themenbaum-level1-3.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/themenbaum-level1-2.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/themenbaum-level1.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/gruppenliste-hierarchie.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slicelock.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/dataset-topic.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/datacube-label.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/quelle.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/glossar.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/fussnote.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-dimensions.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-attributes.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-minmax.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-datenstand.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-update.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-license-ccby.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/view-shape-license-cc0.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/slice-shape.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/qb-slices-code.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/measureproperty-unit.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/synonyme.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-undefined.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-xxx-object.rq
tdbupdate --loc=target/tdb_ssz --update=sparql/delete-xxx-predicate.rq
