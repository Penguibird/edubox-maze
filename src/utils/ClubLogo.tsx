import styled from '@emotion/styled';
import { HTMLAttributes } from 'react';
import { useENVContext } from '../context/ENVContext';
import constants from './constants_parameters';

export const ClubLogo = (props: HTMLAttributes<HTMLImageElement>) => {
    const {logoReservationUrl, logoMarketUrl} = useENVContext();
    if (constants.isTycko) {
        // klubove logo se na tycku nezobrazuje, takze kdyz to chceme stylovat v dev-tycko rezimu, vratime si dummy data
        return <Logo src="https://dev.golferis.cz/upload/logo-1-1682584081-logo.png" {...props} />;
    }
    const logoUrl = logoReservationUrl || logoMarketUrl || '/images/logo.png';
    return <Logo src={logoUrl} {...props} />;
};

const Logo = styled.img`
  height: 40px;
  min-width: 40px;
  max-width: 125px;
  object-fit: contain;

  @media (min-width: 992px) {
    height: 64px;
    min-width: 64px;
    max-width: 150px;
  }
`;
