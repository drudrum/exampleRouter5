# Сервис для сбора и предоставления статистики

## POST GET запросы
Документация доступна по пути [/api-docs](http://127.0.0.1:3009/statisticService/api-docs)
или https://debug.medpoint.pro/statisticService/api-docs

## Socket.io


## Переменные окружения:
* PORT/STATISTIC_PORT=3009 Порт который слушает сервис (по умолчанию 3009)
* HOST=127.0.0.1 Интрефейс на котором слушает сервис (по умолчанию '127.0.0.1')
* mongoDbUrl=mongodb://127.0.0.1:27018
* mongoDbBase=medpoint-statistic
* REDIS_HOST=localhost
* REDIS_PORT=6379
* TOKEN (Должен совпадать с токеном в [medpoint-auth](../../../medpoint-auth)) используется для распаковки jwt
