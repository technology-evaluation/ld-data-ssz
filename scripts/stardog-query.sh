#!/bin/sh
stardog query ssz-staging sparql/qb-slicelock.rq
stardog query ssz-staging sparql/dataset-view.rq
stardog query ssz-staging sparql/view-shape-dimensions.rq
