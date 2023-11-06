import React, {useContext} from 'react';
import styled from "styled-components";
import LogoIcon from "@/app/components/icons/LogoIcon";
import SearchIcon from "@/app/components/icons/SearchIcon";
import {Context} from "@/app/DashboardContext";

const Header = () => {
  const {setSearch, search} = useContext(Context);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <HeaderContainer>
      <Logo>
        <LogoIcon />
        <Text>Memes</Text>
      </Logo>
      <SearchContainer>
        <Search value={search} onChange={handleSearch} placeholder="Search" />
        <SearchIcon />
      </SearchContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 18px 30px;
  max-width: 1298px;
  border-bottom: 1px solid #313442;
  @media (max-width: 468px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled('div')({
  position: 'relative',
  svg: {
    position: 'absolute',
    top: 10,
    right: 20,
    // @ts-ignore
    '@media (max-width: 468px)': {
      'svg': {
        top: 26,
      },
    }
  },
  
});

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 196px;
  height: 30px;
`;

const Text = styled.p`
  color: #FFF;
  text-align: center;
  font-family: Satoshi;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
`;

const Search = styled('input')({
  borderRadius: 4,
  background: '#30313C',
  color: '#9B9D9F',
  fontSize: 14,
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '20px',
  padding: '0 40px 0 20px',
  height: 40,
  "&:focus": {
    outline: 'none',
    border: 'none'
  },
  '@media (max-width: 468px)': {
    marginTop: 16
  }
});
export default Header;