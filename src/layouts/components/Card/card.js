import React from 'react';
import styles from './card.scss';
import Link from 'umi/link';

class Card extends React.Component {
  render() {
    console.log(this.props.prop);
    let prop = this.props.prop;
    return (
      <>
        <ul className={styles.cards}>
          <li>
            <span>身份证号码：</span>
            <span>{prop ? prop.cardId : null}</span>
          </li>
          <li>
            <span>电话号码：</span>
            <span>{prop ? prop.phone : null}</span>
          </li>
          <li>
            <span>QQ：</span>
            <span>{prop ? prop.qq : null}</span>
          </li>
          <li>
            <span>毕业院校：</span>
            <span>{prop ? prop.school : null}</span>
          </li>
          <li>
            <span>学历：</span>
            <span>{prop ? prop.xueli : null}</span>
          </li>
          <li>
            <span>家庭地址：</span>
            <span>{prop ? prop.adress : null}</span>
          </li>
        </ul>
        <Link to={'/me/setMe'} className={styles.btn}>
          修改资料
        </Link>
      </>
    );
  }
}

export default Card;
