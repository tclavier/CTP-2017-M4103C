FROM node

ENV http_proxy http://cache.univ-lille1.fr:3128
ENV https_proxy http://cache.univ-lille1.fr:3128

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update \
    && apt-get install -y \
      build-essential \
    && apt-get clean \
    && mkdir /var/run/sshd

WORKDIR /workspace

COPY . /workspace/
