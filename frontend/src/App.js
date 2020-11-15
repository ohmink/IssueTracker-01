import React from 'react';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import IssueMain from '@pages/IssueMain';
import Label from '@pages/Label';
import IssueAdding from './pages/IssueAdding';
import Milestone from './pages/Milestone';
import MilestoneAdding from './pages/MilestoneAdding';
import MilestoneEditing from './pages/MilestoneEditing';
import DetailIssue from './pages/DetailIssue';
import Header from './components/util/Header';

import { UserProvider } from './contexts/user';
import { LabelProvider } from '@contexts/label';
import { IssueProvider } from '@contexts/issue';
import UserListProvider from './contexts/userList';
import SelectionProvider from './contexts/selection';
import MilestoneProvider from './contexts/milestone';
import { GlobalDiv } from './GlobalStyle';

const App = () => {
  return (
    <UserProvider>
      <Header />
      <GlobalDiv>
      <LabelProvider>
        <IssueProvider>
          <Route path="/" component={Login} exact />
          <Route path="/label" component={Label} />
          <MilestoneProvider>
            <Route path="/milestone" exact={true} component={Milestone} />
            <Route path="/milestone-add" component={MilestoneAdding} />
            <Route path="/milestone-edit" component={MilestoneEditing} />
            <UserListProvider>
              <SelectionProvider>
                <Route path="/issue-add" component={IssueAdding} />
              </SelectionProvider>
              <Route path="/main" component={IssueMain} />
            </UserListProvider>
          </MilestoneProvider>
          <Route path="/detailIssue/:issueId" component={DetailIssue} />
        </IssueProvider>
      </LabelProvider>
      </GlobalDiv>
    </UserProvider>
  );
};

export default App;
