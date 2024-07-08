import styled from 'styled-components';

const JobCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: #fff;
`;

const JobTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 8px;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const CompanyName = styled.span`
  margin-right: 8px;
`;

const Rating = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
`;

const StarIcon = styled.span`
  color: #ffb400;
  margin-right: 2px;
`;

const ReviewCount = styled.span`
  color: #999;
`;

const JobDetails = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #777;
  margin-bottom: 8px;
`;

const DetailItem = styled.span`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

const DetailIcon = styled.span`
  margin-right: 4px;
  color: #888;
`;

const Location = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

const SaveButton = styled.button`
  background: none;
  border: none;
  color: #0073e6;
  font-size: 14px;
  cursor: pointer;
  margin-left: auto;

  &:hover {
    text-decoration: underline;
  }
`;

const JobCardComponent = () => (
  <JobCard>
    <JobTitle>Cars24 Hiring - HR Intern || Bangalore</JobTitle>
    <CompanyInfo>
      <CompanyName>Cars24</CompanyName>
      <Rating>
        <StarIcon>⭐</StarIcon>
        <span>3.7</span>
      </Rating>
      <ReviewCount>3048 Reviews</ReviewCount>
    </CompanyInfo>
    <JobDetails>
      <DetailItem>
        <DetailIcon>⏱</DetailIcon> 3 months duration
      </DetailItem>
      <DetailItem>
        <DetailIcon>💰</DetailIcon> ₹ 12,000/month
      </DetailItem>
      <Location>
        <DetailIcon>📍</DetailIcon> Bengaluru
      </Location>
    </JobDetails>
    <div>Starts within 1 month</div>
    <SaveButton>Save</SaveButton>
  </JobCard>
);

export default JobCardComponent;

