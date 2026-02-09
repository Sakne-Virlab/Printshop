#!/bin/bash

# Скрипт для восстановления MongoDB из бэкапа

set -e

if [ -z "$1" ]; then
    echo "❌ Укажите имя бэкапа для восстановления"
    echo "Использование: ./restore-mongo.sh backup_20240101_120000"
fi

BACKUP_NAME=$1
BACKUP_PATH="./mongo-backup/${BACKUP_NAME}"

if [ ! -d "$BACKUP_PATH" ]; then
    echo "❌ Бэкап не найден: ${BACKUP_PATH}"
fi

echo "🔄 Восстановление из бэкапа: ${BACKUP_NAME}"

# Восстановление базы данных
docker exec -i printshop_mongo mongorestore \
    --db printshop \
    --drop \
    "/backup/${BACKUP_NAME}/printshop"

echo "✅ База данных восстановлена из бэкапа: ${BACKUP_NAME}"

