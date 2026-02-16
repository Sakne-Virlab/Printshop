#!/bin/bash

# Скрипт для настройки SSL сертификата через Let's Encrypt

set -e

if [ -z "$1" ]; then
    echo "❌ Укажите домен"
    echo "Использование: ./setup-ssl.sh your-domain.com"
    exit 1
fi

DOMAIN=$1
EMAIL=${2:-admin@${DOMAIN}}

echo "🔒 Настройка SSL для домена: ${DOMAIN}"

# Установка certbot (если не установлен)
if ! command -v certbot &> /dev/null; then
    echo "📦 Установка certbot..."
    sudo apt-get update
    sudo apt-get install -y certbot python3-certbot-nginx
fi

# Получение сертификата
echo "📝 Получение SSL сертификата..."
sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN} --email ${EMAIL} --agree-tos --non-interactive

# Настройка автообновления
echo "🔄 Настройка автообновления сертификата..."
sudo systemctl enable certbot.timer

echo "✅ SSL сертификат настроен!"
echo "🌐 Сайт доступен по HTTPS: https://${DOMAIN}"

