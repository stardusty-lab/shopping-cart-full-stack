import { Modal } from "@/core/components/Modal";
import { Button } from "@/core/components/Button";
import { List } from "@/core/components/List";
import { Checkbox } from "@/core/components/Checkbox";

export const CouponModal = () => {
  return (
    <Modal>
      <Modal.Header>쿠폰을 선택해 주세요</Modal.Header>
      <p>쿠폰은 최대 2개까지 사용할 수 있습니다.</p>

      <List>
        <List.Item>
          <List.Item.Box
            title={<Checkbox label="5,000원 할인 쿠폰" />}
            description={
              <>
                만료일: 2024년 11월 30일 <br />
                최소 주문 금액: 100,000원
              </>
            }
          ></List.Item.Box>
        </List.Item>
        <List.Item>
          <List.Item.Box>
            <Checkbox label="2개 구매 시 1개 무료 쿠폰" />
            만료일: 2024년 11월 30일
          </List.Item.Box>
        </List.Item>
        <List.Item>
          <List.Item.Box>
            <Checkbox label="5만원 이상 구매 시 무료 배송 쿠폰" />
            만료일: 2024년 8월 31일
            <br />
            최소 주문 금액: 50,000원
          </List.Item.Box>
        </List.Item>
        <List.Item>
          <List.Item.Box>
            <Checkbox label="미라클모닝 30% 할인 쿠폰" />
            만료일: 2024년 7월 31일 <br />
            사용 가능 시간: 오전 4시부터 7시까지
          </List.Item.Box>
        </List.Item>
      </List>

      <Button variant="primary" size="medium" block>
        총 6,000원 할인 쿠폰 사용하기
      </Button>
    </Modal>
  );
};
