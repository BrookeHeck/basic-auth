# Basic Auth Server

**Author**: Brooke Heck

**Version**: 1.0.0

## Overview
This is a server that allows a user to sign up with a username and password, and then uses basic authentication when they sign in.

## Deployed Server
[https://bh-basic-auth.herokuapp.com](https://bh-basic-auth.herokuapp.com/)

### Routes

POST : /signup (body {"username": "user", "password": "pass"})

POST : /signin (basic user:pass)


## Architecture
This is a backend server for practice implementing basic. The users are stored in a SQL database with sqlite, but passwords are hashed using bcrypt before being stored. Basic authentication with a username and password is used for sign in.
## Change Log
09-28-2022 07:25pm - Server creates a user, and uses basic authentication for signin