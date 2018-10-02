import requests
import json

with open('pNumberList.txt') as f:
    contents = f.readlines()

problemNumberList = [x.strip() for x in contents]

data = []
for (i, pNum) in enumerate(problemNumberList):
    print("requesting index: ", i)
    r = requests.get('https://uhunt.onlinejudge.org/api/p/num/' + pNum)
    parsed = json.loads(r.text)
    data.append({
        'pid': str(parsed['pid']),
        'number': str(parsed['num']),
        'title': parsed['title']})

print("finished all request")
with open('questionDetails.json', 'w') as fp:
    json.dump(data, fp)
print("Saved to questionDetails.json.")