import React, {FC, ReactElement} from 'react'

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

const Masonry: FC<Partial<MasonryProps>> = ({children }) => {

    const displayItems = [];


    return (
    <div data-testid='' >
        {children}
    </div>

    )

}

export default Masonry;