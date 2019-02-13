FROM ubuntu:latest

#COPY . /app

#RUN apt-get update && apt-get install -y locales && rm -rf /var/lib/apt/lists/* \
#    && localedef -i en_US -c -f UTF-8 -A /usr/share/locale/locale.alias en_US.UTF-8
#ENV LANG en_US.utf8
RUN apt-get update
RUN apt-get install -y software-properties-common
#RUN apt-get install -y python3-software-properties
#RUN add-apt-repository ppa:deadsnakes/ppa 
RUN apt-get update
RUN apt-get install -y curl python3 git-core
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
#RUN apt-get install -y npm

RUN git clone  https://github.com/weppyk/zonky_loanAvg.git app
RUN cd app/ && npm install