<img src="https://user-images.githubusercontent.com/67185299/104673885-f3c34800-5725-11eb-8a78-58dec6f0a67f.png" width="1000"></img>
<br>
<br>
<br>

안녕하세요!  
  
한 번에, 한 곳에서 문서 작성 완료!  
양식당 어플리케이션을 만든, 양식당의 OWNER 폼생폼사😎 입니다.  

개별 폼과 그룹 단위의 폼 작성은 물론, 폼 저장 서비스까지!  
양식 맛집, 양식당🍽️에서 쉽고 빠르게 문서를 만들어 보세요.  
  
[Go to YangSikDang page | our result💻](https://yangsikdang.ml/)  
[Go to github wiki | our record✍🏻](https://github.com/codestates/FormLive-FormDie_Client/wiki)
<br>
<br>

### 양식당 서비스를 만든 이유
  
_이 폼은 여기있고, 저 폼은 저기 있고_  
_폼들이 여기저기 흩어져 있어서 서류들을 제출하기가 힘들어요._  
<br>

_이미지를 넣어야 하거나, 체크 표시 등 특수 기호를 넣으면서_  
_기존 양식이 어그러져서 불편했던 적이 한 두 번이 아니예요!_  
<br>

_살면서 한 번 작성한 서류를 다시 활용할 방법은 없을까요?_  
_필요한 부분만 바꾸어서 빠르게 제출하고 싶어요._  
<br>
<br>
**여러분! 폼📜 때문에 영원히 고통 받을 순 없잖아요.**  
**이제 양식당에서 폼나게 서류를 작성해 보세요✍🏻**  
<br>
<br>
  
### 많은 것들을 배운 양식당 프로젝트
- **금교중(@david419kr | Backend)**  
`하나 하나, 계단을 오른다`
1st 프로젝트에 이어 두 번 째로 시작해본 프로젝트. 아무래도 두 번 째이다보니, 백지에서부터 프로젝트를 쌓아올린다는 막막함은 확실히 퍼스트보다 덜했습니다. 프로젝트의 규모가 더 커지고 DB의 관계도가 복잡해지면서 백엔드 입장에서도 도전적인 경험이었습니다. 하지만, 비록 프로젝트의 규모가 커지고 문제도 더욱 많아지더라도, 1st 프로젝트를 진행하며 어느 정도 감이 잡혔는지, 이번에는 난이도가 올라갔음에도 불구하고 계획한 대로 일정이 착착 진행되어 무언가 딱 들어맞는 느낌이 들었습니다. typeORM을 이용하면서 단계별로 문제에 봉착하며 해결하는데, 마치 계단을 한 계단 한 계단 차근차근 올라가며 실력이 붙는 기분이 들어 고양감을 느낄 수 있었습니다. 막히는 곳이 있더라도 차근차근, 공부를 해가며 단계별로 해결해가는 이 경험이, 앞으로의 개발 생활에서도 큰 도움이 될 것 같습니다.
<details>
<summary>금교중's Worklog📜 | Click!</summary>
<div markdown="3">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=david419kr&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Back-end
- **Stack** : nodejs, Javascript, MySQL, aws EC2, aws RDS, React, passport, typeORM
- **Works** :  
  1. 프로토타입에 기반하여 스키마 설계 및 제작
      - dbDiagram을 이용하여 뼈대를 설계
      - 그 뼈대를 토대로 typeORM으로 모델을 작성.
      - typeORM은 typescript에서 이용하기 아주 편리하나, 공식문서의 질이 sequelize에 비해 많이 떨어지는듯한 느낌을 받았다.
  2. 엔드포인트 설계 및 API 문서 작성
      - REST API에 대하여 약간이나마 공부하고 그에 기반하여 엔드포인트를 설계함
      - 엔드포인트 설계한 것에 따라 GitBook을 이용하여 API 문서를 작성
  3. passport을 이용한 인증 구현
      - 이전에는 jwt를 써보았으니 이번에는 passport를 이용하여 세션 인증을 구현.
      - 소셜 로그인도 이전에는 맨땅에서부터 구현해보았으나, 이번에는 passport를 이용해서 구현하였다.
  4. 유저 프로필 사진 업로드 기능 구현
      - multer를 이용하여 이미지를 업로드 받은 후 이를 이용 할 수 있도록 DB에 정보를 저장.
  5. 유저가 작성한 양식을 업로드, 수정, 삭제, 로드 할 수 있도록 구현
      - JSON 형태로 폼 데이터를 받아 이를 DB에 저장.
  6. 그 외 ORM과 DB 쿼리 관련 전반
      - relation과 join을 이용한 데이터 쿼리 처리
  7. aws EC2 HTTPS 배포 설정
      - .env를 이용하여 환경변수 관리.
      - 로컬에서 실행시에는 HTTP로 실행되며 EC2에서 실행 될 때는 자동으로는 HTTPS로 실행되도록 설정.

</div>
</details>
<br>

- **함승균(@hsk9210 | Backend)**  
`모든 사람이 나의 스승이다`
기존과는 다르게 순수하게 깃허브를 메인으로 온라인 작업만으로 한달간 프로젝트를 진행하는 것은 새로운 경험이자 도전이었습니다. 처음에는 현실 회사에서 직접 대면하면서 서비스 운영을 할 때에도 소통에 어려움이 없지는 않았는데, 순수 100% 언택트로 성공이 가능할까 의구심도 들었고, 기술 스택을 프로젝트의 진행중에 최적화하여 바꾸는 것에 대한 고민도 있었습니다. 하지만 오히려, 동기적으로 온라인에 연결된 21세기의 환경이 팀원간의 소통과 재빠른 반응에 큰 도움을 주어 성공적인 마무리를 할 수 있었음을 깨달았습니다. 특히, 회사였다면 정기적으로 학습한 것을 발표하는 시간에만 한정되었을 내용들을, 교중님을 통해 초기 TypeScript 기반으로 express 세팅을 하며 ORM의 Relation 기능을 적극적으로 활용하는 것을 배웠고, 승용님을 통해서는 React를 통한 UI를 어떻게 PDF화 하여 인쇄 및 다운로드를 하게 되는지에 대한 결론을 얻게 되었으며, 영모님을 통해서는 초기 기획과 SR에서 어떻게 디테일을 살리고 Redux의 store가 페이지를 갱신하는 상황에서도 지워지지 않게 할 수 있는지를 배울 수 있었습니다. 이 경험을 통해 앞으로의 프로젝트에서도 순수 온라인을 통한 협업으로 프로젝트 성공이 충분히 가능하다는 확신을 하게 되었습니다.
<details>
<summary>함승균's Worklog📜 | Click!</summary>
<div markdown="4">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=hsk9210&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Back-end
- **Stack** :  nodejs, Javascript, TypeScript, TypeORM, passport, MySQL, aws EC2, React-pdf
- **Works** :  
  0. 플로우차트 설정
     - 전체 프로젝트의 UI에 따른 플로우차트 기록
  1. 개발환경 설정
     - `typeorm-model-generator`등 연관모듈을 통해 ORM 엔티티 생성 테스트.
  2. 개발용 아키텍처 및 테크트리 설계 평가
     - 초기에 도입할 인증관리(passport.js), DB(mongoDB, MySQL)와 ORM(Sequelize, TypeORM)을
       기획안에 따른 테스트를 통해 어느 기술을 도입할지에 대한 적합성 평가.
  3. 회원가입 구현
     - 로컬에서는 `passport`, `bcrypt`를 이용한 회원가입 구현
     - OAuth 2.0 에서는 Naver OAuth를 대상으로 개발.
  4. 회원탈퇴
     - `session` id 체크를 통해 회원탈퇴
     - 탈퇴 후 Home 루트로 리다이렉트 처리
  5. user controller 리팩토링
     - 기존 코드를 재사용이 가능하게 각 메소드를 전역으로 분리.
  6. GET /form API
     - 페이지네이션, 조회순&최신순 정렬, 검색어Like, 총 양식 개수 등 범용 api로 작성.
  7. GET /user API
     - 작성 후 API response 스펙 변경에 따른 리팩토링.
  8. PATCH, GET /group API
     - 초기 SQL 버전 쿼리문 작성.
  9. POST /suggestion
     - Multer를 통한 client to server 파일 업로드 API 구현.
  10. React-pdf(front)
     - 초기 NextJS 페이지에 붙일 테스트 페이지 작성.
</div>
</details>
<br>

- **백승용(@baekseungyong | Frontend)**   
`나도 할 수 있다` 퍼스트 프로젝트하면서 프론트엔드의 지식이 조금은 쌓였다고 생각했는데 새로운 스택을 도입하면서 처음부터 공부해야되는 것과 새로운 것에 도전하면서 두려움과 막막함이 있었는데 팀원들이 공유한 것을 바탕으로 다시 공부해 보니 이해할 수 있었습니다. 그리고 내가 맡은 업무를 찾아보면서 할 수 있는 것과 할 수 없는 것을 구분할 수 있었고 팀원들에게 그 상황을 공유해 보고 같이 해결 할 수 있으면 해결해보고 아니면 다른 방법으로 할 수 있는지 논의해서 해결 방안을 찾으려고 했었습니다. 팀원들의 도움을 많이 받을 수 있었습니다. 또한, 각자만의 의사소통 방법이 있어 이해하지 못하거나 헷갈리는 것이 있으면 다시 물어 보면서 집고 넘어갔었습니다. 이번 프로젝트를 경험으로 같이 일하는 것에 힘든 점과 좋은 점이 있었고 이번 경험으로 같이 업무를 진행했을 때 좀 더 수월했을 것으로 생각합니다.
<details>
<summary>백승용's Worklog📜 | Click!</summary>
<div markdown="1">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=baekseungyong&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Member  
- **Position** : Front-end
- **Stack** : React, React Hooks, Redux, React-Saga, Next JS, CSS, Javascript, HTML, AWS S3
- **Works** :  
  1. 와이어프레임 작성
      - 페이지 구성 및 와이어프레임 작성을 위해 prototype을 작성
      - prototype을 기반으로 PPT로 와이어프레임 작성
  2. Index Page 
      - 루트(/) 페이지 UI 구현
      - 웹 서비스 설명을 위해 css animation 및 @keyframes를 사용하여 슬라이드 애니메이션 구현
      - css flex를 사용하여 레이아웃 배치
  3. 로그인 / 회원가입 페이지 UI 구현
      - css transition을 통해 사이드에서 나타나게 구현
      - useForm을 사용하여 input 구현
      - css ::placeholer를 사용하여 placeholder의 색상과 위치 조정
      - css flex를 사용하여 레이아웃 배치
  4. 파일 업로드하여 서버에 파일 보내는 기능 구현
      - FormData로 파일 업로드와 useForm을 사용하여 파일 업로드한 것을 서버로 전송할 수 있게 기능 구현
  5. History 페이지 UI 및 데이터 렌더
      - next js의 getInitProps를 사용하여 서버에서 데이터를 받아온 후에
        redux-saga를 통해 state 값을 변경하여 데이터 값을 렌더함
  6. @react-pdf/renderer 라이브러리를 통해 이미지 및 텍스트 미리보기 구현
      - pdf에 이미지와 텍스트의 위치 값을 고정 시킴
      - next js에서 이미지 불러오기 위해 next-images를 추가 설치
      - 이미지 위에 텍스트를 얹혀놓기 위해 StyleSheet를 사용
</div>
</details>
<br>

- **이영모(@yeongbba | Frontend)**  
`나의 단점은 너가, 너의 단점은 내가!` 팀의 개념과 나의 역할에 대해 깊게 생각해 보았던 프로젝트.  
어디에서 일하더라도 저의 장점으로 누군가의 단점을 메워줄 수 있는 사람이 되어야 겠다는 생각이 들었어요. 특히 이번 프로젝트에서 팀원들의 성향과 장단점이 다 달랐는데, 그렇기 때문에 팀으로 일할 때 더 시너지를 얻을 수 있었어요. 효율성과 빠른 해결력이 장점인 교중님, 꼼꼼함과 논리력이 장점인 승균님, 감성과 남들이 보지 못하는 것을 보는 예리함을 가지고 계신 승용님. 프로젝트에 대한 걱정이 많았지만, 이렇게 팀원들이 각각 지니고 있는 장점들로 저의 단점들을 잘 커버해 주었기 때문에 프로젝트를 끝까지 해낼 수 있었다고 생각해요. 저 또한 팀원들에게 도움을 주고 싶었고, 프로젝트를 전체적으로 조망하고 의견을 조율하는 것이 저의 장점이라 생각하여 그 부분에 초점을 맞춰 도움이 되도록 노력했어요. 이번 프로젝트는 팀으로서의 시너지를 경험할 수 있었던 시간이었고, 실제 일을 하게 되면 이 경험처럼 팀에 부족한 부분과 나의 장점을 잘 파악하여 팀원 모두에게 도움이 될 수 있는 사람이 되어야겠다는 생각이 듭니다.
<details>
<summary>이영모's Worklog📜 | Click!</summary>
<div markdown="2">
<br>

![badge](https://img.shields.io/static/v1?label=Github&message=yeongbba&color=blue&style=for-the-badge&logo=github)  

- **Role** : Team Leader  
- **Position** : Front-end
- **Stack** : Typescript, React, React Hooks, Next JS, Redux, Redux-Saga, Redux-Persist, Postcss, HTML, Nginx, HTTPS, EC2, Route53 
- **Works** :  
  1. UI Design 문서 작성  
      - UI & UX를 중심으로, 실제 화면과 같이 구현하는 작업 진행
      - 메인 소개, 로그인, 홈, 폼 작성 페이지 등 약 15장의 페이지 UI 구현
      - 구현된 화면들을 토대로 백엔드에서부터 프론트엔드까지의 데이터 흐름에 대한 내용 정립
  2. https 설정 및 Deploy 환경 구축
      - AWS EC2와 Nginx를 사용하여, 클라이언트와 서버 배포 환경 세팅
      - Freenom, Route53을 사용하여 도메인 설정을 한 후, letsencrypt로 https 적용
      - next js로 정적 파일을 배포하기 위해, Nginx로 리버스 프록시 설정
  3. 프론트엔드 스택들의 연결 및 작업 환경 설정
      - Typescript, Next JS, React, Redux, Redux-Saga의 Config 환경 설정 및 연결 작업 진행
      - css에 사용될 font 파일과 아이콘 svg 파일 준비
      - postcss를 이용해 공통적으로 사용될 color와 font 값 변수화
  4. User CRUD
      - User 가입, 프로필 확인, 수정, 삭제 UI 제작
      - 회원가입 및 수정, 삭제 시 유효성 검사 기능 추가
      - FormData를 활용하여 이미지 프리뷰 기능과 업로드 기능 제작
  5. Main & Home Page
      - Main Page & Home Page UI 구현
      - 로그인 여부, Path 종류에 따라 분류하여, 다르게 SSR이 작동되도록 처리
  6. Form & Form Group Page
      - Form Page & Form Group Page UI 구현
      - React의 useState를 활용해 여러 개 중 한 개만 선택, 한 번에 여러 개 선택 하는 기능을 구현
  7. dynamic routing
      - next js의 dynamic routing을 이용하여, 폼 아이디 별로 다른 페이지로 이동하게 함. 
      - history, Form, FormGroup 페이지에서 작성 완료인지, 임시 저장인지에 따라 폼 작성 혹은 PDF 페이지로 구별하여 랜더링.
  8. redux persist
      - PDF 페이지로 넘어갈 때, 새로고침 되면서 데이터가 유실되는 현상을 막기 위해 Redux Persist 도입.  
      - 필요한 부분인 Form에 대한 부분만 Persist 효과를 주어, User에 관한 스테이트는 유동적으로 운영.

</div>
</details>
<br>

### 프로젝트에서 사용한 스택  
<br>
<img src="https://user-images.githubusercontent.com/67185299/106525546-7e2de900-6527-11eb-8dac-b1ed03757b6d.png" width="1000"></img>
<br>

### 서비스 플로우 차트[요약 버전] 
[To See Full Version | Click!](https://miro.com/app/board/o9J_lWGueg8=/)    
<img src="https://user-images.githubusercontent.com/67185299/106451204-8fe0a380-64c9-11eb-8603-c34ee48fd387.jpg" width="1000"></img>
<br>

### 양식당 주요 페이지 뷰
- 양식당 메인 화면  
  
<img src="https://user-images.githubusercontent.com/67185299/106558906-ef8d8c00-6567-11eb-900b-5ce97a184cf5.gif" width="1000"></img>
<br>
<br>

- 폼 그룹 작성 플로우  
  
<img src="https://user-images.githubusercontent.com/67185299/106529768-686ff200-652e-11eb-84b9-934b528648bc.gif" width="1000"></img>
<br>
<br>

- 커스텀 폼 그룹 작성 플로우
  
<img src="https://user-images.githubusercontent.com/67185299/106529854-8d646500-652e-11eb-8d1c-53d63f586e93.gif" width="1000"></img>
<br>
<br>

- 히스토리 기록 보기
  
<img src="https://user-images.githubusercontent.com/67185299/106565790-b0b10380-6572-11eb-8e74-6e34b9066542.gif" width="1000"></img>
<br>
<br>

- 새로운 폼 제안하기
  
<img src="https://user-images.githubusercontent.com/67185299/106559257-7fcbd100-6568-11eb-92f8-c2a360afd7fc.gif" width="1000"></img>
<br>
<br>
