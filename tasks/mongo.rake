Dir[File.dirname(__FILE__) + '/../app/lib/bl/models/*'].each { |f| require "#{f}"}

namespace :mongo do
  task :seed do
    Sitemap.create(name: 'site_map',
    pages: [
      {
        _id: '1234567',
        name: 'Home Page',
        url:  'localhost:9292/',
        children: [
          {
            _id: '123456',
            name: 'About',
            url: 'localhost:9292/about'
          },
        ],
      },
      {
        _id: '123456jgroewf7',
        name: 'Some Page',
        url:  'localhost:9292/'
      }
    ])
  end
end
