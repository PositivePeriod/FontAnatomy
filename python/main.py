from util import *
import numpy
import csv

# import textwrap
# # Text wraper to handle long text
# # 40자를 넘어갈 경우 여러 줄로 나눔
# lines = textwrap.wrap(message, width=40)

mainDir = "./python"
fontSaveDir = f"{mainDir}/font"
imageSaveDir = f"{mainDir}/image"

def makeData():
    if not os.path.isdir(imageSaveDir):
        os.mkdir(imageSaveDir)
    fontList = getFonts()
    textStr = '가나다라마바사아자차카타파하'
    textList = list(textStr)
    for font in fontList:
        for text in textList:
            makeImage(text, font, f'/{font[0][:-4:2]}')

def getDataFromImage():
    searchWord = '아'
    imageList = getImages()
    imageDir = [image[1] for image in imageList if searchWord in image[1]][0]
    image = Image.open(imageDir)
    # image.show()
    imageData = numpy.array(image)
    # height, width, _ = imageData.shape
    return imageData

def getDataPath():
    fontDirList = os.listdir(imageSaveDir)
    for fontDir in fontDirList:
        imageDirList = os.listdir(imageSaveDir+'/'+fontDir)
        # print(imageDirList)
        imageDataList = []
        for imageDir in imageDirList:
            if imageDir[-4:] != '.png': continue
            url = f'{imageSaveDir}/{fontDir}/{imageDir}'
            image = Image.open(url)
            image_gray = image.convert('L') 
            resized = image_gray.resize((40, 40), Image.NEAREST)
            resized_array = numpy.array(resized)
            data = featureFromImage(resized_array) # .tolist()
            imageDataList.append(data)

        # with open(f'{imageSaveDir}/{fontDir}/analysis.csv', 'w', newline='') as f:
        #     writer = csv.writer(f)
        #     for imageData in imageDataList:
        #         writer.writerows(imageData)
        #         writer.writerow('')

        numpy.savetxt(f'{imageSaveDir}/{fontDir}/analysis.csv', imageDataList, delimiter=",")
        print('qwerty')
        exit()

            
def featureFromImage(image):
    # https://stackoverflow.com/questions/56987200
    xCounter = image.mean(axis=0)
    print(xCounter)
    yCounter = image.mean(axis=1)
    leftDiagCounter = numpy.array([numpy.sum(numpy.diag(numpy.fliplr(image), d)) for d in range(len(image) - 1, -len(image), -1)])
    rightDiagCounter = numpy.array([numpy.sum(numpy.diag(image, d)) for d in range(len(image) - 1, -len(image), -1)])
    # print(xCounter.shape, yCounter.shape, leftDiagCounter.shape, rightDiagCounter.shape)
    feature = numpy.concatenate((xCounter, yCounter, leftDiagCounter, rightDiagCounter))
    # return image.flatten.tolist().flatten()
    return feature

getDataPath()
# # makeData(); exit()

# url = r'C:\Users\jeukh\Documents\GitHub\FontAnatomy\python\image\a날진3\20-33-8 a날진3 아.png'
# url = r'C:\Users\jeukh\Documents\GitHub\FontAnatomy\python\image\ES시B\20-33-8 ES시B 차.png'
# image = Image.open(url)
# image = numpy.array(image)
# print(image.shape)

# imageData = getDataFromImage()
# colorArray = {"black": numpy.array([0, 0, 0]), 'white': numpy.array([255, 255, 255])}
# xCounter = [0 for i in range(width)]
# yCounter = [0 for i in range(height)]
# xyCounter = [0 for i in range(width+height)]
# for x in range(width):
#     for y in range(height):
#         if not (imageData[y][x] == colorArray["white"]).any():
#         # if (imageData[y][x] == colorArray["black"]).all():
#             xCounter[x] += 1
#             yCounter[y] += 1
#             xyCounter[x+y] += 1

# maxX = max(1, max(xCounter))
# xCounter = [(i / maxX) for i in xCounter]
# maxY = max(1, max(yCounter))
# yCounter = [(i / maxY) for i in yCounter]
# maxXY = max(1, max(xyCounter))
# xyCounter = [(i / maxXY) for i in xyCounter]

# import matplotlib.pyplot as plt
# plt.plot(list(range(width)), xCounter)
# plt.xlabel('x - axis')
# plt.ylabel('y - axis')
# plt.plot(list(range(height)), yCounter)
# plt.xlabel('x - axis')
# plt.ylabel('y - axis')
# plt.plot(list(range(width+height)), xyCounter)
# plt.xlabel('x - axis')
# plt.ylabel('y - axis')
# plt.title('Graph!')
# plt.show()