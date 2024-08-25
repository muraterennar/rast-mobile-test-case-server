# Rast Mobile Backend

Bu proje, mobil uygulama testleri için hazırlanmış bir Node.js ve Express.js API'dır. Test süreçlerini desteklemek ve veritabanı işlemlerini yönetmek amacıyla geliştirilmiştir.

## Installation

1. Repositories'yi klonlayın:

    ```sh
    git clone https://github.com/muraterennar/rast-mobile-backend
    ```

2. Proje dizinine gidin:

    ```sh
    cd rast-mobile-backend
    ```

3. Bağımlılıkları yükleyin:

    ```sh
    npm install
    ```

## MongoDB Setup

1. MongoDB Docker imajını çekin:

    ```sh
    docker pull mongodb/mongodb-community-server:latest
    ```

2. MongoDB konteynerini başlatın:

    ```sh
    docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
    ```

## Usage

Sunucuyu başlatmak için aşağıdaki komutu kullanın:

```sh
npx nodemon index.js
```

## API Endpoints

```sh
### Get All - Pagination
GET /socialmedia/api/getall?page=1&limit=9 HTTP/1.1
Host: localhost:3000
```

```sh
### Get Search - Pagination
GET /socialmedia/api/search?query=searchvalue HTTP/1.1
Host: localhost:3000
```

```sh
### Get By Id
GET /socialmedia/api/get/66cb0a99047e705:idad517472c HTTP/1.1
Host: localhost:3000
```

```sh
### add
POST /socialmedia/api/add HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 158
Body:
{
    "SocialMediaLink": "",
    "SocialMediaName": "",
    "Description": ""
}
```

```sh
### update
PATCH /socialmedia/api/update/:id HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 159

{
    "SocialMediaLink": "",
    "SocialMediaName": "",
    "Description": ""
}
```

```sh
### delete
DELETE /socialmedia/api/delete/:id HTTP/1.1
Host: localhost:3000
```