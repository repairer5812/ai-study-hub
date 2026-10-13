---
title: PAC learning과 VC dimension
en: PAC learning and VC dimension
parent: erm
order: 60
summary: estimation error가 표본 수와 가설 집합의 크기에 따라 얼마나 되는지를 식으로 재려는 이론의 이름입니다. 이 지도에서는 이름과 뜻만 적습니다.
signal: out
related: []
---

## 왜 필요한가

앞 노드는 estimation error가 표본이 늘면 줄고 가설 집합이 커지면 는다고 했습니다. 방향만 말했을 뿐 얼마나 줄고 얼마나 느는지는 말하지 않았습니다. 그 "얼마나"에 식으로 답하려는 이론이 있고 여기서는 그 이름 둘만 적어 둡니다.

PAC learning은 probably approximately correct의 줄임말입니다. 높은 확률로 거의 맞는 함수를 얻으려면 표본이 얼마나 있어야 하는지를 묻는 틀입니다. VC dimension은 가설 집합이 얼마나 다양한 함수를 담고 있는지를 수 하나로 잰 것입니다. 앞 노드에서 말로만 쓴 "가설 집합의 크기"를 재는 자라고 보면 됩니다.

두 이름이 주는 결론의 방향은 [앞 노드의 표](map.html?s=sl&n=complexity-tradeoff)와 같습니다. estimation error가 넘지 않는 한계는 표본이 많을수록 작아지고 가설 집합이 복잡할수록 커집니다. 그 한계를 주는 식은 이 지도에서 다루지 않습니다.
