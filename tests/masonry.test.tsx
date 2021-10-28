import React from 'react'
import  Masonry  from "../src/masonry";
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'

describe('here should be tests for lib', () => {

    const renderMasonryComponent = () => {
        render(<Masonry></Masonry>)
    }

    test('Render the component', () => {
        renderMasonryComponent()
        expect(screen.getByText('loading')).toBeInDocument()
    });

});