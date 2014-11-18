namespace :dependency do

  desc "install dependency"
  task :npm do
    on roles(:app) do
      within current_path do
        execute :npm, "install"
      end
    end
  end

end