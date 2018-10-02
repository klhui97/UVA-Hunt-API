import requests
import json

with open('userName.txt') as f:
    contents = f.readlines()

userNameList = [x.strip() for x in contents]
userIds = []

for (i, userName) in enumerate(userNameList):
    print("requesting index: ", i)
    r = requests.get('https://uhunt.onlinejudge.org/api/uname2uid/' + userName)
    if r.text == "0":
        print(userName)
    else:
       userIds.append(r.text)

print("finished all request")
with open('userId.json', 'w') as fp:
    json.dump(userIds, fp)
print("Saved to userId.txt.")