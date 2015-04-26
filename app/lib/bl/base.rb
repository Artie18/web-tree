class Base
  IMPLEMENT_ERROR = 'TODO: IMPLEMENT IT'

  def self.all
    self.class
  end

  def self.create(opts = {})
    raise IMPLEMENT_ERROR
  end

  def self.find(id = nil)
    raise IMPLEMENT_ERROR
  end

  def self.first
    raise IMPLEMENT_ERROR
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


end
