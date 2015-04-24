require_relative '../base'

class Page < Base

  def initialize

  end

  def all_for_sitemap(project_id = nil)
    raise IMPLEMENT_ERROR
  end

  def all_for_sitemap_with_name(sitemap_name = nil)
    raise IMPLEMENT_ERROR
  end

end
