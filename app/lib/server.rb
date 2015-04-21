require 'sinatra'
# require './views'

class Server < Sinatra::Base
  # Configs
  set :root, File.dirname(__FILE__ + '../../')
  set :public_folder, 'public'

  get '/' do
    # apparently send_file not working, figure out why exactly
    File.read('app/views/index.html')
  end

end
