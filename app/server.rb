class Server
  def self.call(env)
    parser = Parser.new self
    env = parser.call env

    [200, {}, env['params'].inspect]
  end
end
