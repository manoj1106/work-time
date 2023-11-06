import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCardSubtitle,
  CCardTitle,
} from '@coreui/react';
import PropTypes from 'prop-types';
interface CardHeaderProps {
  title?: string;
  subtitle?: string;
}
interface CardProps {
  headers?: CardHeaderProps;
  children?: React.ReactNode;
  footer?: string;
}
const Card = (props: CardProps) => {
  return (
    <CCard>
      {props.headers && (
        <CCardHeader>
          {props.headers.title && (
            <CCardTitle>{props.headers.title}</CCardTitle>
          )}
          {props.headers.subtitle && (
            <CCardSubtitle>{props.headers.subtitle}</CCardSubtitle>
          )}
        </CCardHeader>
      )}
      <CCardBody>{props.children}</CCardBody>
      {props.footer && <CCardFooter></CCardFooter>}
    </CCard>
  );
};

Card.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Card;
