from PIL import Image, ImageDraw, ImageFont
import os
import datetime
    
# import textwrap
# # Text wraper to handle long text
# # 40자를 넘어갈 경우 여러 줄로 나눔
# lines = textwrap.wrap(message, width=40)

mainDir = "./python"
fontSaveDir = f"{mainDir}/font"
imageSaveDir = f"{mainDir}/image"

def getFonts():
    fontFamilyList = os.listdir(fontSaveDir)
    fontList = []
    for fontFamily in fontFamilyList:
        fileList = os.listdir(fontSaveDir + f"/{fontFamily}")
        for font in fileList:
            if font[-4:] in ['.ttf', '.otf']:
                fontList.append((font, fontSaveDir + f"/{fontFamily}/{font}"))
    # for i, x in enumerate(fontList):
    #     print(i, x)
    return fontList

print(getFonts())

def makeImage(text, fontData, path=None):
    fontName, fontDir = fontData
    fontSize = 28
    font = ImageFont.truetype(fontDir, size=fontSize)

    # imageSize = (100, 100)
    # start = (10, 10)
    # image =Image.new('RGB', imageSize, color='white')
    # draw = ImageDraw.Draw(image)
    # draw.text(start, text, font=font, fill='black')

    margin = 5
    minWidth, minHeight = font.getsize(text)
    image =Image.new('RGB', (minWidth+2*margin, minHeight+2*margin), color='white')
    draw = ImageDraw.Draw(image)

    draw.text((margin, margin), text, font=font, fill='black')

    now = datetime.datetime.now()
    # day = f"{now.year}-{now.month}-{now.day}-{now.hour}-{now.minute}-{now.second}"
    day = f"{now.hour}-{now.minute}-{now.second}"
    savePath = imageSaveDir + path if path is not None else imageSaveDir
    if not os.path.isdir(savePath):
        os.mkdir(savePath)
    image.save(f'{savePath}/{day} {fontName[:-4:2]} {text[:4]}.png')

def getImages():
    return [(image, imageSaveDir + f"/{image}") for image in os.listdir(imageSaveDir)]