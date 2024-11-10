import React from 'react'
import {Avatar,Typography} from 'antd'

const WrapperStyled= styled.div`
    margin-bottom:10px;
    .author{
        margin-left:5px;
        font-weight:bold;
    }
        .date{
        margin-left:10px;
        front-size:11px;
        color: #a7a7a;
        }
        .content{
        margin-left:30px;
        }
`;

export default function Messege(text, displayName, createAt, photoURL) {
  return (
    <WrapperStyled>
        <div>
            <Avatar src={photoURL}>A</Avatar>
            <Typography.Text className='author'>{displayName}</Typography.Text>
            <Typography.Text className='date'>{createAt}</Typography.Text>
        </div>
        <div>
           <Typography.Text className='content'>{text}</Typography.Text>
        </div>
    </WrapperStyled>
    
  )
}
