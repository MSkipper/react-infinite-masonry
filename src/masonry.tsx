import React, {FC, ReactElement, useEffect} from 'react'

interface Styles {

}

export type LoadingMode = 'none' | 'infinite' | 'infinite-button'

export interface MasonryProps {
    // settings:
    loadingMode: LoadingMode
    styles: Styles;
    columnWidth: number;
    loadMore: () => ReactElement[];
    isLazyContentLoading: boolean;

}

const calculateMasonry = (children, containerSize, columnWidth) => {
    const length = children.length;

    const columns = Math.round(containerSize/columnWidth);

    const layout = new Array(columns).map((col, index) => {
        return {
            left: index * columnWidth,
            currentTop: 0
        }
    });
    const masonryWrappers = children.map((child, index) => {

        const column = layout.reduce((prev, current) => {
            return prev.currentTop < current.currentTop ? prev : current;
        }, {currentTop: 0});
        const top = column.currentTop;


        return (<div className='masonry-item' style={{top: top, left: column.left}}>{child}</div>)

    })
}

const Masonry: FC<Partial<MasonryProps>> = ({children }) => {

    const displayItems = [];

    useEffect(() => {
        calculateMasonry();
    }, [children])

    return (
    <div data-testid='' >
        {children}
    </div>

    )

}

export default Masonry;