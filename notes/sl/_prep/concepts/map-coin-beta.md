---
title: 동전과 Beta prior
en: Beta prior for a coin
parent: mle-map
order: 70
summary: 앞면 확률에 Beta 분포를 prior로 두면 MAP 추정값이 가상의 횟수를 더한 식과 같아집니다. 가상의 횟수가 prior의 다른 표현이었음을 보여 주는 결과입니다.
signal: skim
related: []
---

## 정의와 수식

앞면 확률 $\theta$ 는 0과 1 사이의 값이므로 그 구간 위의 분포인 Beta 분포를 prior로 둡니다. 밀도는 $P(\theta) \propto \theta^{\alpha-1}(1-\theta)^{\beta-1}$ 입니다. [동전의 우도](map.html?s=sl&n=mle-coin-toss) $\theta^{n_H}(1-\theta)^{n_T}$ 와 곱하면 지수끼리 더해져서 posterior가 $\theta^{n_H+\alpha-1}(1-\theta)^{n_T+\beta-1}$ 에 비례합니다. 우도와 같은 꼴이므로 같은 방법으로 미분해서 [MAP](map.html?s=sl&n=map-posterior) 추정값을 얻습니다.

$$
\hat{\theta}_{\text{MAP}} = \frac{n_H + \alpha - 1}{n_H + n_T + \alpha + \beta - 2}
$$

[가상의 횟수](map.html?s=sl&n=coin-pseudo-counts)를 $m_H = \alpha - 1$, $m_T = \beta - 1$ 로 둔 식과 같습니다. $\alpha = \beta = 2$ 는 앞면과 뒷면을 한 번씩 미리 본 것과 같고 $D = \{H, H\}$ 에서 $\frac{3}{4}$ 을 줍니다. 가상의 횟수를 더하던 일이 prior를 곱하는 일이었다는 것이 이 결과의 뜻입니다.
