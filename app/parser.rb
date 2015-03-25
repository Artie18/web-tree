class Parser
  def initialize(app)
    @app = app
  end

  def call(env)
    request = Rack::Request.new env
    env['params'] = request.params
    @app.call env
  end
end