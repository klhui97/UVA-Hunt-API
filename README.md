## UVA-Score-Web

### Function
- Serverless
- Track a group of users' submission on UVA
- Track specific problem (the problem number is displayed in blue)
- Track other problem (the problem number is displayed in red)
- Sorted by Total > EE

#### Demo
```
Support two version:

Main & development version:
Version 1 (headers = uva name) - Web/index2.html && Web/js/main.js

Old version:
Version 2 (headers = question) - Web/index.html && Web/js/main2.js
```
### Using Python to help you generate target user/question list
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
### Header sorting
In Web/main.js, this method determines the order of headers
```
compare: function (a, b)
```
