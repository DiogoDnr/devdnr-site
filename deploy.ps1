$VPS = "root@2.24.123.151"
$BUILD_DIR = "/tmp/devdnr-build/"

Write-Host "Enviando arquivos..." -ForegroundColor Cyan
scp index.html styles.css script.js logo-devdnr.png nginx.conf Dockerfile "${VPS}:${BUILD_DIR}"

Write-Host "Buildando imagem e atualizando servico..." -ForegroundColor Cyan
ssh $VPS "DOCKER_BUILDKIT=0 docker build --no-cache -t easypanel/devdnr/site:latest $BUILD_DIR && docker service update --force devdnr_site"

Write-Host "Deploy concluido! Acesse devdnr.com.br" -ForegroundColor Green
