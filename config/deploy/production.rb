set :server_name, "www.soaror.com"

set :branch, "master"
set :deploy_to, "/data/www/chat"


set :node_pid, "#{shared_path}/tmp/pids/chat.pid"
server fetch(:server_name), user: "soar", roles: %w{web app db}