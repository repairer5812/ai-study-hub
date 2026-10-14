---
part: D
type: essay
no: 1
points: 10
topic: mle-map
concepts: [mle-vs-map, map-posterior]
title: MLE versus MAP
---

<section data-q="stem">

Compare maximum likelihood estimation (MLE) and maximum a posteriori estimation (MAP) for a parameter $\boldsymbol{\theta}$ and data $D$. In two or three sentences, state

(i) which quantity each method maximizes,

(ii) which extra term appears when the MAP objective is written as a negative logarithm to be minimized, compared with the negative log-likelihood, and

(iii) what role the prior plays. Give one concrete example.

</section>

<section data-q="ko">

매개변수 $\boldsymbol{\theta}$ 와 데이터 $D$ 에 대해 MLE 와 MAP 를 비교하세요. 두세 문장으로 다음을 답합니다. (i) 두 방법이 각각 무엇을 최대화하는가. (ii) MAP 의 목적함수를 최소화할 음의 로그 꼴로 쓰면 음의 로그우도에 견주어 어떤 항이 더해지는가. (iii) prior 는 어떤 역할을 하는가. 구체적인 예를 하나 드세요.

</section>

<section data-q="answer">

(i) MLE는 우도 $P(D ; \boldsymbol{\theta})$ 를 최대화합니다. 데이터가 나올 확률을 가장 크게 하는 $\boldsymbol{\theta}$ 를 고릅니다. MAP는 posterior $P(\boldsymbol{\theta} \mid D)$ 를 최대화합니다. Bayes rule에 따라

$$
\begin{aligned}
P(\boldsymbol{\theta} \mid D) &= \frac{P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})}{P(D)} \\[0.4em]
&\propto P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})
\end{aligned}
$$

이므로 우도에 prior를 곱한 것을 최대화하는 것과 같습니다. 분모 $P(D)$ 는 $\boldsymbol{\theta}$ 와 무관해서 빠집니다.

(ii) 음의 로그를 취하면

$$
\mathcal{L}^{\text{MAP}}_D(\boldsymbol{\theta}) = \mathcal{L}_D(\boldsymbol{\theta}) - \log P(\boldsymbol{\theta}) + \text{const}
$$

입니다. 음의 로그우도는 그대로이고 $-\log P(\boldsymbol{\theta})$ 한 항이 더해집니다. 두 방법의 차이는 이 항 하나입니다.

(iii) prior는 데이터를 보기 전에 $\boldsymbol{\theta}$ 가 어떤 값일 것 같은지에 대한 믿음입니다. 예를 들어 선형 모형의 계수에 평균 0인 가우시안 prior를 두면 더해지는 항이 계수의 크기에 벌점을 주어 계수가 커지지 못하게 막습니다. 동전에서는 "공정한 쪽에 가깝다"는 믿음이 표본이 적을 때 추정값을 0.5 쪽으로 당깁니다.

</section>

<section data-q="rubric">

모두 10점.

- MLE가 최대화하는 것 2점: 우도 $P(D ; \boldsymbol{\theta})$. 막대를 쓴 $P(D \mid \boldsymbol{\theta})$ 도 정답. "$\boldsymbol{\theta}$ 가 주어졌을 때 데이터의 확률"이라고 말로 써도 정답. posterior라고 쓰면 0점.
- MAP가 최대화하는 것 3점: posterior $P(\boldsymbol{\theta} \mid D)$ 라는 답(2점), 그것이 우도와 prior의 곱 $P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})$ 에 비례한다는 설명(1점). "likelihood times prior"라고만 써도 3점.
- 더해지는 항 3점: $-\log P(\boldsymbol{\theta})$. "음의 로그 prior", "negative log-prior"도 정답. 최대화 꼴로 답해 "로그우도에 $\log P(\boldsymbol{\theta})$ 가 더해진다"고 써도 3점. 부호 없이 "prior가 더해진다"고만 쓰면 1점.
- prior의 역할과 예 2점: 데이터를 보기 전의 믿음 또는 사전 지식이라는 설명(1점), 예 하나(1점). 예는 평균 0인 가우시안 prior가 계수를 작게 유지시킨다, 라플라스 prior가 벌점 항을 만든다, 동전에서 공정하다는 믿음이 추정값을 0.5 쪽으로 당긴다 가운데 어느 것이든 인정.

</section>

<section data-q="checks">

@ MLE가 최대화하는 것
- 2 | 우도 $P(D ; \boldsymbol{\theta})$ 라고 썼다($P(D \mid \boldsymbol{\theta})$ 나 "$\boldsymbol{\theta}$ 가 주어졌을 때 데이터의 확률"이라고 써도 된다. posterior라고 쓰면 안 된다)

@ MAP가 최대화하는 것
- 2 | posterior $P(\boldsymbol{\theta} \mid D)$ 라고 썼다("likelihood times prior"라고만 썼어도 체크한다)
- 1 | 그것이 우도와 prior의 곱 $P(D \mid \boldsymbol{\theta})\, P(\boldsymbol{\theta})$ 에 비례한다고 썼다("likelihood times prior"라고 쓴 것도 된다)

@ 더해지는 항
- 1 | prior에서 온 항이 더해진다고 썼다(부호 없이 "prior가 더해진다"고만 썼어도 이 항목은 체크한다)
- 2 | 그 항을 $-\log P(\boldsymbol{\theta})$ 로 썼다("음의 로그 prior", "negative log-prior"도 된다. 최대화 꼴로 "로그우도에 $\log P(\boldsymbol{\theta})$ 가 더해진다"고 써도 된다)

@ prior의 역할과 예
- 1 | prior가 데이터를 보기 전의 믿음 또는 사전 지식이라고 썼다
- 1 | 예를 하나 들었다. 평균 0인 가우시안 prior가 계수를 작게 유지시킨다, 라플라스 prior가 벌점 항을 만든다, 동전에서 공정하다는 믿음이 추정값을 0.5 쪽으로 당긴다 가운데 어느 것이든 된다

</section>
