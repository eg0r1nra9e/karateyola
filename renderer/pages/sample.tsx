import Link from "next/link";
import React, { useState } from 'react';
import { Button, Layout, Menu, Space, Breadcrumb, theme } from 'antd';
import { maxHeaderSize } from "http";
import Player from "../components/Player";


const { Header, Content, Footer, Sider } = Layout;







const sample = () => {
  const [countOne, setCountOne] = useState(0);
  const [countTwo, setCountTwo] = useState(0);
  const [countDefaultOne, setCountDefaultOne] = useState('');
  const [countDefaultTwo, setCountDefaultTwo] = useState('');
  const [countfailOne, setCountfailOne] = useState(0);
  const [countfailTwo, setCountfailTwo] = useState(0);
  const [countfailOne2, setCountfailOne2] = useState(0);
  const [countfailTwo2, setCountfailTwo2] = useState(0);
  const [sider] = useState(
    <Sider style={{padding:0, width:100, minHeight:10, color:"white" }}>
    <div style={{paddingLeft:80 }}> {countOne} {countDefaultOne}   </div>
    <div style={{paddingLeft:80 }}> {countTwo} {countDefaultTwo}    </div>
 </Sider>
  );


 



  const failTwoClick = () => {
    if (countfailTwo) {
      return;
    }
    setCountfailTwo(0);


  };

  const failOneClick = () => {
    if (countfailOne) {
      return;
    }
    setCountfailOne(0);


  };

  const failTwo2Click = () => {
    if (countfailTwo2) {
      return;
    }
    setCountfailTwo2(0);


  };

  const failOne2Click = () => {
    if (countfailOne2) {
      return;
    }
    setCountfailOne2(0);


  };


  const addDefaultOneClick = () => {
    if (countDefaultOne.length) {
      return;
    }
    setCountDefaultOne("`");
  };

  const removeDefaultOneClick = () => {
    if (!countDefaultOne.length) {
      return;
    }
    setCountDefaultOne("");
  };

  const addDefaultTwoClick = () => {
    if (countDefaultTwo.length) {
      return;
    }
    setCountDefaultTwo("`");
  };

  const removeDefaultTwoClick = () => {
    if (!countDefaultTwo.length) {
      return;
    }
    setCountDefaultTwo("");
  };

  const defaultTwoClick = () => {
    if (countDefaultTwo.length) {
      return;
    }
    setCountDefaultTwo("`");


  };

  if (countfailOne >= 4) {
    alert("АО WIN");
  };

  if (countfailOne2 >= 4) {
    alert("АО WIN");
  };

  if (countfailTwo >= 4) {
    alert("АKO WIN");
  }; 

  if (countfailTwo2 >= 4) {
    alert("АKO WIN");
  };



  const [layout] = useState(

    <Layout style={{  width: 1820,  justifyContent: "space-between" }}>
    <Content style={{ width: 500, padding:0, minHeight: 750 }}>
      <Player
        isDanger={true}
        addBenefits={addDefaultOneClick}
        removeBenefits={removeDefaultOneClick}
        setCount={(count) => { setCountOne(countOne + count) }}
        setCountFail={(count) => { setCountfailOne(countfailOne + count) }}
        setCountFail2={(count) => { setCountfailOne2(countfailOne2 + count) }}
  
      />
      <div>{countfailOne} {countfailOne2}</div>
  
    </Content>
  
    <Content style={{ width: 500, padding: '0 2px', minHeight: 10 }}>
  
      <Player
        isDanger={false}
        addBenefits={addDefaultTwoClick}
        removeBenefits={removeDefaultTwoClick}
        setCount={(count) => { setCountTwo(countTwo + count) }}
        setCountFail={(count) => { setCountfailTwo(countfailTwo + count) }}
        setCountFail2={(count) => { setCountfailTwo2(countfailTwo2 + count) }}
      />
      <div>{countfailTwo} {countfailTwo2}</div>
      
  
    </Content>
  </Layout>
    )
  

  return (
    <>


      <div>
        <Link href="/">
          <a>Go Home</a>
        </Link>
      </div>

      

      <Content style={{ width: 1920, padding: 0 }}>
       
       <div> {sider} {layout} </div>

      </Content>

    </>
  );
};

export default sample;