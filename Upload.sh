echo First name: 
read bName
git checkout -b $bName

echo What did you change?
read myMessage
git add .
git commit -m "${myMessage}"

git push origin $bName