class Base
  IMPLEMENT_ERROR  = 'TODO: IMPLEMENT IT'
  BASE_CLASS_ERROR = 'CAN NOT USE BASE CLASS'

  def self.all
    raise IMPLEMENT_ERROR
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

  def self.first
    repository.new.first
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
