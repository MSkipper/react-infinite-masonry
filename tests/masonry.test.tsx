import React, {ReactElement} from 'react'
import Masonry, {LoadingMode} from "../src/masonry";
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Masonry library tests', () => {

    const renderMasonryComponent = (children?: ReactElement,
                                    loadingMode?: LoadingMode,
                                    loadMore: () => void,
                                    columnWidth: number) => {
        render(<Masonry loadingMode={loadingMode} loadMore={loadMore} columnWidth={columnWidth}>{children}</Masonry>)
    }

    test('should render the empty component', () => {
        renderMasonryComponent();
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    test('should render masonry with 20 items element', () => {
        const listLength = 20;
        const elementList = Array(listLength).fill(<div>item</div>)
        renderMasonryComponent(elementList);

        expect(screen.getByText('item')).toBeInTheDocument();
        screen.findAllByText('items').then((items) => {
            expect(items.length === listLength)
        });
    });

    test('should call loadMore after scroll-down', () => {
        const loadMore = jest.fn();
        const listLength = 20;
        const elementList = Array(listLength).fill(<div>item</div>);

        renderMasonryComponent(elementList, 'infinite', loadMore);
        fireEvent.scroll(window, { target: { scrollY: 1000 } })

        expect(loadMore).toBeCalled();
    });


    test('should call loadMore after button click', () => {
        const loadMore = jest.fn();
        const listLength = 20;
        const button = screen.getByRole('button');
        const elementList = Array(listLength).fill(<div>item</div>);

        renderMasonryComponent(elementList, 'infinite-button', loadMore);
        fireEvent.click(button);

        expect(loadMore).toBeCalled();
    });

    test('should fill the screen with the correct numbers of columns', () => {
        const loadMore = jest.fn();
        const listLength = 20;
        const columnWidth = 200;
        const elementList = Array(listLength).fill(<div>item</div>);

        renderMasonryComponent(elementList, 'infinite', loadMore, columnWidth);
        //Count columns somehow
    });

    test('should display the items according to screen size', () => {
        const loadMore = jest.fn();
        const listLength = 200;
        const columnWidth = 200;
        const elementList = Array(listLength).fill(<div>item</div>);

        renderMasonryComponent(elementList, 'infinite', loadMore, columnWidth);
        screen.findAllByText('items-1').then((items) => {
            // correct value
            expect(items.length === 20)
        });
        fireEvent.scroll(window, { target: { scrollY: 1000 } });
        //the second chunk has other text
        expect(screen.findAllByText('items-2')).toBeInTheDocument();
    });

});