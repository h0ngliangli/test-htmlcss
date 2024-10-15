#!/bin/bash

rm -rf ../test-cordova/MyApp/www/*
cp -r * ../test-cordova/MyApp/www/
cd ../test-cordova/MyApp/
cordova build android