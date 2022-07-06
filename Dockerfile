FROM nexuscoe.htcinc.com:5115/ngo/httpd:2.4.48-alpine
#COPY ./dist/ngo-v2-ui/* /usr/local/apache2/htdocs/
ADD ./dist/orchestrator-ui/ /usr/local/apache2/htdocs/
#CMD apachectl -k start
#CMD /usr/local/apache2/bin/apachectl -D FOREGROUND
#CMD ["/usr/local/apache2/bin/apachectl", "-D", "FOREGROUND"]
COPY ./ui-httpd.conf /usr/local/apache2/conf/httpd.conf
RUN mkdir -p /var/log/ngologs
