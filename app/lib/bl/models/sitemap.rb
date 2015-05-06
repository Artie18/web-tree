require_relative '../base'
require_relative '../../dal/sitemap_repository'

class Sitemap < Base

  KEYS = {
    name: String,
    ## TODO: IMPLEMENT EMBEDED DOCUMENTS 
    pages: Array
  }

  def initialize

  end

  protected

  def self.repository
    SitemapRepository
  end

  def self.keys
    KEYS
  end
end
