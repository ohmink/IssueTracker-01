import React from 'react';
import styled from 'styled-components';
import TableListHeader from '../organisms/milestone/TableListHeader';
import TableList  from '../organisms/milestone/TableList';
import TabButton from '../components/label/TabButton';
import GreenButton from '@components/utils/GreenButton';

const MilestonePage = styled.div`
    margin: 0 auto;
`;

const Buttons = styled.div`
  display: flex;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Milestone = () => {
    return <MilestonePage>
        <FlexDiv>
            <TabButton/>
            <GreenButton text="New milestone" onClick={() => (location.href = '/milestone-add')} />
        </FlexDiv>
        <TableListHeader/>
        <TableList/>
    </MilestonePage>
}

export default Milestone;
