## UVA-Score-Web

### Function
- Serverless
- Track a group of users' submission on UVA
- Track specific question
#### Demo
```
Support two version:

Version 1 (headers = question) - Web/index.html && Web/js/main.js
Version 2 (headers = uva name) - Web/index2.html && Web/js/main2.js
```
### Update target user/question list
#### User List
Path - Web/resource/userId.json<br />
Program - Python/userName2userList.py<br />
Required file - userName.txt (each line one username)
```
$ python userName2userList.py
```
userId.json will be created
#### Question List
Path - Web/resource/questionDetails.json<br />
Program - Python/problemNumber2detail.py<br />
Required file - pNumberList.txt (each line one problem number)
```
$ python problemNumber2detail.py
```
questionDetails.json will be created
