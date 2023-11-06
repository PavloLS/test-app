'use client'
import React from 'react';
import styled from "styled-components";
import Categories from "@/app/components/Categories/Categories";
import { DndProvider } from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import Header from "@/app/components/Header";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Header />
      <DndProvider backend={HTML5Backend}>
        <Categories />
      </DndProvider>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #1E1E27;
  height: 100vh;
  width: 100%;
`;

export default Dashboard;