import requests

with open('userName.txt') as f:
    contents = f.readlines()

userNameList = [x.strip() for x in contents]
userIds = []

for (i, userName) in enumerate(userNameList):
    print("requesting index: ", i)
    r = requests.get('https://uhunt.onlinejudge.org/api/uname2uid/' + userName)
    userIds.append(r.text)

print("finished all request")
f = open('userId.txt', 'w')
for line in userIds:
    f.writelines(str(line) + '\n')
f.close()
print("Saved to userId.txt.")