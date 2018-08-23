how to run me?
    in the main project directory (where yarn,package files)
    run the command: yarn
    if you dont have yarn please install 

    now go to the server directory
    and run the command : node server
    go back to the main project directory and run the command : yarn start

----------------------------------------------------------------------------------------

how to install yarn on linux client
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update
    sudo apt install yarn
