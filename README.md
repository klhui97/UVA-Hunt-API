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
