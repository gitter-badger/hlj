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

echo "hlj takes ${timeOfHlj}s"
echo "Jest takes ${timeOfJest}s"
echo "hlj is faster than Jest ${times} times"

expectedTimes=2
if test $times -lt $expectedTimes
then
  echo "Hlj shoud keep ${expectedTimes} times faster than Jest."
  exit 1
fi
