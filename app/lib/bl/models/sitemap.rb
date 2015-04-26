require_relative '../base'
require_relative '../../dal/sitemap_repository'

class Sitemap < Base

  KEYS = {
    name: String,
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
