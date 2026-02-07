#!/bin/bash

# Скрипт для создания бэкапа MongoDB

set -e

BACKUP_DIR="./mongo-backup"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_NAME="backup_${TIMESTAMP}"

echo "💾 Создание бэкапа MongoDB..."

# Создание директории для бэкапа
mkdir -p "${BACKUP_DIR}/${BACKUP_NAME}"

# Создание бэкапа
docker exec printshop_mongo mongodump \
    --db printshop \
    --out "/backup/${BACKUP_NAME}"

echo "✅ Бэкап создан: ${BACKUP_DIR}/${BACKUP_NAME}"

# Опционально: удаление старых бэкапов (старше 7 дней)
# find "${BACKUP_DIR}" -type d -name "backup_*" -mtime +7 -exec rm -rf {} \;

echo "📦 Бэкап готов!"

