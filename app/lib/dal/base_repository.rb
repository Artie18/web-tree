require 'mongo'

class BaseRepository

  IMPLEMENT_ERROR = 'TODO: IMPLEMENT IT'

  attr_reader :mongo_client, :collection_name, :collection

  def initialize
    # TODO: Add Config
    @mongo_client      = Mongo::Client.new([ '127.0.0.1:27017' ], :database => 'webtree')
    @collection_name   = self.class.to_s.downcase.gsub('repository','').to_sym
    @collection        = @mongo_client[@collection_name]
  end


  def create(opts = {})
   @collection.insert_one(opts)
  end

  def all
    @collection.find({}).to_a
  end

  def first
    @collection.find({}).to_a.first
  end

end
