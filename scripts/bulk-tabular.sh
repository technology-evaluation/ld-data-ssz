#!/bin/bash
rm target/hdb-all.nt
for file in ./tmp/*.csv
do
  filename=$(basename "$file")

  if [ ! -f "target/"$filename"-transformed" ]
  then
    echo Processing $filename...
    #curl -XPOST -H 'Accept: text/turtle' -H 'Content-Type:text/csv' --data-binary "@"$file -o "target/"$filename"-transformed" 'localhost:8310/?refinejson=http://ktk.netlabs.org/misc/rdf/bar-config.json' 
    cp $file input/hdb.csv
    rdf serialize input/hdb.csv --output-format ntriples -o target/hdb.nt
    cat target/hdb.nt >> target/hdb-all.nt
    rm target/hdb.nt
  else
    echo Found "target/"$filename"-transformed", skipping $file
  fi
done;