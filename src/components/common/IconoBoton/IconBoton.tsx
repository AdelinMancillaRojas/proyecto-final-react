import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faPen,
  faInfo,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
interface TiposBotones {
  danger: string;
  warning: string;
  info: string;
  add: string;
}

export const IconBoton = ({
  tipo,
  callBack,
  children,
}: {
  tipo: keyof TiposBotones;
  children?: React.ReactNode;
  callBack?: () => void;
}) => {
  const icons = {
    danger: faTimes,
    warning: faPen,
    info: faInfo,
    add: faPlus,
  };
  return (
    <Button
      outline
      color={tipo === 'add' ? 'primary' : tipo}
      className='px-4'
      onClick={callBack || function () {}}
    >
      {children || <FontAwesomeIcon icon={icons[tipo]} />}
    </Button>
  );
};
