rdf serialize input/hdb.csv --output-format ntriples -o target/hdb.nt
rdf serialize input/gruppenliste.csv --output-format ntriples -o target/gruppenliste.nt
rdf serialize input/raum.csv --output-format ntriples -o target/raum.nt
rdf serialize input/kennzahlen.csv --output-format ntriples -o target/kennzahlen.nt
cat target/hdb-all.nt > target/final.nt
cat target/gruppenliste.nt >> target/final.nt
cat target/raum.nt >> target/final.nt
cat target/kennzahlen.nt >> target/final.nt
rapper -i guess -o ntriples input/qb.ttl >> target/final.nt