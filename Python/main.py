import requests
import json

with open('userId.txt') as f:
    contents = f.readlines()

userIdList = [x.strip() for x in contents]

userData = []
for id in userIdList:
    r = requests.get('https://uhunt.onlinejudge.org/api/subs-user-last/' + id + '/10000')
    parsed = json.loads(r.text)
    successSubmission = [x for x in parsed['subs'] if x[6] != -1]
    allPidList = []
    for sub in successSubmission:
        allPidList.append(sub[1])
    userData.append({
        'id': id,
        'name': parsed['name'],
        'solved': list(set(allPidList))
    })

"""
# UserData: Array of dictionary
3 key:
    id: user id
    name: user fullname
    solved: user solved pid list
"""

print(userData[0])