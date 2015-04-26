Dir[File.dirname(__FILE__) + '/../app/lib/bl/models/*'].each { |f| require "#{f}"}

namespace :mongo do
  task :seed do
    Sitemap.create(name: 'test')
  end
end
