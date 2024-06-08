import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PlusImg from '../../../assets/images/icons/ic_plus.svg';
import CloseBtn from '../../../assets/images/icons/close_btn.png'

const Container = styled.div`
  padding-top: 16px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`
const ImgArea = styled.div`
  display: flex;
  gap: 24px;
`
const ProductImg = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  color: #9CA3AF;
  width: 282px;
  height: 282px;
  border-radius: 12px;
  background-color: #F3F4F6;
`
const ImgBtn =  styled.input`
  display: none;
`;
const PreviewImg = styled.div`
  position: relative;
  width: 282px;
  height: 282px;
  border-radius: 12px;
`
const ImgCloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #ffffff;
  background-color: #3692FF;
`;

const PreviewImage = styled.img`
  width: 282px;
  height: 282px;
  border-radius: 12px;
`

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  }
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if(!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  }

  useEffect(() => {
    if(!value) return;

    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    }
  },[value])

  return (
    <Container>
      <h3>상품 이미지</h3>
      <ImgArea>
        <ProductImg htmlFor="file">
          <img src={PlusImg} alt={PlusImg} />
          <div>이미지 등록</div>
        </ProductImg>
        <ImgBtn id='file' type="file" onChange={handleChange} ref={inputRef}/>
        {preview && (<PreviewImg>
          <PreviewImage src={preview} alt={preview} />
          {value && <ImgCloseBtn onClick={handleClearClick}><img src={CloseBtn} alt="" /></ImgCloseBtn>}
        </PreviewImg>)}
      </ImgArea>
    </Container>
  )
}

export default FileInput;