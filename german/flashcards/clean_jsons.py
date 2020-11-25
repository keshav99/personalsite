import json
import os
import sys
import codecs
import random

stdout_encoding = sys.stdout.encoding or sys.getfilesystemencoding()

f = codecs.open("wordlist.json", "r",'utf-8')
f2 = codecs.open("wordlist2_clean.json", "r",'utf-8')
f3 = codecs.open("wordlist3_clean.json", "r",'utf-8')

wordlist = json.load(f)
wordlist2 = json.load(f2)
wordlist3 = json.load(f3)

l = list(wordlist3.keys())

# for i in l:
#     if i in wordlist or i in wordlist2:
#         del wordlist3[i]

c1 = ["#db5e5e", "#db7d5e", "#dba15e", "#dbb85e", "#dbd75e", "#9ddb5e"]
c2 = ["#5edbd5", "#5ea3db", "#5e75db", "#2d6acc", "#2248f2", "#7222f2"]
c3 = ["#db40de", "#de4094", "#9c2754", "#9c2744", "#c42f4f", "#c42f2f"]

for i in wordlist:
    wordlist[i]["seen"] = 0
    wordlist[i]["mastered"] = 0
    wordlist[i]["color"] = random.choice(c1)

for i in wordlist2:
    wordlist2[i]["seen"] = 0
    wordlist2[i]["mastered"] = 0
    wordlist2[i]["color"] = random.choice(c2)

for i in wordlist3:
    wordlist3[i]["seen"] = 0
    wordlist3[i]["mastered"] = 0
    wordlist3[i]["color"] = random.choice(c3)

print(wordlist3)