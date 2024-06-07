import React, { useState } from "react";
import styled from 'styled-components';
import FileInput from './components/FileInput';
import TagClose from '../../assets/images/icons/tag_close.png'

const Container = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 12px;
`
const RegisterArea = styled.div`
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const RegisterTitle = styled.h1`
  font-size: 28px;
`
const RegisterBtn = styled.button`
  width: 88px;
  height: 42px;
  border-radius: 8px;
  color: #ffffff;
  background-color: #3692FF;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #2083fd;
  }
  &:disabled {
    cursor: default;
    background-color: #9CA3AF;
  }
`

const ProductNameArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 24px;
`;
const Input = styled.input`
  background-color: #F3F4F6;
  max-width: 1200px;
  height: 56px;
  border-radius: 12px;
  border: none;
  padding: 0 24px;
  ::placeholder {
    color: #9CA3AF;
  }
`
const TextArea = styled.textarea`
  background-color: #F3F4F6;
  max-width: 1200px;
  height: 233px;
  border-radius: 12px;
  border: none;
  padding: 16px 24px;
  resize: none;
`
const TagArea = styled.div`
  display: flex;
  gap: 5px;
`
const TagBtn = styled.div`
  display: flex;
  height: 48px;
  padding: 12px 12px 12px 16px;
  gap: 10px;
  border-radius: 26px 0px 0px 0px;
  border: 1px solid #F3F4F6;
  border-radius: 24px;
`
const TagCloseBtn = styled.img`
  cursor: pointer;
`

function AddItemPage() {
  const [tags, setTags] = useState([]);
  const [values, setValues] = useState({
    productName: '',
    productItd: '',
    productPrice: '',
    tag: '',
    imgFile: null,
  })

  const onKeyPress = e => {
    if(tags.includes(e.target.value)) return;
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      setTags([
        ...tags,
        e.target.value
      ])
    }
    values.tag = '';
  }
  const DeleteTag = e => {
    const newTags = tags.filter((item) => item !== e.target.id);
    setTags(newTags);
  }

  const handleChange = (name, value) => {
    setValues({
      ...values,
      [name] : value,
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <RegisterArea>
        <RegisterTitle>상품 등록하기</RegisterTitle>
        <RegisterBtn disabled={values.productItd !=='' && values.productName !== '' && values.productPrice !== '' && tags.length > 0 ? false : true} type='submit'>등록</RegisterBtn>
      </RegisterArea>
      <FileInput name="imgFile" value={values.imgFile} onChange={handleChange}/>
      <ProductNameArea>
        <h3>상품명</h3>
        <Input name='productName' value={values.productName} onChange={handleInputChange} type="text" placeholder='상품명을 입력해주세요.' />
        <h3>상품 소개</h3>
        <TextArea name='productItd' value={values.productItd} onChange={handleInputChange} placeholder='상품 소개를 입력해주세요.'></TextArea>
        <h3>판매 가격</h3>
        <Input name='productPrice' value={values.productPrice} onChange={handleInputChange} type="text" placeholder='판매 가격을 입력해주세요.' />
        <h3>태그</h3>
        <Input name='tag' onKeyDown={onKeyPress} value={values.tag} onChange={handleInputChange} type="text" placeholder='태그를 입력해주세요.' />
        <TagArea>
          {tags.map((item) => {
            return (
              <TagBtn key={item}>
                <span>{item}</span>
                <TagCloseBtn id={item} onClick={DeleteTag} src={TagClose} alt={TagClose} />
              </TagBtn>
              )
          })}
        </TagArea>
      </ProductNameArea>
    </Container>
  )
}

export default AddItemPage;
