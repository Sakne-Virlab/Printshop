#!/bin/bash

# Скрипт для восстановления MongoDB из прямой структуры бэкапа
# Используется когда бэкап находится в mongo-backup/printshop/

set -e

echo "🔄 Восстановление базы данных из mongo-backup/printshop/"

# Проверка наличия бэкапа
if [ ! -d "./mongo-backup/printshop" ]; then
    echo "❌ Бэкап не найден: ./mongo-backup/printshop/"
    echo "Убедитесь, что папка mongo-backup/printshop/ существует и содержит файлы .bson"
    exit 1
fi

# Проверка, что MongoDB контейнер запущен
if ! docker ps | grep -q printshop_mongo; then
    echo "⚠️  Контейнер MongoDB не запущен. Запускаю..."
    docker compose up -d mongo
    echo "⏳ Ожидание запуска MongoDB..."
    sleep 15
fi

# Восстановление базы данных
echo "📦 Восстановление базы данных printshop..."
docker exec -i printshop_mongo mongorestore \
    --db printshop \
    --drop \
    /backup/printshop

echo "✅ База данных успешно восстановлена!"
echo "📊 Проверьте коллекции: docker exec -it printshop_mongo mongosh printshop --eval 'show collections'"

