# Web Assignment!!!

## Assignment 1

[TOC]

Team ID: CSE3 32

Teams:
- Aleksandr Freik - 5470536 
- Karol Jurski    - 5540429

### Notation
`> ...` indicates a request.\
`< ...` indicates a response.

### 1.1
```
telnet reddit.com 80
> HEAD / HTTP/1.1
> Host: reddit.com
```
```
< HTTP/1.1 301 Moved Permanently
< Retry-After: 0
< Location: https://www.reddit.com/
< Content-Length: 0
< Accept-Ranges: bytes
< Date: Wed, 15 Dec 2021 13:58:46 GMT
< Via: 1.1 varnish
< Connection: close
< Cache-Control: private, max-age=3600
< Strict-Transport-Security: max-age=31536000; includeSubdomains
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-XSS-Protection: 1; mode=block
< Server: snooserv
< X-Clacks-Overhead: GNU Terry Pratchett
```
```
openssl s_client -crlf -connect reddit.com:443
> HEAD /r/TUDelft HTTP/1.1
> Host: www.reddit.com
```
```
< HTTP/1.1 200 OK
< Connection: keep-alive
< Cache-control: private, s-maxage=0, max-age=0, must-revalidate, no-store
< Content-Type: text/html; charset=utf-8
< Accept-Ranges: bytes
< Date: Wed, 15 Dec 2021 14:25:54 GMT
< Via: 1.1 varnish
< Vary: Accept-Encoding
< Set-Cookie: loid=0000000000hld13lnb.2.1639578353727.Z0FBQUFBQmh1ZnJ4UDRXNzJiNkxKMDRLU3F5NzhUbEZlR2d6R25VYU5UcTZ5QWtOZUluenRoMDQwTFd6RjBhUEdmM0FBMlgydEFtallNY0ZTYXVyRlJJSFphWlM5LVB5WklSVDU5eERBanZ4TTZxaWsxV1g3Z2RBVnpxb2VFVThHS1NOTlphQU45b3Q; path=/; expires=Fri, 15 Dec 2023 14:25:53 GMT; domain=.reddit.com; samesite=none; secure
< Set-Cookie: session_tracker=qmaafpominporbbijr.0.1639578354850.Z0FBQUFBQmh1ZnJ5a2NYRlpoUURLN3VsaVNneFo3TnQzTm9LVUhQdTFzTUlybV9hbl9ocjdxSFlGYzMtQTBxRXpCbVA3M3owQjREV3YyWGtqRDI0UmJFb0tDZW9mUUxySHZYN1p3d1JRSEdKZXlEc3lwM2MyQzN1QmdmZENuTTk0XzBHNS1UeS12bnA; path=/; domain=.reddit.com; secure; SameSite=None; Secure
< Set-Cookie: token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk1ODE4MzMsInN1YiI6Ii1Wd0RNdVlWQWxadVJCOGJRSzRha1VLRTVmd0ZRMHciLCJsb2dnZWRJbiI6ZmFsc2UsInNjb3BlcyI6WyIqIiwiZW1haWwiLCJwaWkiXX0.HeWlMsvMERqPHkUpYe5B2wPtN1j-4Fso2NeQsuMW0HU; Path=/; Domain=reddit.com; Expires=Fri, 15 Dec 2023 14:25:53 GMT; HttpOnly; Secure
< Set-Cookie: csv=2; Max-Age=63072000; Domain=.reddit.com; Path=/; Secure; SameSite=None
< Set-Cookie: edgebucket=S9HVHqKl1rYRHwazJo; Domain=reddit.com; Max-Age=63071999; Path=/;  secure
< Strict-Transport-Security: max-age=31536000; includeSubdomains
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-XSS-Protection: 1; mode=block
< Server: snooserv
< X-Clacks-Overhead: GNU Terry Pratchett
```
```
openssl s_client -crlf -connect reddit.com:443
> GET /r/TUDelft HTTP/1.1
> Host: www.reddit.com
```
```
< HTTP/1.1 200 OK
< Connection: keep-alive
< Cache-control: private, s-maxage=0, max-age=0, must-revalidate, no-store
< Content-Type: text/html; charset=utf-8
< Accept-Ranges: bytes
< Date: Wed, 15 Dec 2021 14:26:58 GMT
< Via: 1.1 varnish
< Vary: Accept-Encoding
< Set-Cookie: loid=0000000000hlcz2vtr.2.1639578418599.Z0FBQUFBQmh1ZnN5TWhuQlNXeFNKNzFyS3p4TmlKcVk1YlAyWERCTHNGTHJXdUtubWV6eTctbnJIVjRGR2tCLWtlOXJVYnJ6OFMxckwwcXZLY09objl0ZWpLdmV5UXVqWlFuMVBJQTVDaDV3YnlnS2dMNzZLaEEwM2ZPazJudHNWT2I0YkNSdXg5eGc; path=/; expires=Fri, 15 Dec 2023 14:26:58 GMT; domain=.reddit.com; samesite=none; secure
< Set-Cookie: session_tracker=rhqfjmdpmiddldeedc.0.1639578418607.Z0FBQUFBQmh1ZnN5MUdUMXMyTkR3VjhwZjFnWFF1aDJGOFZYekF3cFRCaUhKNnpGUkxQakViUWRoRzVNazZpT2dBcGRXeTNkdWczYWlZQWpMN2Q3dWJtN0JoNzlwamRSM2dDTXg5NnYzcWl3cWxXYTJORXFlYWZYT1ZFbWNzQ21US252WjZ2MGMwT1c; path=/; domain=.reddit.com; secure; SameSite=None; Secure
< Set-Cookie: token_v2=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzk1ODE4OTgsInN1YiI6Ii1Vem9MejFOZEpJNnRfOWJBYktVMkpXeFJSTkl6Y1EiLCJsb2dnZWRJbiI6ZmFsc2UsInNjb3BlcyI6WyIqIiwiZW1haWwiLCJwaWkiXX0.ob4ee0DTYHdHXLPuA3PvOyb7Obve5N-DUABnQBrTigo; Path=/; Domain=reddit.com; Expires=Fri, 15 Dec 2023 14:26:58 GMT; HttpOnly; Secure
< Set-Cookie: csv=2; Max-Age=63072000; Domain=.reddit.com; Path=/; Secure; SameSite=None
< Set-Cookie: edgebucket=dyreN0PWrFhOMru69O; Domain=reddit.com; Max-Age=63071999; Path=/;  secure
< Strict-Transport-Security: max-age=31536000; includeSubdomains
< X-Content-Type-Options: nosniff
< X-Frame-Options: SAMEORIGIN
< X-XSS-Protection: 1; mode=block
< Server: snooserv
< X-Clacks-Overhead: GNU Terry Pratchett
< transfer-encoding: chunked
< 
< 4c65
< 
<     <!DOCTYPE html>
<     <html lang="en-US">
<       <head>
<         <script>
<     var __SUPPORTS_TIMING_API = typeof performance === 'object' && !!performance.mark && !! performance.measure && !!performance.getEntriesByType;
<     function __perfMark(name) { __SUPPORTS_TIMING_API && performance.mark(name); };
<     var __firstPostLoaded = false;
```

## 1.2
Yes

### 1.3
`cache-control` from the response header

```
cache-control: private, s-maxage=0, max-age=0, must-revalidate, no-store
```
Explanation:
- `private` - indicates that the response should only be stored in private caches (e.g. browser caches)
- `max-age=0` - indicates that the response remains fresh until N seconds after the response is generated
- `s-maxage=0` - also indicates how long the response is fresh for (similar to max-age) — but it is specific to shared caches,
  and they will ignore max-age when it is present.
- `must-revalidate` - indicates that the response can be stored in caches and can be reused while fresh. Once it becomes stale,
  it must be validated with the origin server before reuse.
- `no-store` - indicates that any caches of any kind (private or shared) should not store this response.

### 1.4
We can check it by looking at the `Accept-Encoding` request header.
```
Accept-Encoding: gzip, deflate, br
```
Supported encodings: `gzip`, `deflate`, `br`.


### 2.1

We are not allowd to create new resource so the request fails with 404 error.

```
HTTP/1.1 404 NOT FOUND
Date: Wed, 15 Dec 2021 14:50:20 GMT
Content-Type: text/html
Content-Length: 233
Connection: keep-alive
Server: gunicorn/19.9.0
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
<title>404 Not Found</title>
<h1>Not Found</h1>
<p>The requested URL was not found on the server.  If you entered the URL manually please check your spelling and try again.</p>
Connection closed by foreign host.
```

### 2.2

We tried to modify the request

```
telnet httpbin.org 80

PUT /put HTTP/1.1
host:httpbin.org
Content-type:text/plain
Content-length:12

Hello World!

```

When we changed `Content-length:12` to `Content-length:10` it have readed only first 10 characters `Hello Worl`, and the remaining part `d!`  was threated as new request. Therefore request stops at the point when all `Content-length` bytes is filled.

When we tried to put bigger `Content-length:18` it were threating new line inputs as just two byte `\r\n` and we were able to enter new data until all 18 bytes were filled. Therefore request waits to the point when all `Content-length` bytes is filled.


### 3.1
Having initially provided the credentials, subsequent page reloads do not cause the authentication pop-up to appear again.
The reason for it is the browser remembering the provided username and password and sending it as a part of the subsequent
requests to the same page, as `Authorization` header.
```
Authorization: Basic dXNlcjpwYXNzd2Q=
```

### 3.2
```
telnet httpbin.org 80
> HEAD /basic-auth/user/passwd HTTP/1.1
> host:httpbin.org
```
```
< HTTP/1.1 401 UNAUTHORIZED
< Date: Wed, 15 Dec 2021 15:09:39 GMT
< Content-Length: 0
< Connection: keep-alive
< Server: gunicorn/19.9.0
< WWW-Authenticate: Basic realm="Fake Realm"
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
```
The server responded with code 401 because of lack of the `Authorization` header in the request.

```
> HEAD /basic-auth/user/passwd HTTP/1.1
> host:httpbin.org
> Authorization: Basic dXNlcjpwYXNzd2Q=
```
```
< HTTP/1.1 200 OK
< Date: Wed, 15 Dec 2021 15:13:13 GMT
< Content-Type: application/json
< Content-Length: 47
< Connection: keep-alive
< Server: gunicorn/19.9.0
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
```
Worked correctly

```
> HEAD /basic-auth/user/passwd HTTP/1.1
> host:httpbin.org
```
```
< HTTP/1.1 401 UNAUTHORIZED
< Date: Wed, 15 Dec 2021 15:15:02 GMT
< Content-Length: 0
< Connection: keep-alive
< Server: gunicorn/19.9.0
< WWW-Authenticate: Basic realm="Fake Realm"
< Access-Control-Allow-Origin: *
< Access-Control-Allow-Credentials: true
```
Again, the server responded with 401, because the request was missing the `Authorization` header.
Hence, it did not behave the same way as in the browser, since it is browser's and not server's responsibility to remember
the credentials, server expects it to be provided every time.


### 4.1
We will try to implement the standard Draughts game for 2 player. 


> Find three examples of your chosen board game (in 2D) that can be played online in a modern browser (laptop or desktop, not a mobile device). Consider the web application’s design (focus on the game screen) based on the web design principles covered in class: to what extent do they fulfill them? Record the game URLs.

1. https://www.247checkers.com

![image](https://github.com/AlexFreik/TUD-2Q-WDB/img/247checkers.webpm)
![img](https://github.com/AlexFreik/TUD-2Q-WDB/blob/master/img/247checkers.webp)

ddd


