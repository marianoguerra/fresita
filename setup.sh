#!/usr/bin/env sh
mkdir -p exporter/
cd exporter
for file in $(cat fop-deps.txt); do wget $file; done

sudo mkdir /var/lib/fop
sudo cp *.jar *.py /var/lib/fop/
sudo chown -R couchdb.couchdb /var/lib/fop/

sudo pip install BeautifulSoup couchapp

cd handlers
sh build.sh

echo "go and copy editor/.couchapprc.sample to editor/.couchapprc"
echo "and edit the username and password in them for one in your"
echo "couchdb installation, I wait here, press enter when done"
read

cd editor
couchapp push

echo "open your browser at http://http://localhost:5984/fresita/_design/editor/index.html"
echo "and login with a user and password from couchdb"
echo "edit, export and enjoy"

git clone https://github.com/rnewson/couchdb-lucene.git
cd couchdb-lucene
mvn
cd target
unzip couchdb-lucene-0.9.0-SNAPSHOT-dist.zip
cd couchdb-lucene-0.9.0-SNAPSHOT

echo "couchdb-lucene installed in"
echo $PWD
echo "run manually with"
echo "$PWD/bin/run"
