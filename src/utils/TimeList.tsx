import styled from '@emotion/styled';
import {useEffect, useState} from 'react';

export const TimeList = () => {
    const [opened, setOpened] = useState(false);
    const [responses, setResponses] = useState<any[]>([]); // To store all captured responses

    useEffect(() => {
        const handleResponse = (event: any) => {
            setResponses((prevResponses) => [...prevResponses, event.detail]);
        };

        // Listen for the urql responses dispatched from the custom exchange
        window.addEventListener('urql-time-list', handleResponse);

        // Cleanup listener on component unmount
        return () => {
            window.removeEventListener('urql-time-list', handleResponse);
        };
    }, []);

    return <TimeListContainer className={opened ? 'opened' : ''}>
        <div className={'button'} onClick={() => setOpened(!opened)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="feather feather-clock">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
            </svg>
        </div>
        <div className={'contents'}>
            {responses.length > 0 && <>
                {responses.map((response) => {
                    const typedResponse = response as {
                        queryName: string, timeList: {
                            items: {
                                start: { date: string },
                                end: { date: string } | null,
                                length: number | null,
                                operationName: string,
                            }[]
                        }
                    };
                    return <div className={'query'}>
                        <div className={'name'}>{typedResponse.queryName}</div>
                        <div className={'items'}>
                            {typedResponse.timeList.items.map((item) => {
                                return <div className={'operation'} title={item.start.date}>
                                    <div>{item.operationName}</div>
                                    <div>{item.length}s</div>
                                </div>;
                            })}
                        </div>
                    </div>;
                })}
            </>}
            {responses.length <= 0 && <>
                <div>Nic tu není</div>
            </>}
        </div>
    </TimeListContainer>;
};

const TimeListContainer = styled.div`
    position: fixed;
    bottom: 24px;
    left: 90px;
    display: flex;
    align-items: flex-end;
    gap: 12px;

    .button {
        cursor: pointer;
        opacity: 0.5;

        &:hover {
            opacity: 0.8;
        }
    }

    .contents {
    }

    &.opened {
        .button {
            opacity: 1;

            &:hover {
                opacity: 0.8;
            }
        }
        
        .contents {
            display: flex !important;
        }
    }
    
    .contents {
        background: white;
        border-radius: 4px;
        padding: 12px;
        box-shadow: 0px 4px 1px rgba(0, 0, 0, 0.01),0px 2px 1px rgba(0, 0, 0, 0.05),0px 1px 1px rgba(0, 0, 0, 0.09),0px 0px 0px rgba(0, 0, 0, 0.1),0px 0px 0px rgba(0, 0, 0, 0.1);
        border: 1px solid #e9e9e9;
        border-bottom: none;
        display: none;
        flex-flow: column;
        gap: 2px;
        max-height: calc(100vh - 24px - 200px);
        max-width: calc(100vw - 90px - 60px);
        overflow: auto;
        
        .query {
            border: 1px solid #f1f1f1;
            border-radius: 4px;
            padding: 6px;
            display: flex;
            flex-flow: column;
            gap: 2px;
            font-size: 12px;

            .name {
                background: #f1f1f1;
                padding: 4px;
                font-weight: 600;
            }
            
            .items {
                //display: grid;
                //gap: 2px;
                
                .operation {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    column-gap: 8px;
                    row-gap: 2px;
                }
            }
        }
    }
`;
