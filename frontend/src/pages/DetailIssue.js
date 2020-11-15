import React, { useState, useEffect, useCallback, useContext } from 'react';
import styled from 'styled-components';
import Title from '../components/DetailIssue/Title';
import CommentList from '../components/DetailIssue/CommentList';
import AddComment from '../components/DetailIssue/AddComment';
import EditComment from '../components/DetailIssue/EditComment';
import IssueAddingSideBar from '../organisms/issue/IssueAddingSideBar';
import { SelectionsStateContext, SelectionsSetContext } from '../contexts/selection';
import axios from 'axios';

const Box = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
`;
const DetailIssue = ({ match }) => {
  const selections = useContext(SelectionsStateContext);

  const { issueId } = match.params;
  const [detailIssue, setDetailIssue] = useState(null);
  const [edit, setEdit] = useState(0);
  const [comment, setComment] = useState({});
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://49.50.166.157:3000/api/issue/detailIssue/${issueId}`, {
        withCredentials: true,
      });
      setDetailIssue(response.data);
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(() => {
    fetchData();
  }, [issueId]);
  return (
    <>
      {!detailIssue ? (
        <div />
      ) : (
        <div>
          <div>
            <Box>
              <Title detailIssue={detailIssue} />
              <CommentList comments={detailIssue.Comments} setEdit={setEdit} setComment={setComment} />
              {!edit ? (
                <AddComment issueId={detailIssue.issueId} isOpen={detailIssue.isOpen} fetchData={fetchData} />
              ) : (
                <EditComment setEdit={setEdit} comment={comment} fetchData={fetchData} />
              )}
            </Box>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailIssue;
