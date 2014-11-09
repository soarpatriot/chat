require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
# require 'mina/rbenv'  # for rbenv support. (http://rbenv.org)
# require 'mina/rvm'    # for rvm support. (http://rvm.io)

# Basic settings:
#   domain       - The hostname to SSH to.
#   deploy_to    - Path to deploy into.
#   repository   - Git repo to clone from. (needed by mina/git)
#   branch       - Branch name to deploy. (needed by mina/git)

set :domain, 'soaror.com'
set :deploy_to, '/data/www/chat'
set :repository, 'https://github.com/soarpatriot/chat.git'
set :branch, 'master'
set :ppy, true
set :socket_path, 'shared/tmp/sockets/app.socket'
# Manually create these paths in shared/ (eg: shared/config/database.yml) in your server.
# They will be linked in the 'deploy:link_shared_paths' step.
set :shared_paths, ['node_modules','config/database.js','log', 'tmp','config/redis-config.js']

# Optional settings:
#   set :user, 'foobar'    # Username in the server to SSH to.
#   set :port, '30000'     # SSH port number.

# This task is the environment that is loaded for most commands, such as
# `mina deploy` or `mina rake`.
task :environment do
  # If you're using rbenv, use this to load the rbenv environment.
  # Be sure to commit your .rbenv-version to your repository.
  # invoke :'rbenv:load'

  # For those using RVM, use this to load an RVM version@gemset.
  # invoke :'rvm:use[ruby-1.9.3-p125@default]'
  queue %[nvm  use 0.10.28]
end

# Put any custom mkdir's in here for when `mina setup` is ran.
# For Rails apps, we'll make some of the shared paths that are shared between
# all releases.
task :setup => :environment do
  queue! %[mkdir -p "#{deploy_to}/shared/log"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/log"]

  queue! %[mkdir -p "#{deploy_to}/shared/config"]
  queue! %[chmod g+rx,u+rwx "#{deploy_to}/shared/config"]

  queue! %[touch "#{deploy_to}/shared/config/database.yml"]
  queue  %[echo "-----> Be sure to edit 'shared/config/database.yml'."]
end

desc "Deploys the current version to the server."
task :deploy => :environment do
  deploy do
    # Put things that will set up an empty directory into a fully set-up
    # instance of your project.
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    queue %[npm install]
    queue %[rm "#{deploy_to}/#{socket_path}"]

    to :launch do

      #invoke :install_dependency
      # queue %[rm "#{socket_path}"]
      # queue 'NODE_ENV=production kirua stop'
      #queue %[rm "#{deploy_to}/#{socket_path}"]
      queue 'NODE_ENV=production kirua restart app.js'
      #queue %[chmod -R 666 "#{deploy_to}/#{socket_path}"]
      # queue "touch #{deploy_to}/tmp/restart.txt"
    end
  end
end

task :socket do
   queue %[chmod -R 666 "#{deploy_to}/#{socket_path}"]
end

task :install_dependency do
      queue %[nvm use 0.10.28]
      in_directory "#{deploy_to}/current" do
        queue "npm  install"
      end

end

desc "Start the server."
task :start do
   queue %[nvm use 0.10.28]
   queue %[cd #{deploy_to}/current && NODE_ENV=production forever start app.js]
   # queue 'chomd -R 777 #{socket_path}'
end

desc "Restart the server."
task :restart do
   queue %[nvm use 0.10.28]
   queue %[rm "#{deploy_to}/#{socket_path}"]
   queue %[cd #{deploy_to}/current && NODE_ENV=production forever restart app.js]
end

desc "Stop the server."
task :stop do
   queue %[nvm use 0.10.28]
   queue %[cd #{deploy_to}/current && NODE_ENV=production forever stop app.js]
end




# For help in making your deploy script, see the Mina documentation:
#
#  - http://nadarei.co/mina
#  - http://nadarei.co/mina/tasks
#  - http://nadarei.co/mina/settings
#  - http://nadarei.co/mina/helpers

