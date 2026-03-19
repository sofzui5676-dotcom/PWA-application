# Smart Dashboard PWA

PWA приложение с задачами, заметками и трекером.

## Запуск

### Локально
```bash
# Установка зависимостей не требуется - это чистый фронтенд
# Используйте любой HTTP сервер, например:
npx http-server . -p 3000
# Сборка образа
docker build -t smart-dashboard .

# Запуск контейнера
docker run -p 3000:3000 smart-dashboard

# Или через docker-compose
docker-compose up

## 3. Environment Files

```bash
cat > .env.example << 'EOF'
# API Configuration (если будет бэкенд)
API_URL=http://localhost:3000/api

# App Configuration
APP_NAME=Smart Dashboard
APP_ENV=development
