require 'mongo'

class BaseRepository

  IMPLEMENT_ERROR = 'TODO: IMPLEMENT IT'

  attr_reader :mongo_client, :collection_name, :collection

  def initialize
    # TODO: Add Config
    mongo_connect_string = ENV['MONGO_CONNECT_STRING'] || 'mongodb://127.0.0.1:27017/webtree'
    @mongo_client        = Mongo::Client.new(mongo_connect_string)
    @collection_name     = self.class.to_s.downcase.gsub('repository','').to_sym
    @collection          = @mongo_client[@collection_name]
  end

  def find(id)
    @collection.find(_id: BSON::ObjectId.from_string(id)).to_a
  end

  def create(opts = {})
   @collection.insert_one(opts)
  end

  def update(id, params)
    @collection.find(_id: BSON::ObjectId.from_string(id))
               .find_one_and_replace(params, return_document: :after).to_a
  end

  def all
    @collection.find({}).to_a
  end

  def first
    @collection.find({}).to_a.first
  end

end
