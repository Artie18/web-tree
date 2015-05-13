require 'sinatra'
require 'json'
require_relative './help/api_info'

Dir[File.dirname(__FILE__) + '/bl/models/*.rb'].each { |f| require "#{f}" }

class Server < Sinatra::Base
  # Configs
  set :root, File.dirname(__FILE__ + '../../')
  set :public_folder, 'public'

  configure :production do
    require 'newrelic_rpm'
  end


  get '/' do
    # apparently send_file not working, figure out why exactly
    File.read('app/views/index.html')
  end

  get '/api/version' do
    "API Version: #{ApiInfo::VERSION}"
  end

  get '/api/sitemaps/all' do
    content_type :json
    Sitemap.all(true).to_json
  end

  get '/api/sitemaps/first' do
    content_type :json
    Sitemap.first(true).to_json
  end

  post '/api/sitemaps/update' do
    content_type :json
    body  = JSON.parse(request.body.read, symbolize_names: true)
    saved = Sitemap.find_and_update(body[:_id], body)
    { saved: saved }.to_s
  end
end
