
for file in ./tmp/*
do
  filename=$(basename "$file")

  if [ ! -f "tmp/"$filename".csv" ]
  then
    echo Processing $filename...
    head -n 1 tmp/xaa | cat - "tmp/"$filename > "tmp/"$filename".csv" 
  else
    echo Found "tmp/"$filename".csv", skipping $file
  fi
done;


