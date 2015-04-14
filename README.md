# Web Tree 
## Description: 
No purpose App To create SiteMap.

There is no Production version yet. 


### Languages: 
- JS
- Rubinius

### Technologies Used: 
- **Rack** as web framework
- **Cassandra** as db

## Install (*on Mac OS X*): 

#### Install Cassandra (*with Homebrew*): 
  - Install cassandra from brew: `brew install cassandra`
  - Install python (*if needed*): `brew install python`
  - Install python packeg for CQL: `pip install cql`

#### Install RVM (*if needed*): 
  You can just go [here](https://rvm.io/rvm/install)

#### Install Gems: 
  - Go to the cloned folder
  - Install Rubinius if needed (*it would tell what to do*)
  - Execute `bundle install` to install all gems 

## Run Application: 
  - Start Cassandra with `launchctl load /usr/local/opt/cassandra/homebrew.mxcl.cassandra.plist`
  - Start the app `rackup` (*it will start the app on port 9292*)
  



