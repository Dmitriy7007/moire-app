#!/usr/bin/env sh

# остановить публикацию при ошибках
set -e

# сборка приложения
npm run build

#переход в каталог сборки
cd dist

#инициализация репозитория и загрузка кода в GitHub
git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:dmitriy7007/moire-app.git master:gh-pages

cd -