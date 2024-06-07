import React from "react";
import { ReactComponent as HeartIcon } from "../../../assets/images/icons/ic_heart.svg";
import { useNavigate } from 'react-router-dom';

function ItemCard({ item }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/items/${item.id}`, { state: item.id });
    console.log(item);
  }
  return (
    <div onClick={handleClick} className="itemCard">
      <img src={item.images[0]} alt={item.name} className="itemCardThumbnail" />
      <div className="itemSummary">
        <h2 className="itemName">{item.name}</h2>
        <p className="itemPrice">{item.price.toLocaleString()}원</p>
        <div className="favoriteCount">
          <HeartIcon />
          {item.favoriteCount}
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
