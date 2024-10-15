#!/bin/bash

cp -r * ../test-cordova/MyApp/www/
cd ../test-cordova/MyApp/
cordova build android
