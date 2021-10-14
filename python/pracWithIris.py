# https://bskyvision.com/851
# https://jeongmin-lee.tistory.com/87


import numpy as np
import os
import csv
from numpy.matrixlib.defmatrix import _from_string

mainDir = "./python"
fontSaveDir = f"{mainDir}/font"
imageSaveDir = f"{mainDir}/image"

def getData():
    fontDirList = os.listdir(imageSaveDir)
    fontDataList = []
    for fontDir in fontDirList:
        imageDataList = []
        with open(f'{imageSaveDir}/{fontDir}/analysis.csv', 'r', newline='') as f:
            imageData = []
            for line in csv.reader(f):
                if line != []:
                    imageData.append(line)
                else:
                    imageDataList.append(imageData)
                    imageData = []
        fontDataList.append(imageDataList)
    # print(fontDataList)
    # print(len(fontDataList), len(fontDataList[0]), len(fontDataList[0][0]),  len(fontDataList[0][0][0])) # number of fonts, number of chr(image) per fonts, size of one image(x,y? or y,x)
    return fontDataList

def preprocessToNumpy(originalData):
    imageData = np.empty((0, 1600), dtype=int)     
    nameData = []
    for i, fontData in enumerate(originalData):
        for j, image in enumerate(fontData):
            # print(len(imageData), len(imageData[0])) # x,y? y,x?
            np_array = np.reshape(np.array(image).flatten(),(1, 1600) )
            # imageData.append(np_array.flatten())
            imageData = np.append(imageData, np_array, axis=0) 
            nameData.append(i) # font number matching to image
    imageData = np.array(imageData)
    nameData = np.array(nameData)
    return imageData, nameData

pythonData = getData()
numpyData = preprocessToNumpy(pythonData)
imageData, nameData = numpyData
# print('numpy shape', imageData.shape, nameData.shape)
# print(imageData)
# exit()

# from sklearn.datasets import load_iris
# iris_dataset = load_iris() # 붓꽃 데이터셋을 적재합니다. 
from sklearn.model_selection import train_test_split
# X_train, X_test, y_train, y_test = train_test_split(iris_dataset['data'], iris_dataset['target'], test_size = 0.2)
X_train, X_test, y_train, y_test = train_test_split(imageData, nameData, test_size = 0.2)
# 데이터셋을 랜덤하게 80%의 훈련셋과 20%의 테스트셋으로 분리합니다.
print(X_train.shape)
print(y_train.shape)
# print("특성1 범위: ", "[", min(X_train[:, 0]), ",", max(X_train[:, 0]), "]")
# print("특성2 범위: ", "[", min(X_train[:, 1]), ",", max(X_train[:, 1]), "]")
# print("특성3 범위: ", "[", min(X_train[:, 2]), ",", max(X_train[:, 2]), "]")
# print("특성4 범위: ", "[", min(X_train[:, 3]), ",", max(X_train[:, 3]), "]")
 
# from sklearn.preprocessing import StandardScaler
# sc = StandardScaler()
# sc.fit(X_train)
# X_train_std = sc.transform(X_train)
# X_test_std = sc.transform(X_test)
# print("표준화된 특성1 범위: ", "[", min(X_train_std[:, 0]), ",", max(X_train_std[:, 0]), "]")
# print("표준화된 특성2 범위: ", "[", min(X_train_std[:, 1]), ",", max(X_train_std[:, 1]), "]")
# print("표준화된 특성3 범위: ", "[", min(X_train_std[:, 2]), ",", max(X_train_std[:, 2]), "]")
# print("표준화된 특성4 범위: ", "[", min(X_train_std[:, 3]), ",", max(X_train_std[:, 3]), "]")
 
from sklearn.svm import SVC
 
# svm_model = SVC(kernel='rbf', C=8, gamma=0.1)
 
# svm_model.fit(X_train_std, y_train) # SVM 분류 모델 훈련
 
# y_pred = svm_model.predict(X_test_std) # 테스트
 
# print("예측된 라벨:", y_pred)
# print("ground-truth 라벨:", y_test)
 
# print("prediction accuracy: {:.2f}".format(np.mean(y_pred == y_test))) # 예측 정확도
 
import time
print('Test Start')

model = SVC(kernel='rbf', gamma=0.1, C=8)
model.fit(X_train, y_train)
acc = model.score(X_test, y_test)
print('Acc', acc) # gamma 0.1, C 8 -> 0.25 / gamma 0.1, C 7 -> 0.25

optAcc = -999
optG = 0
optX =0

gammaStart = 0.1
gammaEnd = 1
gammaStep = 0.1
cStart = 7
cEnd = 9
cStep = 0.1

gammaTurn = (gammaEnd-gammaStart)/gammaStep
cTurn = (cEnd-cStart)/cStep
print('#Turn', gammaTurn * cTurn)

counter = 0
for gamma in np.arange(gammaStart, gammaEnd, gammaStep):
    for c in np.arange(cStart, cEnd, cStep):
        counter += 1
        print(counter, end=" ")
        # t = time.time()
        model = SVC(kernel='rbf', gamma=gamma, C=c)
        model.fit(X_train, y_train)
        acc = model.score(X_test, y_test)
        if acc > optAcc:
            optG = gamma
            optC = c
            optAcc = acc
        # print(t-time.time())
print()
print('optG = %.2f' % optG)
print('optC = %.2f' % optC)
print('optAcc = %.2f' % optAcc)

# 최적의 조건으로 학습한 결과를 확인한다.
model = SVC(kernel='rbf', gamma=optG, C=optC)
model.fit(X_train, y_train)

print()
print('학습용 데이터로 측정한 정확도 = %.2f ' % model.score(X_test, y_test))
print('시험용 데이터로 측정한 정확도 = %.2f ' % model.score(X_test, y_test))