## UVA-Score-Web

### Function
- Serverless
- Track a group of users' submission on UVA
- Track specific question
#### Demo
```
open Web/index.html
```
### Update target user/question list
#### User List
Path - Web/resource/userId.json
Program - Python/userName2userList.py
Required file - userName.txt (each line one username)
```
$ python userName2userList.py
```
userId.json will be created
#### Question List
Path - Web/resource/questionDetails.json
Program - Python/userName2userList.py
Required file - pNumberList.txt (each line one username)
```
$ python userName2userList.py
```
questionDetails.json will be created
