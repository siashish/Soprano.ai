# Soprano.ai

Soprano.ai App

## Installation
	
Use the following command to install NodeJS in Ubuntu.

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
```
To check th version of NodeJs

```bash
nodejs -v
```

## How to run the application

First go to application folder and run below command
and then go to client folder and run below command again

```
npm install
```
to Run the application hit below command 

```bash
 npm start
```
after that you can check all API using POSTMAN/CURL that running on PORT 4000.

## Routes

```bash POST /api/v1.0/user/signup ``` --> for signup the user.
BODY {
    "firstName": "XXXX",
    "lastName": "XXXXX",
    "email": "XXXXX",
    "password": "XXXX",
    "file": image_file
}

RESPONSE {
    "token": "XXXXXXXX"
}

```bash POST /api/v1.0/user/login ``` --> for login the user.
BODY {
    "email": "XXXXXX",
    "password": "XXXXXX"
}

RESPONSE {
    "token": "XXXXXXXX"
}

```bash GET /api/v1.0/user ``` --> for getting the user details.

HEADERS {
	x-auth-token: XXXXXXXX
}

RESPONSE {
    "firstName": "XXXXXXXXX",
    "lastName": "XXXXXXXXXX",
    "email": "email",
    "avatar": "Image_link"
}

```bash POST /api/v1.0/post/create ``` --> for creating new post.
HEADERS {
	x-auth-token: XXXXXXXX
}
BODY {
    "title": "XXXXXX",
    "description": "XXXXXX",
    "file": image_file
}

RESPONSE {
    "code": XXX,
    "msg": "XXXXXXXXXXXXXXXX"
}

```bash GET /api/v1.0/posts?limit=X&offset=X ``` --> for getting all post by default limit 50 and offset 1 for pagination.

HEADERS {
	x-auth-token: XXXXXXXX
}

RESPONSE 
[
    {
        "postID": "XXXXXXXXX",
        "title": "XXXXXXXXXXXXX",
        "description": "XXXXXXXXXXXXX",
        "imageURL": "image_link",
        "createdAt": "date",
        "updatedAt": "date"
    }
]

```bash GET /api/v1.0/posts/{post_id} ``` --> for getting single post details.
HEADERS {
	x-auth-token: XXXXXXXX
}
RESPONSE 
    {
        "postID": "XXXXXXXXX",
        "title": "XXXXXXXXXXXXX",
        "description": "XXXXXXXXXXXXX",
        "imageURL": "image_link",
        "createdAt": "date",
        "updatedAt": "date"
    }

```bash PATCH /api/v1.0/posts/{post_id}/update ``` --> for update single post.
HEADERS {
	x-auth-token: XXXXXXXX
}
BODY {
    "title":"XXXXXXXXXXXX",
    "description":"XXXXXXXXXXXXXXXXXXXXX"
}

RESPONSE {
    "code": XXX,
    "msg": "XXXXXXXXXXXXXXX"
}

```bash DELETE /api/v1.0/posts/{post_id}/delete ``` --> for delete single post.
HEADERS {
	x-auth-token: XXXXXXXX
}

RESPONSE {
    "code": XXX,
    "msg": "XXXXXXXXXXXXXXX"
}

# Below add POSTMAN Collection link 
https://www.getpostman.com/collections/526edc5320f2a2db6b50

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)



