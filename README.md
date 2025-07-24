# React MBTI 테스트 ver 0.0.0.1
https://react-project-tau-black.vercel.app

## 간단 하게 만든 MBTI 테스트 사이트 입니다.

## 개발 환경 
 - node@20.18.3
 - pnpm@10.2.0
--- 

## 기술 스택 
 - 프레임 워크 : React@19.1.0 + Vite
 - 상태 관리 : zustand
 - 스타일링 : CSS Module (*.module.css)
 - 언어 : TypeScript

## 주요 특징 
 - 반응형 웹 
 - 컴포넌트 기반 설계
 - requestAnimationFrame 을 사용한 애니메이션 구현
 
## 아키텍처 및 전략 
 - API 호출 없이, 모든 데이터(테스트 문항, 테스트 결과)는 `src/data/` 폴더 내     
   TypeScript 파일에 정의 하고 컴포넌트에서 직접 import 해서 사용
 - mbti 검사 과정은 mbti 유형검사, 하위유형 검사 로 진행되고 zustand 로 상태 관리
 - views 는 route 와 매칭 되는 화면 단위 이며 로직이 포함된 컴포넌트 들을 조합하고 렌더링 (책임 분리 구조) 


## 첫 로딩 화면 및 메인 홈페이지
https://github.com/user-attachments/assets/67630aad-6178-428a-a74c-43bf520e86b7


## MBTI 검사 및 MBTI 하위 유형 검사
https://github.com/user-attachments/assets/7080856e-4d91-40fe-847c-272512c65056

