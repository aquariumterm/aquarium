#!/bin/bash

# make a directory for test tools if we don't have it already
DL_DIR="./tmp"
if [ ! -d ${DL_DIR} ]
then
    mkdir -p ${DL_DIR}
fi

# download selenium into there
SELENIUM_DL=http://selenium-release.storage.googleapis.com/2.45/selenium-server-standalone-2.45.0.jar
SELENIUM_FILENAME=${DL_DIR}"/selenium.jar"
if [ ! -e ${SELENIUM_FILENAME} ]
then
    curl -o ${SELENIUM_FILENAME} ${SELENIUM_DL}
fi

# grab chromedriver too
CHROMEDRIVER_FILENAME=${DL_DIR}"/chromedriver2_server"
if [ ! -e ${CHROMEDRIVER_FILENAME} ]
then

    if [[ ${OSTYPE} == "linux-gnu" ]]; then
        # LINUX
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-linux-ia32.tar.gz
    elif [[ ${OSTYPE} == "darwin"* ]]; then
        # MAC OS
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-osx-ia32.zip
    elif [[ ${OSTYPE} == "cygwin" ]]; then
        # WINDOWS (CYGWIN)
        CHROMEDRIVER_DL=https://s3.amazonaws.com/node-webkit/v0.8.0/chromedriver2-nw-v0.8.0-win-ia32.zip
    else
        echo "Cannot detect operating system. OSTYPE is " $OSTYPE 1>&2
        exit 1
    fi

    ARCHIVE_PATH=${DL_DIR}"/chromedriver_archive"
    curl -o ${ARCHIVE_PATH} ${CHROMEDRIVER_DL}

    # figure out what type of archive we just downloaded and unpack accordingly
    if [[ ${CHROMEDRIVER_DL} == "*.zip" ]]
    then
        unzip ${ARCHIVE_PATH} -d ${DL_DIR}
    else
        tar -xvzf ${ARCHIVE_PATH} -C ${DL_DIR}
    fi

    rm ${ARCHIVE_PATH}
fi

# Make sure no selenium server is running
curl --fail --silent -X GET http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer

# Symlink the nodewebkit binary to the chromedriver2_server directory
ln -s ../../node_modules/nodewebkit/nodewebkit node-webkit.app

# Launch the selenium server
java -jar ${SELENIUM_FILENAME} -Dwebdriver.chrome.driver=${CHROMEDRIVER_FILENAME} &

# Run tests

npm test
