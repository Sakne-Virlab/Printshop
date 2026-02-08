# ⚡ Быстрая шпаргалка по деплою

Краткая версия для тех, кто уже знаком с процессом.

## 🚀 Быстрый деплой (5 минут)

```bash
# 1. Подключение к серверу
ssh user@your-server-ip

# 2. Установка Docker (если не установлен)
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
sudo usermod -aG docker $USER
exit  # Выйдите и войдите снова

# 3. Установка Nginx
sudo apt-get update && sudo apt-get install -y nginx

# 4. Загрузка проекта
cd /var/www
sudo mkdir printshop && sudo chown $USER:$USER printshop
cd printshop
# Загрузите файлы через Git/SCP/SFTP

# 5. Настройка .env
cp env.example .env
nano .env
# Заполните: DATABASE_URL, PAYLOAD_SECRET (openssl rand -base64 32), PORT, NODE_ENV

# 6. Восстановление базы данных
docker compose up -d mongo
sleep 15
docker exec -i printshop_mongo mongorestore --db printshop --drop /backup/printshop

# 7. Запуск приложения
chmod +x scripts/*.sh
docker compose up -d --build

# 8. Настройка Nginx
sudo cp nginx.conf /etc/nginx/sites-available/printshop
sudo ln -s /etc/nginx/sites-available/printshop /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
# Отредактируйте домен: sudo nano /etc/nginx/sites-available/printshop
sudo nginx -t && sudo systemctl restart nginx

# 9. SSL сертификат
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 10. Проверка
docker compose ps
curl http://localhost:3002/api/health
curl https://your-domain.com
```

## 📋 Минимальный .env файл

```env
DATABASE_URL=mongodb://mongo:27017/printshop
PAYLOAD_SECRET=$(openssl rand -base64 32)
PORT=3002
NODE_ENV=production
```

## 🔄 Обновление проекта

```bash
cd /var/www/printshop
./scripts/backup-mongo.sh
git pull  # или загрузите новые файлы
docker compose down
docker compose build --no-cache printshop
docker compose up -d
docker compose logs -f printshop_app
```

## 🛠️ Полезные команды

```bash
# Статус
docker compose ps

# Логи
docker compose logs -f

# Перезапуск
docker compose restart

# Остановка
docker compose down

# Бэкап
./scripts/backup-mongo.sh

# Восстановление
docker exec -i printshop_mongo mongorestore --db printshop --drop /backup/printshop
```

## ⚠️ Частые проблемы

**Контейнеры не запускаются:**
```bash
docker compose logs
cat .env
```

**MongoDB не подключается:**
```bash
docker compose ps mongo
docker compose logs mongo
cat .env | grep DATABASE_URL
```

**Nginx не работает:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
curl http://localhost:3002
```

---

📖 **Полная инструкция:** см. `DEPLOY_FULL.md`

