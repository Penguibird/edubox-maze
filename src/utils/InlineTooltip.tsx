import styled from '@emotion/styled';
import React, {SyntheticEvent} from 'react';
import ModalInfo from '../modals/ModalInfo';
import ModalManager from '../modals/ModalManager/ModalManager';

export interface InlineTooltipProps {
    translation: string
    helpTranslation: string
    heading: React.ReactNode
}

const InlineTooltip = ({
                           translation, helpTranslation, heading, ...rest
                       }: InlineTooltipProps) => {
    const onClick = async (event: SyntheticEvent) => {
        event.stopPropagation();
        event.preventDefault();

        const info = <p style={{flexGrow: 1}}>{helpTranslation}</p>;
        const response = await ModalManager.showModal(ModalInfo, {heading, info});
    };

    return <StyledTooltipContainer className={'InlineTooltip'}>
        {translation}
        <StyledTooltip onClick={onClick}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle fill="white" cx="6" cy="6" r={5}/>
                <path
                    d="M6 0.00146484C9.31371 0.00146484 12 2.68776 12 6.00146C12 9.31517 9.31371 12.0015 6 12.0015C2.68629 12.0015 0 9.31517 0 6.00146C0 2.68776 2.68629 0.00146484 6 0.00146484ZM6 8.50146C5.58579 8.50146 5.25 8.83725 5.25 9.25146C5.25 9.66568 5.58579 10.0015 6 10.0015C6.41421 10.0015 6.75 9.66568 6.75 9.25146C6.75 8.83725 6.41421 8.50146 6 8.50146ZM6 2.50146C4.89543 2.50146 4 3.3969 4 4.50146C4 4.77761 4.22386 5.00146 4.5 5.00146C4.77614 5.00146 5 4.77761 5 4.50146C5 3.94918 5.44772 3.50146 6 3.50146C6.55228 3.50146 7 3.94918 7 4.50146C7 4.87204 6.91743 5.08079 6.63398 5.39901L6.51804 5.52401L6.25395 5.79356C5.71178 6.36177 5.5 6.77093 5.5 7.50146C5.5 7.77761 5.72386 8.00146 6 8.00146C6.27614 8.00146 6.5 7.77761 6.5 7.50146C6.5 7.13089 6.58257 6.92214 6.86602 6.60392L6.98196 6.47892L7.24605 6.20937C7.78822 5.64116 8 5.232 8 4.50146C8 3.3969 7.10457 2.50146 6 2.50146Z"
                    fill="black"
                />
            </svg>
        </StyledTooltip>
    </StyledTooltipContainer>;
};

export default InlineTooltip;

const StyledTooltipContainer = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 6px;
    line-height: 1;
    text-align: right;
`;

const StyledTooltip = styled.div`
    display: inline-flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    margin: -3px;
    cursor: pointer;

    svg {
        width: 12px;
        height: 12px;
    }
`;
