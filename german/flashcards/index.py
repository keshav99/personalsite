import io
import re
import json
import codecs
import sys


stdout_encoding = sys.stdout.encoding or sys.getfilesystemencoding()

f = codecs.open("b1words.txt", "r",'utf-8')
sentences =  f.read().split('\n')
# print(sentences)
wordlist = {}
newWord = sentences[0].split(' ')[0]
small = 'a'
big = 'A'
order_no = 1
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
        if newWord not in wordlist:
            wordlist[newWord] = {}
        wordlist[newWord]["ex"] = [' '.join(words[1:])]
    elif words[0][0] == small or words[0][0] == big:
        newWord = words[0]
        if newWord not in wordlist:
            wordlist[newWord] = {}
        wordlist[newWord]["ex"] = [' '.join(words[1: ])]
        wordlist[newWord]["num"] = order_no
        order_no+=1
    elif words[0] == 'die' or words[0] == 'der' or words[0] == 'das':
        if words[1][0] == small or words[1][0] == big:
            newWord = words[0]+' '+words[1]
            if newWord not in wordlist:
                wordlist[newWord] = {}
            wordlist[newWord]["ex"] = [' '.join(words[2: ])]
            wordlist[newWord]["num"] = order_no
            order_no+=1
        else:
            wordlist[newWord]["ex"].append(' '.join(words))
    else:
        wordlist[newWord]["ex"].append(' '.join(words))

# g = open('wordlist2.json', 'w')
# r = json.dumps(wordlist, ensure_ascii=False).encode('utf8').decode()
# print(r)
# g.write(r)
sen = []
for i in wordlist:
    sen.append(wordlist[i])
print(wordlist)
# print(sen)


