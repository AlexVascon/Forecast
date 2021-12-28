import styled from 'styled-components';

export const DaysInWeekList = styled.ul`
  position: absolute;
  top: 9%;
  bottom: 3%;
  margin: auto;
  padding: 0;
  width: 93%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior-y: contain;
  border-radius: 0.5rem;
  background-color: rgba(137, 102, 145, 0.212);
`;
export const DayRow = styled.li`
  flex: 1;
  width: 95%;
  margin-left: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.418);
  :last-child {
    border-bottom: none;
  }
`;
export const DayNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  width: 4rem;
  gap: 0rem;
  margin: 0.2rem 0.3rem;
`;
export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
  margin: 0.8rem 0rem;
`;
export const Icon = styled.span`
  width: 1.7rem;
  height: 1.7rem;
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
`;
export const MainIcon = styled.span`
  width: 2.2rem;
  height: 2.2rem;
  background-color: transparent;
  background-image: url(${(props) => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  margin-bottom: -0.2rem;
  margin-top: -0.5rem;
  padding: 0;
`;
export const Title = styled.h2`
  font-size: 0.8rem;
  color: white;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  text-align: left;
`;
export const SubTitle = styled.p`
  font-size: 0.8rem;
  color: white;
  margin: auto;
  margin-left: 0;
  text-align: left;
  overflow-wrap: break-word;
`;
export const Text = styled.p`
  font-size: 0.8rem;
  color: white;
  margin: 0;
`;
