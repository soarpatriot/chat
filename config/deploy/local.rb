set :stage, :local
set :server_name, "192.168.1.140"

set :branch, "dev"


set :deploy_to, "/home/soar/site/chat"

set :node_pid, "#{shared_path}/tmp/pids/chat.pid"
#set :password, ask('Server password', nil)
#server fetch(:server_name), user: 'soar', port: 22, password: fetch(:password), roles: %w{web app db}

server fetch(:server_name), user: "soar", roles: %w{web app db}
