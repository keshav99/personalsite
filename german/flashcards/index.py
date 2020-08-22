import io
import re
import json
import codecs
import sys


stdout_encoding = sys.stdout.encoding or sys.getfilesystemencoding()

f = codecs.open("a1words.txt", "r",'utf-8')
sentences =  f.read().split('\n')
# print(sentences)
wordlist = {}
newWord = sentences[0].split(' ')[0]
small = 'a'
big = 'A'
for i in sentences:
    words = [j for j in i.split(' ') if j!='']
    # print(words)
    if len(words)>0:
        if words[0]=='F\r':
            small = chr(ord(small)+1)
            big = chr(ord(big)+1)
            print("Small "+small)
            print(big)
            continue
    else:
        continue
    # print(words)
    if words[0] == newWord:
        wordlist[newWord] = [' '.join(words[1:])]
    elif words[0][0] == small or words[0][0] == big:
        newWord = words[0]
        wordlist[newWord] = [' '.join(words[1: ])]
    elif words[0] == 'die' or words[0] == 'der' or words[0] == 'das':
        if words[1][0] == small or words[1][0] == big:
            newWord = words[0]+' '+words[1]
            wordlist[newWord] = [' '.join(words[2: ])]
        else:
            wordlist[newWord].append(' '.join(words))
    else:
        wordlist[newWord].append(' '.join(words))

g = open('wordlist.txt', 'w')
r = json.dumps(wordlist, ensure_ascii=False).encode('utf8').decode()
print(r)
g.write(r)



