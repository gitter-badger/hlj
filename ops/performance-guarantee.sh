#! /bin/sh

time=0
getTimeOf() {
  start=$(date +%s)
  $1 > /dev/null
  end=$(date +%s) 
  time=$((end - start))
}

getTimeOf 'npm run test'
timeOfHlj=$time

if ! command -v jest &> /dev/null
then
  npm i -g jest
fi

getTimeOf 'jest test/'
timeOfJest=$time

echo $timeOfHlj
echo $timeOfJest
times=$(expr $timeOfJest / $timeOfHlj)
echo $times

if test $times -lt 3
then
  exit 1
fi
