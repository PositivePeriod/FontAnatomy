with open('python/property.txt', 'r', encoding='utf8') as f:
    prop = {}
    for i in range(75):
        text = f.readline().strip()
        num = text.split(' ', maxsplit=2)[0]
        prop[int(num)] = text[len(num):].strip()

for x in prop:
    print(f'{x}: "{prop[x]}",')

with open('python/propertyKMC.txt', 'r', encoding='utf8') as f:
    propKMC = {}
    for i in range(27):
        text = f.readline().strip()
        num = text.count('|') + 1
        text = text.replace('|', '').split(' ', maxsplit=num + 1)
        propKMC[i + 1] = {"prop": [int(x) for x in text[1:-1]], "msg": text[-1]}

# for x in propKMC:
#     print(f'{x}: {propKMC[x]},')

with open('python/propertyPCA.txt', 'r', encoding='utf8') as f:
    propPCA = {}
    for i in range(14):
        text = f.readline().strip()
        num = text.count('|') + 1
        text = text.replace('|', '').split(' ', maxsplit=num + 1)
        propPCA[i + 1] = {"prop": [int(x) for x in text[1:-1]], "msg": text[-1]}

# for x in propPCA:
#     print(f'{x}: {propPCA[x]},')
