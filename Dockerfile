FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js
COPY logo-devdnr.png /usr/share/nginx/html/logo-devdnr.png
COPY nginx.conf /etc/nginx/conf.d/default.conf