---
title: 로지스틱 회귀
en: Logistic regression
parent: risk-minimization
order: 50
summary: 두 클래스 가운데 하나를 맞히는 분류 모형입니다. 선형식을 로지스틱 함수에 넣어 확률로 바꾼다는 가정 하나만 선형회귀와 다릅니다. 새 손실과 닫힌 해가 없다는 결과는 그 가정에서 따라 나옵니다.
signal: none
related: []
---

## 왜 필요한가

선형회귀는 레이블이 실수일 때 쓰는 모형이었습니다. 레이블이 "불량이다, 아니다"처럼 두 클래스 가운데 하나라면 사정이 달라집니다. 알고 싶은 것은 클래스 1일 확률인데 선형식 $\mathbf{w}^T\mathbf{x} + b$ 의 값은 음수도 되고 1보다 커지기도 해서 그대로는 확률로 읽을 수 없습니다.

로지스틱 회귀(logistic regression)는 선형식을 로지스틱 함수에 통과시켜 0과 1 사이의 값으로 만들고 그 값을 클래스 1의 확률이라고 가정합니다. 이름에 회귀가 붙어 있지만 분류에 쓰는 모형입니다.

가정을 세운 뒤의 길은 선형회귀와 같습니다. 우도를 쓰고 음의 로그우도를 손실로 바꾸고 풉니다. 달라지는 곳은 $P(y \mid \mathbf{x})$ 를 무엇으로 두느냐 한 군데입니다. 다만 마지막 걸음에서 닫힌 해가 나오지 않습니다. 그래서 이 가지는 [경사하강법](map.html?s=sl&n=gradient-descent) 가지로 이어집니다.

## 이 가지의 흐름

1. 분류 모형은 클래스가 아니라 [클래스의 확률](map.html?s=sl&n=classification-probability-output)을 냅니다. 어디서 자를지는 임계값으로 따로 정합니다.
2. 선형식을 확률로 바꾸는 도구가 [로지스틱 함수](map.html?s=sl&n=logistic-function) $\phi(z) = \frac{1}{1+e^{-z}}$ 입니다.
3. 확률을 odds로 바꾸고 로그를 취하면 선형식이 그대로 나옵니다. 선형인 것은 확률이 아니라 [logit](map.html?s=sl&n=odds-logit)입니다.
4. 그래서 [결정 경계](map.html?s=sl&n=decision-boundary)가 선형입니다. 클래스는 선형식의 부호만 보고 정할 수 있습니다.
5. 레이블을 $+1$, $-1$ 로 부르면 두 클래스의 확률이 [한 식](map.html?s=sl&n=label-pm1-unified)으로 묶입니다.
6. 그 식으로 [MLE를 전개](map.html?s=sl&n=logreg-mle-objective)해 목적함수 $\sum_i \log(1+e^{-y_i\mathbf{w}^T\mathbf{x}_i})$ 를 얻습니다.
7. 가우시안 prior를 더해 [MAP](map.html?s=sl&n=logreg-map)로 풀면 같은 목적함수에 $\lambda\mathbf{w}^T\mathbf{w}$ 가 붙습니다.
8. [선형회귀의 유도와 나란히](map.html?s=sl&n=logreg-vs-linreg) 놓고 같은 줄과 다른 줄을 가릅니다.
9. 목적함수를 미분할 수는 있지만 미분이 0이 되는 점을 [식으로 풀 수 없습니다](map.html?s=sl&n=logreg-no-closed-form). 반복해서 찾습니다.

<div class="cal key">

**이 가지에서 반드시 남겨야 할 두 문장**

선형회귀와 다른 곳은 $P(y \mid \mathbf{x})$ 를 무엇으로 두었느냐 하나입니다. 그리고 클래스를 정할 때는 로지스틱 함수 값을 계산하지 않고 선형식의 부호를 봅니다.

</div>
