source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.2'
gem 'pg', '~> 1.1', '< 2.0'
gem 'puma', '~> 3.12'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '~> 4.1'
gem 'webpacker', "~> 3.5"
gem 'bootsnap'

gem 'coffee-rails', '~> 4.2'
gem 'turbolinks', '~> 5.2'
gem 'jbuilder', '~> 2.8'


group :development, :test do
  gem 'byebug', "~> 10.0", platforms: [:mri, :mingw, :x64_mingw]
  gem 'selenium-webdriver', "~> 3.141"
  gem "rspec-rails", "~> 3.8"
  gem "factory_bot_rails", "~> 4.11"
end

group :development do
  gem 'web-console', '~> 3.7'
  gem 'listen', '~> 3.1', '< 3.2'
  gem 'spring', "~> 2.0"
  gem 'spring-watcher-listen', '~> 2.0'
  gem "annotate", "~> 2.7"
  gem "erb2haml", "~> 0.1"
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "react-rails", "~> 2.4"
gem "haml", "~> 5.0"
gem "friendly_id", "~> 5.2"
gem "devise", "~> 4.5"
gem "cancancan", "~> 2.3"
gem "gibbon", "~> 3.2"
gem "carrierwave", "~> 1.3"
gem "faker", "~> 1.9"
gem "figaro", "~> 1.1"
gem "meta-tags", "~> 2.11"
gem "rack-cors", "~> 1.0"
gem "rack-attack", "~> 5.4"
gem 'fog', require: 'fog/aws'
