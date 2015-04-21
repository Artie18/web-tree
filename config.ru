require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require './app/lib/server'

set :environment, :development
set :run, false
set :raise_errors, true

run Server
