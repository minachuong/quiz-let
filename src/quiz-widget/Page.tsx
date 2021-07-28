import React, { CSSProperties } from 'react';
import { Quiz } from '../App';

export const Page = (props: PageProps) => {
  const { quiz } = props;
  const sectionStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const buttonStyles: CSSProperties = {
    margin: '0 auto',
    border: '1px solid black',
    width: 'fit-content',
    padding: '1rem 4rem',
    background: 'none',
  };
  
  return (
    <section style={sectionStyles}>
      <h1 style={{ textAlign: 'center', fontSize: '1.4rem' }}>{quiz.title}</h1>
      {props.children}
      {props.showNextButton && (
        <button style={buttonStyles} onClick={props.onNextClick}>
          Next
        </button>
      )}
    </section>
  );
};

export interface PageProps {
  quiz: Quiz;
  children: JSX.Element;
  showNextButton: boolean;
  onNextClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
