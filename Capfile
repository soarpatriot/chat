# Load DSL and Setup Up Stages
require 'capistrano/setup'

# Includes default deployment tasks
require 'capistrano/deploy'

# Includes tasks from other gems included in your Gemfile
#
# For documentation on these, see for example:
#
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#
require 'capistrano/rvm'
require 'capistrano/nvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
require 'capistrano/bundler'

require 'erb'

def from_template file
  tmp_file = "/tmp/#{file}.tmp"
  info "Generating from 'config/deploy/templates/#{file}' to '#{tmp_file}'"
  template = File.read "config/deploy/templates/#{file}"
  result = ERB.new(template).result self.send(:binding)
  File.open(tmp_file, "w"){|f| f.write result }
  tmp_file
end
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'

# Loads custom tasks from `lib/capistrano/tasks' if you have any defined.
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
