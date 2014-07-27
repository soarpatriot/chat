set :server_name, "localhost"

set :branch, "master"
set :deploy_to, "/data/www/chat"



server fetch(:server_name), user: "soar", roles: %w{web app db}