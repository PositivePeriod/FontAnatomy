BASIC = {
    1: "two point thickness of transverse stem",
    2: "thickness of stem",
    3: "stem thickness uniformity",
    4: "uniformity of ‘o’ thickness",
    5: "’ppichim’ thickness uniformity",
    6: "‘naelijeom’ thickness uniformity",
    7: "vertical stem tilt",
    8: "‘ㅅ ppichim’ shape",
    9: "‘ㅇ,ㅎ’ opened endpoint angle",
    10: "horizontal stem tilt",
    11: "‘ㄱ ppichim’ inclination",
    12: "‘ㅎ,ㅊ’ start stem inclination",
    13: "choseong and jongseong height ratio",
    14: "choseong jungseong jongseong height ratio",
    15: "previous jongseong and current choseong height ratio",
    16: "choseong jungseong height ratio",
    17: "horizontal and vertical stem thickness ratio",
    18: "’ppichim’ ‘naelijeom’ height ratio",
    19: "‘ㅅ,ㅈ,ㅊ’ left-right symmetry",
    20: "vertical stem and double stem ratio",
    21: "‘ㅏ,ㅑ,ㅓ,ㅕ,ㅔ,ㅖ’ upper-lower symmetry",
    22: "double stem height difference",
    23: "‘ㅁ,ㅂ,ㅇ,ㅍ,ㅎ’ left-right symmetry",
    24: "‘ㅑ,ㅕ’ side stem symmetry",
    25: "‘ㅣ,ㅐ,ㅒ’ upper-lower symmetry",
    26: "‘ㅗ,ㅛ,ㅜ,ㅠ,ㅡ’ left-right symmetry",
    27: "top, middle, bottom alignment",
    28: "choseong jungseong start position",
    29: "jungseong jongseong spacing size",
    30: "choseong jungseong spacing size",
    31: "choseong jungseong jongseong between-space ratio",
    32: "choseong jungseong jongseong width ratio",
    33: "choseong bounding-box ratio",
    34: "between-space in bounding-box ratio",
    35: "‘를’ horizontal stem between-space ratio",
    36: "‘빼’ vertical stem between-space ratio",
    37: "‘o,ㅎ’ ellipse ratio",
    38: "‘ㅇ,ㅎ’ symmetry",
    39: "vertical letter-line straight",
    40: "character width",
    41: "visual midline",
    42: "gap between visual midline and bottom line",
    43: "’ppichim’ length (ㅈㅊ)",
    44: "between character space",
    45: "proportional width or fixed width",
    46: "jongseong start position",
    47: "difference between character high and low point",
    48: "talnemo feature",
    49: "curvature of consonant serif",
    50: "slope of consonant serif",
    51: "existence of vertical stem serif",
    52: "slope and shape of vertical stem serif",
    53: "slope of double vertical stem",
    54: "curvature of single vertical stem",
    55: "existence of ‘ㅇ,ㅎ’ dolgi(start serif)",
    56: "‘ㅇ’ open or not",
    57: "‘ㅅ,ㅈ’ fork position",
    58: "‘ㅅ,ㅈ’ fork angle",
    59: "existence of connected stem",
    60: "degree of flexion ‘ㄴ,ㄹ,ㅁ,ㅂ’",
    61: "‘ㄴ,ㄹ,ㅁ,ㅂ’ connection point type",
    62: "existence of contact of double consonants",
    63: "contact with consonant and vowel",
    64: "‘ㅍ’ internal opening (closure is common)",
    65: "contact with horisontal and vertical stems (contact is common)",
    66: "existence of stem closing (not right angle)",
    67: "contour box ratio of whole character (8:10, 9:10, etc.)",
    68: "Slope of the starting positions with choseong and jungseong",
    69: "starting vetical positions with choseong and jungseong (choseong >= jungseong)",
    70: "types of internal space ( not rectangular)",
    71: "choseong jungseong width ratio",
    72: "existence of ‘l’ outline curvature",
    73: "existence of texture expression inside stem",
    74: "existence of closed outer point",
    75: "existence of graphic elements inside stem",
}

KMC = {
    1: {'prop': [9, 56, 59, 63, 65], 'msg': 'consonant connection'},
    2: {'prop': [34, 47, 70], 'msg': 'internal space balance'},
    3: {'prop': [29, 30, 31, 46, 29], 'msg': 'consonant balance'},
    4: {'prop': [73, 74, 75], 'msg': 'decoration – inner part'},
    5: {'prop': [38, 49, 50, 7, 62], 'msg': 'consonant and vowel slope'},
    6: {'prop': [72], 'msg': 'decoration - outline'},
    7: {'prop': [1, 5, 6], 'msg': 'thickness uniformity'},
    9: {'prop': [40, 44, 45], 'msg': 'character width'},
    10: {'prop': [69], 'msg': 'start position'},
    11: {'prop': [27, 41], 'msg': 'midline'},
    12: {'prop': [7, 14, 32, 54], 'msg': 'consonant height balance'},
    13: {'prop': [37, 64], 'msg': 'ㅇ circle ratio'},
    14: {'prop': [57, 58], 'msg': 'ㅅ type'},
    15: {'prop': [17], 'msg': 'stem width ratio'},
    16: {'prop': [51, 52, 66], 'msg': 'serif and closing'},
    17: {'prop': [3, 4], 'msg': 'uniformity of consonant thickness'},
    18: {'prop': [10, 15, 21, 26, 39], 'msg': 'consonant symmetry'},
    19: {'prop': [60, 61], 'msg': 'ㄴ,ㅁtype'},
    20: {'prop': [13, 14, 33], 'msg': 'consonant and vowel ratio'},
    21: {'prop': [16, 28], 'msg': 'choseong jungseong jongseong position'},
    22: {'prop': [55], 'msg': 'o dolgi type'},
    23: {'prop': [8, 19], 'msg': 'ㅅ left-right symmetry'},
    24: {'prop': [2], 'msg': 'thickness'},
    25: {'prop': [23], 'msg': 'ㅁ,ㅍ left-right symmetry'},
    26: {'prop': [12, 39, 42], 'msg': 'vertical slope'},
    27: {'prop': [11, 18, 20, 22, 24, 25, 32, 35, 36, 43, 53, 68, 71], 'msg': 'miscellaneous'},
}

PCA = {
    1: {'prop': [13, 14, 30, 40], 'msg': 'consonant and vowel size balance'},
    2: {'prop': [3, 4, 5, 6], 'msg': 'uniformity of thickness,'},
    3: {'prop': [21, 28, 31], 'msg': 'midline, shape of inner space'},
    4: {'prop': [49, 50, 51], 'msg': 'existence of serif, serif type'},
    5: {'prop': [2, 56, 59], 'msg': '‘ㄴㄹㅁㅂ’ consonant shape'},
    6: {'prop': [16, 29, 41, 71, 72], 'msg': 'existence of decoration'},
    7: {'prop': [23, 45, 48], 'msg': 'distance between consonant and vowel'},
    8: {'prop': [33, 43, 68], 'msg': 'character width, proportional width'},
    9: {'prop': [1, 17, 23, 41], 'msg': 'left-right symmetry'},
    10: {'prop': [7, 35, 42, 66, 68], 'msg': 'talnemo'},
    11: {'prop': [2, 59], 'msg': 'Weight'},
    12: {'prop': [10, 13, 46], 'msg': 'horizontal slope'},
    13: {'prop': [13, 16, 39, 46, 54, 62], 'msg': 'cursiveness'},
    14: {'prop': [14, 65, 66], 'msg': 'closing type'},
}

for i in range(len(PCA)):
    prop = PCA[i+1]
    print(i+1, prop["msg"])
    for x in prop["prop"]:
        print(x, BASIC[x])
    print()

"""
PCA
1 consonant and vowel size balance
13 choseong and jongseong height ratio
14 choseong jungseong jongseong height ratio
30 choseong jungseong spacing size
40 character width

2 uniformity of thickness,
3 stem thickness uniformity
4 uniformity of ‘o’ thickness
5 ’ppichim’ thickness uniformity
6 ‘naelijeom’ thickness uniformity

3 midline, shape of inner space
21 ‘ㅏ,ㅑ,ㅓ,ㅕ,ㅔ,ㅖ’ upper-lower symmetry
28 choseong jungseong start position
31 choseong jungseong jongseong between-space ratio

4 existence of serif, serif type
49 curvature of consonant serif
50 slope of consonant serif
51 existence of vertical stem serif

5 ‘ㄴㄹㅁㅂ’ consonant shape
2 thickness of stem
56 ‘ㅇ’ open or not
59 existence of connected stem

6 existence of decoration
16 choseong jungseong height ratio
29 jungseong jongseong spacing size
41 visual midline
71 choseong jungseong width ratio
72 existence of ‘l’ outline curvature

7 distance between consonant and vowel
23 ‘ㅁ,ㅂ,ㅇ,ㅍ,ㅎ’ left-right symmetry
45 proportional width or fixed width
48 talnemo feature

8 character width, proportional width
33 choseong bounding-box ratio
43 ’ppichim’ length (ㅈㅊ)
68 Slope of the starting positions with choseong and jungseong

9 left-right symmetry
1 two point thickness of transverse stem
17 horizontal and vertical stem thickness ratio
23 ‘ㅁ,ㅂ,ㅇ,ㅍ,ㅎ’ left-right symmetry
41 visual midline

10 talnemo
7 vertical stem tilt
35 ‘를’ horizontal stem between-space ratio
42 gap between visual midline and bottom line
66 existence of stem closing (not right angle)
68 Slope of the starting positions with choseong and jungseong

11 Weight
2 thickness of stem
59 existence of connected stem

12 horizontal slope
10 horizontal stem tilt
13 choseong and jongseong height ratio
46 jongseong start position

13 cursiveness
13 choseong and jongseong height ratio
16 choseong jungseong height ratio
39 vertical letter-line straight
46 jongseong start position
54 curvature of single vertical stem
62 existence of contact of double consonants

14 closing type
14 choseong jungseong jongseong height ratio
65 contact with horisontal and vertical stems (contact is common)
66 existence of stem closing (not right angle)
"""