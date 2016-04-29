#!/usr/bin/env bash
&>file

echo '- Install postgresql 9.5'

sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' -y
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -

apt-get -y update > /dev/null
apt-get -y install postgresql postgresql-contrib

# fix access type
echo "- Fixing postgres pg_hba.conf file"
# replace the ipv4 host line with the above line
cat >> /etc/postgresql/9.5/main/pg_hba.conf <<EOF
host    all         all         0.0.0.0/0             md5
EOF

echo '- Create superuser developer'
sudo su postgres -c "psql -c \"CREATE USER developer WITH PASSWORD 'developer' CREATEDB CREATEUSER CREATEROLE;\" "

echo '- Modify base encoding for new databases'

sudo su postgres -c "psql -c \"update pg_database set datistemplate=false where datname='template1';\" "
sudo su postgres -c "psql -c \"drop database template1;\" "
sudo su postgres -c "psql -c \"create database template1 with owner=postgres encoding='UTF-8' lc_collate='en_US.utf8' lc_ctype='en_US.utf8' template template0;\" "
sudo su postgres -c "psql -c \"update pg_database set datistemplate=true where datname='template1';\""

echo '- Install rbenv'

apt-get -y install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev

cd /home/vagrant && git clone git://github.com/sstephenson/rbenv.git .rbenv
echo 'export PATH="/home/vagrant/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile

git clone git://github.com/sstephenson/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="/home/vagrant/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bash_profile
source ~/.bash_profile



echo '- Download and install ruby 2.3.0 build'
rbenv install -v 2.3.0
rbenv global 2.3.0


echo '- Install bundler gem'
gem install bundler

echo '- Install nodejs features'

add-apt-repository ppa:chris-lea/node.js > /dev/null
apt-get -y update > /dev/null
apt-get -y install nodejs