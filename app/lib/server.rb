require 'sinatra'
require_relative './help/api_info'

Dir[File.dirname(__FILE__) + '/bl/models/*.rb'].each { |f| require "#{f}" }

class Server < Sinatra::Base
  # Configs
  set :root, File.dirname(__FILE__ + '../../')
  set :public_folder, 'public'

  get '/' do
    # apparently send_file not working, figure out why exactly
    File.read('app/views/index.html')
  end

  get '/api/version' do
    "API Version: #{ApiInfo::VERSION}"
  end

  get '/api/sitemaps/all' do
    Sitemap.all
  end

end
