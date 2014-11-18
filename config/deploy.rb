# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'chat'
set :repo_url, 'git@github.com:soarpatriot/chat.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
# set :deploy_to, '/var/www/my_app'
set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v0.10.28'
set :nvm_map_bins, %w{node npm  forever}  #nvm supervisor
# set :nvm_custom_path, '/home/soar/.nvm/'
# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
set :format, :pretty

# Default value for :log_level is :debug
set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, %w{config/redis-config.js config/database.js}

# Default value for linked_dirs is []
set :linked_dirs, %w{node_modules tmp/pids log}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :supervisor, "/home/soar/.nvm/#{fetch(:nvm_node)}/bin/supervisor"
# Default value for keep_releases is 5
set :keep_releases, 5

set :node_env, "NODE_ENV=production"

namespace :deploy do

  desc 'Restart application'
  task :restart do
    
    on roles(:app) do
      within current_path  do
        if test("[ -f #{fetch(:node_pid)} ]")
          info ">>>>>> restarting application"
          execute :forever, "--pidFile #{fetch(:node_pid)} restart app.js #{fetch(:node_env)}"
          info ">>>>>> restart application success"
        else
          info ">>>>>> no started application, begin to start"
          execute :forever, "--pidFile #{fetch(:node_pid)} start app.js #{fetch(:node_env)}"
          info ">>>>>> application started"
        end 
        #with NODE_ENV: :development do
          # commands in this block execute as the "deploy" user.
          
            # commands in this block execute with the environment
            # variable RAILS_ENV=production
            # execute "nvm use 0.10.28"
            
             
      end
      
    end
  end
  
  task :start do 
    on roles(:app) do
      within current_path  do
        unless test("[ -f #{fetch(:node_pid)} ]")
          info ">>>>>> starting application"
          execute :forever, "--pidFile #{fetch(:node_pid)} start app.js #{fetch(:node_env)}"
          
        else
          error ">>>>>> application already started"
        end
        
      end

    end
  end 

  task :stop do 
    on roles(:app) do
      within current_path  do
        if test("[ -f #{fetch(:node_pid)} ]")
          info ">>>>>> stop application"
          execute :forever, "stop app.js"
          
        else
          error ">>>>>> can not stop. there is no started "
        end
        
      end

    end
  end 


  after :publishing, "dependency:npm"
  after :publishing, :restart


  #after :restart do
   # on roles(:web), in: :groups, limit: 3, wait: 10 do
      # Here we can do anything such as:
    #    within current_path do

     #     execute "ll"
          #execute "supervisor app.js"
     #   end
    #end
  #end

end
#after "deploy:check", "dependency:npm"


