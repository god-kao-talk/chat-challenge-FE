import React from 'react';
import { styled } from 'styled-components';

function Loading() {
    return (
        <StDots className="snippet" data-title="dot-spin">
            <div className="stage">
                <div className="dot-spin"></div>
                <p>로딩중 입니다</p>
            </div>
        </StDots>
    );
}

export default Loading;

const StDots = styled.div`
    position: relative;
    width: calc(100% - 300px);
    height: 100%;
    & .stage {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    & .dot-spin {
        position: relative;
        width: 10px;
        height: 10px;
        transform: translate(375%, -300%);
        border-radius: 5px;
        background-color: transparent;
        color: transparent;
        box-shadow: 0 -18px 0 0 #9880ff, 12.727926px -12.727926px 0 0 #9880ff, 18px 0 0 0 #9880ff,
            12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0),
            -12.727926px 12.727926px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0),
            -12.727926px -12.727926px 0 0 rgba(152, 128, 255, 0);
        animation: dot-spin 1.5s infinite linear;
    }
    @keyframes dot-spin {
        0%,
        100% {
            box-shadow: 0 -18px 0 0 #9880ff, 12.727926px -12.727926px 0 0 #9880ff, 18px 0 0 0 #9880ff,
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
        }
        12.5% {
            box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 0 #9880ff, 18px 0 0 0 #9880ff,
                12.727926px 12.727926px 0 0 #9880ff, 0 18px 0 -5px rgba(152, 128, 255, 0),
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
        }
        25% {
            box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0),
                18px 0 0 0 #9880ff, 12.727926px 12.727926px 0 0 #9880ff, 0 18px 0 0 #9880ff,
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
        }
        37.5% {
            box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0),
                18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 0 #9880ff, 0 18px 0 0 #9880ff,
                -12.727926px 12.727926px 0 0 #9880ff, -18px 0 0 -5px rgba(152, 128, 255, 0),
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
        }
        50% {
            box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0),
                18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0),
                0 18px 0 0 #9880ff, -12.727926px 12.727926px 0 0 #9880ff, -18px 0 0 0 #9880ff,
                -12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0);
        }
        62.5% {
            box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0),
                18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0),
                0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 0 #9880ff, -18px 0 0 0 #9880ff,
                -12.727926px -12.727926px 0 0 #9880ff;
        }
        75% {
            box-shadow: 0 -18px 0 0 #9880ff, 12.727926px -12.727926px 0 -5px rgba(152, 128, 255, 0),
                18px 0 0 -5px rgba(152, 128, 255, 0), 12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0),
                0 18px 0 -5px rgba(152, 128, 255, 0), -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0),
                -18px 0 0 0 #9880ff, -12.727926px -12.727926px 0 0 #9880ff;
        }
        87.5% {
            box-shadow: 0 -18px 0 0 #9880ff, 12.727926px -12.727926px 0 0 #9880ff, 18px 0 0 -5px rgba(152, 128, 255, 0),
                12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
                -12.727926px 12.727926px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
                -12.727926px -12.727926px 0 0 #9880ff;
        }
    }
`;
