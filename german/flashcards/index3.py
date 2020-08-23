import json

with open('wordlist.json', encoding='utf-8') as f:
  data = json.load(f)

sent = []
for i in data:
    sent.append(data[i])
print(sent)