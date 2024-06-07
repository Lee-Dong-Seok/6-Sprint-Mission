import { useEffect, useState } from "react";
import { getProductInformation } from "../../../api/information";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
`;
const ItemInfoArea = styled.div`
  display: flex;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 104px;
  resize: none;
  padding: 16px 24px;
  border-radius: 12px;
  border: none;
  background-color: #F3F4F6;
`

function ItemDetailPage() {
  const { itemId } = useParams();
  const [tags, setTags] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    const ItemLoad = async () => {
      const result = await getProductInformation(itemId);
      console.log(result);
      setItem(result);
      setTags(result.tags);
    };
    ItemLoad();
  }, [itemId]);
  return (
    <Container>
      <ItemInfoArea>
        <div>
          <img src={item.images} alt="" />
        </div>
        <div>
          <div>
            <h2>{item.name} 팔아요</h2>
            <h1>{item.price}원</h1>
          </div>
          <div>
            <span>상품 소개</span>
            <p>{item.description}</p>
          </div>
          <div>
            <span>상품 태그</span>
            {tags.map(item => {
              return <div key={item}>{item}</div>
            })}
          </div>
          <div>♥{item.favoriteCount}</div>
        </div>
      </ItemInfoArea>
      <div>
        <div>
          <h3>문의하기</h3>
          <TextArea
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다.

"
            name=""
            id=""
          ></TextArea>
          <button type='submit'>등록</button>
        </div>
        <div>
          {/* api데이터 받아오기 아직 못했습니다..ㅠ */}
          <button>목록으로 돌아가기</button>
        </div>
      </div>
    </Container>
  );
}

export default ItemDetailPage;
