from sympy import expand, symbols, integrate


# TODO 답 안 맞으니까 고쳐야 함 아니 답이 뭔지도 애초에 정확히는 모르겠음 ㅠㅜ

t = symbols('t')
x0, x1, x2, x3 = symbols('x0 x1 x2 x3')
y0, y1, y2, y3 = symbols('y0 y1 y2 y3')

bezier = lambda z0, z1, z2, z3: \
    (1 - t)**3 * z0 + 3 * (1 - t)**2 * t * z1 \
    + 3 * (1 - t) * t**2 * z2 + t**3 * z3
bezierDeri = lambda z0, z1, z2, z3: \
    3 * (1 - t)**2 * (z1 - z0) \
    + 6 * (1 - t) * t * (z2 - z1) + 3 * t**2 * (z3 - z2)
bezierFunc = bezier(x0, x1, x2, x3) * bezierDeri(y0, y1, y2, y3) - \
    bezier(y0, y1, y2, y3) * bezierDeri(x0, x1, x2, x3)
bezierFunc = integrate(bezierFunc, t)

linear = lambda z0, z3: z3 * (2 - t) + z0 * (t - 1)
linearDeri = lambda z0, z3: z0 - z3
linearFunc = linear(x0, x3) * linearDeri(y0, y3) - \
    linear(y0, y3) * linearDeri(x0, x3)
linearFunc = integrate(linearFunc, t)

bezeirArea = bezierFunc.subs(t, 1) - bezierFunc.subs(t, 0)
linearArea = linearFunc.subs(t, 2) - linearFunc.subs(t, 1)
area = 0.5 * (bezeirArea + linearArea)

# string = expand(result)
# stringForWord = str(string)
# stringForWord = stringForWord.replace('**', '^')
# stringForWord  =stringForWord.replace('*', ' ')
# print(stringForWord)

variables = {'x0': 0, 'x1': 0, 'x2': 0, 'x3': 1,
             'y0': 0, 'y1': 1, 'y2': 1, 'y3': 1}

print(area.evalf(subs=variables))


# 수치의 의미를 생각해보자 -> 올바른 규칙
# 두께 정적 x 그래프로 생각해서 연속적인 변화

# 영어로 시작하는 접근은 좋은데 영어만 생각하지는 말자
# 한글에 대해서도 새로운 접근을 계속 생각해야 한다
# 영어 연구하면서 나오는 아이디어를 한글에도 적용해보자

# 직접 새롭게 만들어야 할 알고리즘, 아이디어에 관련하여 선택과 집중
# 계획을 명확하게 할 필요성; 보고서 작성, 논문; 스토리텔링; 이해 잘 되게
# 추후에 연구 정리할 때 과정과 결과를 명확하게 보여줄 수 있다; 가치 중심
# 마일스톤; 현재 진행도를 명확하게 할 수 있음

# 다음주; 다른 성격을 지닌 영어 폰트를 수집
# 폰트에서 두께를 얻을 생각을 해야 함 - 영어에서는 비교적 쉬움
# 기준선, 여백 관련된 타이포그래피? 지식 필요
# 계획을 제대로 세워야 하고

# 사진을 분석해서 폰트 가장자리를 얻어내고 openCV
# 얻은 선을 다시 베지어 형태로 나타낼 수 있느냐; raster to vector

# 인공지능 공부?