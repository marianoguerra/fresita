#!/bin/bash
erlc fresita.erl && sudo cp fresita.beam /usr/lib/couchdb/erlang/lib/couch-1.0.1/ebin/ && sudo /etc/init.d/couchdb stop && sudo /etc/init.d/couchdb start
