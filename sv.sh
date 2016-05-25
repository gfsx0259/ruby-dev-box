
#!/bin/sh

# This script is run by Supervisor to start PostgreSQL 9.4 in foreground mode

pkill postgres

if [ -d /var/run/postgresql ]; then
    chmod 2775 /var/run/postgresql
else
    install -d -m 2775 -o postgres -g postgres /var/run/postgresql
fi

exec su postgres -c "/usr/lib/postgresql/9.4/bin/postgres -D /var/lib/postgresql/9.4/main -c config_file=/etc/postgresql/9.4/main/postgresql.conf"


unix_http_server]
file=/tmp/supervisor.sock   ; (the path to the socket file)[supervisord]

[supervisorctl]
serverurl=unix:///tmp/supervisor.sock ; use a unix:// URL  for a unix socket

[rpcinterface:supervisor]
supervisor.rpcinterface_factory = supervisor.rpcinterface:make_main_rpcinterface

[supervisord]
logfile = /tmp/supervisord.log
logfile_maxbytes = 50MB
logfile_backups=10
loglevel = info
pidfile = /tmp/supervisord.pid
nodaemon = false
minfds = 1024
minprocs = 200
umask = 022
user = root
identifier = supervisor
directory = /tmp
nocleanup = true
childlogdir = /tmp
strip_ansi = false

[program:qdesk]
process_name=qdesk
environment=LANG=pl_PL.UTF-8,LC_ALL=pl_PL.UTF-8
command=/root/.rbenv/versions/2.3.0/bin/ruby /root/apps/Qdesk/current/bin/rails s Puma -e production
autostart=true
autorestart=true
directory=/root/apps/Qdesk/current/


[program:sidekiq]
process_name=sidekiq
environment=LANG=pl_PL.UTF-8,LC_ALL=pl_PL.UTF-8
command=/bin/bash -c "cd /root/apps/Qdesk/current/ && /root/.rbenv/versions/2.3.0/bin/bundle exec /root/.rbenv/versions/2.3.0/bin/ruby /root/.rbenv/versions/2.3.0/bin/sidekiq -e production"
autostart=true
autorestart=true
directory=/root/apps/Qdesk/current/

[program:postgresql]
process_name=postgresql
environment=LANG=pl_PL.UTF-8,LC_ALL=pl_PL.UTF-8
command=/usr/local/bin/run_pgsql.sh
#command=su postgres -c "/usr/lib/postgresql/9.4/bin/postgres -D /var/lib/postgresql/9.4/main -c config_file=/etc/postgresql/9.4/main/postgresql.conf"
autostart=true
autorestart=true
directory=/root/apps/Qdesk/current/


