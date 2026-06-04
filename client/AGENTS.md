# AGENTS.md

## Test Guidelines

모든 테스트 코드는 AAA 패턴을 따른다.

### Arrange
- 테스트 데이터 준비
- mock 설정
- render 수행

### Act
- 사용자 이벤트 수행
- 테스트 대상 함수 호출

### Assert
- 기대 결과 검증

예시:

test("테스트 설명", async () => {
  // Arrange

  // Act

  // Assert
});

### Additional Rules

- 테스트 이름은 사용자 관점의 행동으로 작성한다.
- 불필요한 구현 세부사항은 검증하지 않는다.
- 하나의 테스트는 하나의 주요 동작만 검증한다.