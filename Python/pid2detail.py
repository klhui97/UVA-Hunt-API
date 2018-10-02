import requests
import json

with open('pidList.txt') as f:
    contents = f.readlines()

pidList = [x.strip() for x in contents]

data = []
for (i, pid) in enumerate(pidList):
    print("requesting index: ", i)
    r = requests.get('https://uhunt.onlinejudge.org/api/p/id/' + pid)
    parsed = json.loads(r.text)
    data.append(str(parsed['pid']) + ',' + str(parsed['num']) + ',' + parsed['title'])

print("finished all request")
f = open('problemDetails.csv', 'w')
f.writelines('pid,number,title\n')
for line in data:
    f.writelines(str(line) + '\n')
f.close()
print("Saved to userId.txt.")