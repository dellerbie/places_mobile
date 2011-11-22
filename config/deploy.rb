$:.unshift(File.expand_path('./lib', ENV['rvm_path']))

set :user, "rails"
set :application, "places_mobile"
set :domain, "m.grubm.com"
set :deploy_to, "/home/#{user}/#{domain}"

default_run_options[:pty] = true  # Must be set for the password prompt from git to work
set :repository, "git@github.com:dellerbie/places_mobile.git"
set :scm, "git"
set :scm_verbose, true
set :use_sudo, false
set :branch, "master"
set :deploy_via, :remote_cache

role :web, "dellerbie.com"
role :app, "dellerbie.com"
role :db,  "dellerbie.com", :primary => true

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart do ; end
end