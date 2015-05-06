class Base
  IMPLEMENT_ERROR       = 'TODO: IMPLEMENT IT'
  BASE_CLASS_ERROR      = 'CAN NOT USE BASE CLASS'
  TYPE_IS_NOT_SUPPORTED = 'THIS TYPE IS NOT SUPPORTED'

  def self.all(json = false)
    res = repository.new.all
    json ? to_json(res) : res
  end

  def self.create(opts = {})
    opts.each do |k, v|
      validate_key!(k,v)
    end
    repository.new.create(opts)
  end

  def self.find(id = nil)
    raise IMPLEMENT_ERROR
  end

  def self.first(json = false)
    res = repository.new.first
    json ? to_json(res) : res
  end

  def self.last
    raise IMPLEMENT_ERROR
  end


  def self.find_by_name(name = nil)
    raise IMPLEMENT_ERROR
  end

  def save
    raise IMPLEMENT_ERROR
  end

  protected

  def self.to_json(docs)
    if docs.is_a? Array
      docs.map { |d| doc_to_json(d) }
    elsif docs.is_a? Hash
      doc_to_json(docs)
    else
      throw TYPE_IS_NOT_SUPPORTED
    end
  end

  def self.doc_to_json(doc)
    doc[:_id] = doc[:_id].to_s
    doc
  end

  def self.validate_key!(key, value)
    return true if value.is_a? keys[key]
    raise "Key #{key} is supposed to be type #{keys[key]} (you have #{value})"
  end

  def self.keys
    raise BASE_CLASS_ERROR
  end

  def self.repository
    raise BASE_CLASS_ERROR
  end

end
