#!/bin/bash

# make a directory for test tools if we don't have it already
DL_DIR="./app/test/tools"
if [ ! -d ${DL_DIR} ]
then
    mkdir ${DL_DIR}
fi

# download selenium into there
SELENIUM_DL=http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar
SELENIUM_FILENAME=${DL_DIR}"/selenium.jar"
if [ ! -e ${SELENIUM_FILENAME} ]
then
    wget ${SELENIUM_DL} -O ${SELENIUM_FILENAME}
fi

# grab chromedriver too
CHROMEDRIVER_FILENAME=${DL_DIR}"/chromedriver2_server"
if [ ! -e ${CHROMEDRIVER_FILENAME} ]
then

    if [[ "$OSTYPE" == "linux-gnu" ]]; then
        # LINUX
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-linux-ia32.tar.gz
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        # MAC OS
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-osx-ia32.zip
    elif [[ "$OSTYPE" == "cygwin" ]]; then
        # WINDOWS (CYGWIN)
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-win-ia32.zip
    else
        echo "Cannot detect operating system. OSTYPE is " $OSTYPE 1>&2
        exit 1
    fi

    ARCHIVE_PATH=${DL_DIR}"/chromedriver_archive"
    wget ${CHROMEDRIVER_DL} -O ${ARCHIVE_PATH}

    # figure out what type of archive we just downloaded and unpack accordingly
    if [[ ${CHROMEDRIVER_DL} == "*.zip" ]]
    then
        unzip ${ARCHIVE_PATH} -d ${DL_DIR}
    else
        tar xvfz ${ARCHIVE_PATH} -C ${DL_DIR}
    fi

    rm ${ARCHIVE_PATH}
fi

curl -X GET http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer
java -jar ${SELENIUM_FILENAME} -Dwebdriver.chrome.driver=${CHROMEDRIVER_FILENAME} &
sleep 0.5
mocha --recursive ./app/test -t 30000
