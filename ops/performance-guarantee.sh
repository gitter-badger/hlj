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

times=$(expr $timeOfJest / $timeOfHlj)

expectedTimes=2
if test $times -lt $expectedTimes
then
  echo "hlj takes ${timeOfHlj}s"
  echo "Jest takes ${timeOfJest}s"
  echo "Hlj shoud keep ${expectedTimes} times more than Jest."
  exit 1
fi
