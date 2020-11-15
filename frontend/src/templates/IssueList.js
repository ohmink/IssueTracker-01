import React from 'react';
import styled from 'styled-components';
import ListHead from '@components/label/ListHead';
import IssueList from '@components/issue/IssueList';
import { useIssueState } from '@contexts/issue';

const LabelList = ({ history }) => {
  const issues = useIssueState();
  console.log(issues);
  return (
    <div>
      <ListHead>
        <input type="checkbox" />
        <div>assignee</div>
      </ListHead>
      <IssueList items={issues} keys={issues.map((issue) => issue.issueId)} history={history} />
    </div>
  );
};

export default LabelList;
